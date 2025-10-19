
import React, { useState } from 'react';
import { TimelineEvent } from '../types';
import { CATEGORIES } from '../constants';

interface ModalProps {
  event: TimelineEvent;
  onClose: () => void;
}

type Tab = 'profile' | 'details' | 'summary';

export const Modal: React.FC<ModalProps> = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const category = CATEGORIES[event.category];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{category.icon}</span>
              <div>
                <h2 className={`text-3xl font-bold ${category.textColor}`}>{event.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">{event.date}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{event.summary}</p>
          </div>
        );
      case 'details':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4">تقرير مفصل</h3>
            <p className="text-gray-700 dark:text-gray-200 leading-loose whitespace-pre-wrap">{event.details}</p>
          </div>
        );
      case 'summary':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4">تلخيص تفاعلي</h3>
            <ul className="list-disc pr-6 space-y-2 text-gray-700 dark:text-gray-200">
              {event.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const TabButton: React.FC<{tabId: Tab; label: string}> = ({tabId, label}) => (
     <button
        onClick={() => setActiveTab(tabId)}
        className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-200 focus:outline-none ${
          activeTab === tabId
            ? `${category.color} text-white`
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {label}
      </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <header className={`p-4 rounded-t-lg flex justify-between items-center border-b-4 ${category.color.replace('bg-', 'border-')}`}>
            <div className="border-b-0 flex">
                <TabButton tabId="profile" label="البطاقة التعريفية" />
                <TabButton tabId="details" label="تقرير مفصل" />
                <TabButton tabId="summary" label="تلخيص تفاعلي" />
            </div>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-2xl font-bold">&times;</button>
        </header>
        <main className="p-6 overflow-y-auto">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};
