
import { ERAS, CATEGORIES, allEvents } from './database.js';

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        activeEra: 'all',
        searchQuery: '',
    };

    // DOM Elements
    const timelineEl = document.getElementById('timeline');
    const sidebarEl = document.getElementById('sidebar');
    const searchInput = document.getElementById('search-input');
    const modalEl = document.getElementById('event-modal');
    const modalContentEl = document.getElementById('modal-content');
    const modalHeaderEl = document.getElementById('modal-header');
    const modalTabsEl = document.getElementById('modal-tabs');
    const modalBodyEl = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // --- Splash Screen Logic ---
    function runSplashScreen() {
        const splashScreen = document.getElementById('splash-screen');
        const stage12 = document.getElementById('splash-stage-1-2');
        const title = document.getElementById('splash-title');
        const tagline = document.getElementById('splash-tagline');
        const stage3 = document.getElementById('splash-stage-3');
        const stage4 = document.getElementById('splash-stage-4');
        
        const icons = ['👑', '🧠', '🤝', '⚔️', '🕌', '🚺'];
        
        setTimeout(() => { // Stage 1
            title.style.opacity = '1';
            tagline.style.opacity = '1';
        }, 100);

        setTimeout(() => { // Stage 2
            stage12.style.transform = 'translateY(-8rem)';
            tagline.style.opacity = '0';
        }, 2000);
        
        setTimeout(() => { // Stage 3
            stage3.style.opacity = '1';
            icons.forEach((icon, index) => {
                setTimeout(() => {
                    const span = document.createElement('span');
                    span.textContent = icon;
                    stage3.appendChild(span);
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'scale(1.1)';
                    }, 50);
                }, index * 200);
            });
        }, 2500);

        setTimeout(() => { // Stage 4
            stage12.style.opacity = '0';
            stage3.style.opacity = '0';
            stage4.style.opacity = '1';
        }, 3800);

        setTimeout(() => { // Stage 5
            splashScreen.style.opacity = '0';
            setTimeout(() => splashScreen.style.display = 'none', 500);
        }, 4800);
    }

    // --- Debounce Utility ---
    function debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // --- Render Functions ---
    function renderSidebar() {
        const title = document.createElement('h2');
        title.className = 'sidebar-title';
        title.textContent = 'الحقب الزمنية';
        
        const nav = document.createElement('nav');
        nav.className = 'sidebar-nav';

        ERAS.forEach(era => {
            const button = document.createElement('button');
            button.className = 'sidebar-button';
            button.dataset.eraId = era.id;
            button.textContent = era.name;
            if (era.id === state.activeEra) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                state.activeEra = era.id;
                document.querySelector('.sidebar-button.active')?.classList.remove('active');
                button.classList.add('active');
                updateTimeline();
            });
            nav.appendChild(button);
        });
        
        sidebarEl.append(title, nav);
    }
    
    function renderTimeline(events) {
        timelineEl.innerHTML = ''; // Clear previous events

        if (events.length === 0) {
            timelineEl.innerHTML = `<div class="no-results">لا توجد نتائج مطابقة لبحثك.</div>`;
            return;
        }

        const line = document.createElement('div');
        line.className = 'timeline-line';
        timelineEl.appendChild(line);

        events.forEach((event, index) => {
            const category = CATEGORIES[event.category];
            const isRight = index % 2 === 0;

            const item = document.createElement('div');
            item.className = `timeline-item ${isRight ? 'right' : 'left'}`;

            item.innerHTML = `
                <div class="timeline-item-spacer"></div>
                <div class="timeline-item-content-wrapper">
                    <div class="timeline-item-content">
                        <div class="timeline-item-header">
                            <span class="timeline-item-icon">${category.icon}</span>
                            <h3 class="timeline-item-title" style="color: var(--${category.id}-text);">${event.title}</h3>
                        </div>
                        <p class="timeline-item-date">${event.date}</p>
                        <p class="timeline-item-summary">${event.summary}</p>
                    </div>
                </div>
                <div class="timeline-node" style="background-color: var(--${category.id}-bg);">
                    ${category.icon}
                </div>
            `;
            
            item.querySelector('.timeline-item-content').addEventListener('click', () => openModal(event));
            timelineEl.appendChild(item);
        });
    }

    function openModal(event) {
        let activeTab = 'profile';
        const category = CATEGORIES[event.category];

        const renderTabContent = () => {
            switch (activeTab) {
                case 'profile':
                    return `
                        <div class="profile-card-header">
                            <span class="profile-card-icon">${category.icon}</span>
                            <div>
                                <h2 class="profile-card-title" style="color: var(--${category.id}-text);">${event.title}</h2>
                                <p class="profile-card-date">${event.date}</p>
                            </div>
                        </div>
                        <p>${event.summary}</p>
                    `;
                case 'details':
                    return `
                        <h3 class="details-title">تقرير مفصل</h3>
                        <p class="details-text">${event.details}</p>
                    `;
                case 'summary':
                    return `
                        <h3 class="summary-title">تلخيص تفاعلي</h3>
                        <ul class="summary-list">
                            ${event.keyPoints.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    `;
            }
        };

        const renderTabs = () => {
            modalTabsEl.innerHTML = '';
            const tabs = [
                { id: 'profile', label: 'البطاقة التعريفية' },
                { id: 'details', label: 'تقرير مفصل' },
                { id: 'summary', label: 'تلخيص تفاعلي' },
            ];

            tabs.forEach(tab => {
                const button = document.createElement('button');
                button.className = 'modal-tab-btn';
                button.textContent = tab.label;
                if (tab.id === activeTab) {
                    button.classList.add('active');
                    button.style.backgroundColor = `var(--${category.id}-bg)`;
                }
                button.addEventListener('click', () => {
                    activeTab = tab.id;
                    renderTabs();
                    modalBodyEl.innerHTML = renderTabContent();
                });
                modalTabsEl.appendChild(button);
            });
        };
        
        modalHeaderEl.style.borderColor = `var(--${category.id}-bg)`;
        renderTabs();
        modalBodyEl.innerHTML = renderTabContent();
        modalEl.showModal();
    }
    
    function closeModal() {
        modalEl.close();
    }

    // --- Main Logic ---
    function updateTimeline() {
        let events = [...allEvents];

        if (state.activeEra !== 'all') {
            events = events.filter(event => event.era === state.activeEra);
        }

        if (state.searchQuery) {
            const lowercasedQuery = state.searchQuery.toLowerCase();
            events = events.filter(event =>
                event.title.toLowerCase().includes(lowercasedQuery) ||
                event.summary.toLowerCase().includes(lowercasedQuery)
            );
        }
        
        events.sort((a, b) => a.year - b.year);
        renderTimeline(events);
    }

    // --- Event Listeners ---
    searchInput.addEventListener('input', debounce(e => {
        state.searchQuery = e.target.value;
        updateTimeline();
    }, 300));
    
    modalEl.addEventListener('click', (event) => {
        if (event.target === modalEl) {
            closeModal();
        }
    });
    modalCloseBtn.addEventListener('click', closeModal);

    // --- Initialization ---
    function init() {
        runSplashScreen();
        renderSidebar();
        updateTimeline();
    }

    init();
});
