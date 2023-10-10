"use client";
import AnnouncementCard from "./Card";
import { useState, useEffect, Suspense } from "react";
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Skelton from "../Loading/Skelton";

export default function AnnouncementContainer({ sectionId, wantToEdit }) {
  const [announcements, setAnnouncements] = useState(null);
  useEffect(() => {
    const fetchAnnounements = async (sectionId) => {
      const { data } = await axiosHandler(
        "GET",
        `/sectionAnnouncements/${sectionId}`
      );
      setAnnouncements(data);
    };
    fetchAnnounements(sectionId);
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      {announcements ? announcements.map((e) => (
        <AnnouncementCard key={e.id} {...e} wantToEdit={wantToEdit}/>
      ))
      :
      <>
        <Skelton count={0}/>
      </>
      }
    </div>
  );
}
