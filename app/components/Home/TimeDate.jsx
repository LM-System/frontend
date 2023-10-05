"use client"
import React from 'react';
import Time from './Time/Time'
import Calendar from './Date/Date'

export default function TimeDate() {

  return (
    <div className='bg-gray-50 p-4 rounded-lg h-fit dark:bg-darkcomp'>
      <Time />
      <Calendar />
    </div>
  );
}

