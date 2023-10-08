import React, {useState, useEffect} from 'react'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar() {
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US'))
  useEffect(() => {
    const dateInterval = setInterval(() => {
      setDate(new Date().toLocaleDateString('en-US'));
    }, 1000);

    return () => clearInterval(dateInterval);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DateCalendar']}>
      <DemoItem label="Date">
        <DateCalendar defaultValue={dayjs(date)} readOnly className='bg-gray-200 rounded-lg dark:text-gray-900'/>
      </DemoItem>
    </DemoContainer>
  </LocalizationProvider>
  )
}
