
import React from 'react';
import { TimelineEvent } from '../types';
import { CATEGORIES } from '../constants';

interface TimelineItemProps {
  event: TimelineEvent;
  isRight: boolean;
  onSelectEvent: (event: TimelineEvent) => void;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ event, isRight, onSelectEvent }) => {
  const category = CATEGORIES[event.category];
  const alignmentClass = isRight ? 'justify-start text-left' : 'justify-end text-right';
  const contentClass = isRight ? 'text-left ml-auto' : 'text-right mr-auto';
  const pointerClass = isRight ? 'border-r-white dark:border-r-gray-800 right-0 -mr-2' : 'border-l-white dark:border-l-gray-800 left-0 -ml-2';
  
  return (
    <div className={`mb-8 flex ${alignmentClass} w-full`}>
      <div className="w-1/2"></div>
      <div className="w-1/2 px-4">
        <div onClick={() => onSelectEvent(event)} className={`cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full ${contentClass} relative`}>
            {/* Pointer */}
            <div className={`absolute top-1/2 -mt-2 w-4 h-4 transform rotate-45 bg-white dark:bg-gray-800 ${pointerClass}`}></div>
            
            <div className="flex items-center mb-2">
                <span className={`text-2xl mr-2 ${isRight ? 'ml-2' : 'mr-2'}`}>{category.icon}</span>
                <h3 className={`font-bold ${category.textColor} text-xl`}>{event.title}</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{event.date}</p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm leading-relaxed">{event.summary}</p>
        </div>
      </div>
       <div className={`z-10 flex items-center ${category.color} shadow-xl w-8 h-8 rounded-full absolute top-1/2 -mt-4`}>
          <h1 className="text-white text-xs font-bold w-full text-center">{category.icon}</h1>
        </div>
    </div>
  );
};
