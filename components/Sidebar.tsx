
import React from 'react';
import { Era } from '../types';

interface SidebarProps {
  eras: Era[];
  activeEra: string;
  setActiveEra: (eraId: Era['id']) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ eras, activeEra, setActiveEra }) => {
  return (
    <aside className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col z-40">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">الحقب الزمنية</h2>
      <nav className="flex flex-col space-y-2">
        {eras.map((era) => (
          <button
            key={era.id}
            onClick={() => setActiveEra(era.id)}
            className={`px-4 py-2 text-right rounded-md transition-all duration-200 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              activeEra === era.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {era.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};
