"use client"
import React, { useEffect } from 'react';
import icons from '@/public/icons.jsx'
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    if(localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme'));
    } else {
      setTheme(systemTheme);
    }
  }, [setTheme, theme, systemTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  const SVG = icons[theme || systemTheme || 'light'];

  return (
    <>
      <button
        className="flex items-center justify-center rounded-full bg-white dark:bg-darkbg w-8 h-8 hover:cursor-pointer p-2 shadow-lg"
        onClick={toggleTheme}
      >
        <SVG className={`dark:text-white text-yellow-400  w-4 h-4`}/>
      </button>
    </>
  )
}
