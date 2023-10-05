"use client"
import React, {useState, useEffect} from 'react'

export default function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div>Time: {time}</div>
  )
}
