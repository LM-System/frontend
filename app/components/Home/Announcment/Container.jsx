"use client";
import AnnouncementCard from "./Card";
import { useState, useEffect, Suspense } from "react";
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Skelton from "@/app/components/Loading/Skelton";
import Cookies from "js-cookie";
import { redirect } from 'next/navigation';

export default function AnnouncementContainer({ wantToEdit }) {

  const token = Cookies.get("user_token");
  if(!token) {
    redirect('/login')
  }
  const [announcements, setAnnouncements] = useState(null);
  useEffect(() => {
    const fetchAnnounements = async () => {
      const { data } = await axiosHandler(
        "GET",
        `/announcements`
      );
      setAnnouncements(data.reverse());
    };
    fetchAnnounements();
  });
  

  return (
    <div className="flex flex-col gap-4 max-h-full  ">
      {announcements ? (
        announcements.map((e) => (
          <AnnouncementCard key={e.id} {...e} wantToEdit={wantToEdit} />
        ))
      ) : (
        <Skelton count={0}/>
      )}
    </div>
  );
}
