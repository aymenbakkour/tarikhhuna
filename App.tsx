
import React, { useState, useEffect, useMemo } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Sidebar } from './components/Sidebar';
import { Timeline } from './components/Timeline';
import { SearchBar } from './components/SearchBar';
import { Modal } from './components/Modal';
import { Footer } from './components/Footer';
import { useDebounce } from './hooks/useDebounce';
import { allEvents } from './data/database';
import { Era, TimelineEvent, Category } from './types';
import { ERAS } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeEra, setActiveEra] = useState<Era['id']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = useMemo(() => {
    let events = [...allEvents];

    if (activeEra !== 'all') {
      events = events.filter(event => event.era === activeEra);
    }

    if (debouncedSearchQuery) {
      const lowercasedQuery = debouncedSearchQuery.toLowerCase();
      events = events.filter(event =>
        event.title.toLowerCase().includes(lowercasedQuery) ||
        event.summary.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    return events.sort((a, b) => a.year - b.year);
  }, [activeEra, debouncedSearchQuery]);

  const handleSelectEvent = (event: TimelineEvent) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };
  
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <Sidebar eras={ERAS} activeEra={activeEra} setActiveEra={setActiveEra} />
      
      <main className="flex-1 p-4 sm:p-6 md:p-8 transition-all duration-300 mr-64">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center">تاريخنا</h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mt-2">الماضي بين يديك، في أي وقت وأي مكان.</p>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </header>
          
          <Timeline events={filteredEvents} onSelectEvent={handleSelectEvent} />
          
          <Footer />
        </div>
      </main>
      
      {selectedEvent && <Modal event={selectedEvent} onClose={closeModal} />}
    </div>
  );
};

export default App;
