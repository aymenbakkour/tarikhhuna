
import React from 'react';
import { TimelineEvent } from '../types';
import { TimelineItem } from './TimelineItem';

interface TimelineProps {
  events: TimelineEvent[];
  onSelectEvent: (event: TimelineEvent) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ events, onSelectEvent }) => {
  if (events.length === 0) {
    return <div className="text-center py-20 text-gray-500">لا توجد نتائج مطابقة لبحثك.</div>;
  }
  
  return (
    <div className="relative wrap overflow-hidden p-10 h-full">
      <div className="absolute border-2-2 border-opacity-20 border-gray-700 dark:border-gray-400 h-full border" style={{ left: '50%' }}></div>
      {events.map((event, index) => (
        <TimelineItem
          key={event.id}
          event={event}
          onSelectEvent={onSelectEvent}
          isRight={index % 2 === 0}
        />
      ))}
    </div>
  );
};
