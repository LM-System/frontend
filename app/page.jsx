"use client"
import React ,{useState} from 'react'
import Navbar from "./components/Navbar/Navbar";
import TimeDate from "./components/Home/TimeDate";
import Announcment from "./components/Home/Announcment/Announcment";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import AddAnnouncement from "./components/Announcements/AddAnnouncment";

export default function Home() {
  const [isAdding, setIsAdding] = useState(false);
  const token = Cookies.get("user_token");
  const router = useRouter();
  if(!token) {
    router.push('/login')
    return null
  }
  
  return (
    <div className="page">
      {isAdding && <AddAnnouncement setIsAdding={setIsAdding} />}
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 shadow-md p-4 gap-2 w-full">
        <Announcment setIsAdding={setIsAdding} />
        <TimeDate />
      </div>
    </div>
  );
}
