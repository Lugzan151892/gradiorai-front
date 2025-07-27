import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface UICalendarProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

const UICalendar: React.FC<UICalendarProps> = ({ selectedDate, onSelect }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [viewDate, setViewDate] = useState(new Date(selectedDate));

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days: React.ReactElement[] = [];
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div
        key={`empty-${i}`}
        className={'w-8 h-8'}
      />
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected =
      day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();

    days.push(
      <button
        key={day}
        onClick={() => onSelect(new Date(year, month, day))}
        className={cn('w-8 h-8 rounded-full text-sm', isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-200')}
      >
        {day}
      </button>
    );
  }

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + offset);
    setViewDate(newDate);
  };

  return (
    <div>
      <div className={'flex justify-between items-center mb-2'}>
        <button onClick={() => changeMonth(-1)}>{'<'}</button>
        <span>{viewDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}</span>
        <button onClick={() => changeMonth(1)}>{'>'}</button>
      </div>
      <div className={'grid grid-cols-7 gap-1'}>{days}</div>
    </div>
  );
};

export default UICalendar;
