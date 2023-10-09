"use client"
import AnnouncementCard from "./Card";
import {useState, useEffect, Suspense} from "react";
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Loading from "../Loading/Loading";

export default function AnnouncementContainer({ courseId, wantToEdit }) {
  const [announcements, setAnnouncements] = useState(null)
  useEffect(() => {
    const fetchAnnounements = async (courseId) => {
      const { data } = await axiosHandler(
        "GET",
        `/sectionAnnouncements/${courseId}`
      );
      setAnnouncements(data);
    };
    fetchAnnounements(courseId);
  })

  return (
    <div className="flex flex-col gap-4">
      {announcements ? announcements.map((e) => (
        <AnnouncementCard key={e.id} {...e} wantToEdit={wantToEdit}/>
      ))
      :
      <Loading />
      }
    </div>
  );
}
