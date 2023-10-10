"use client";
import AnnouncementCard from "./Card";
import { useState, useEffect, Suspense } from "react";
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Skelton from "../../Loading/Skelton";
import Cookies from "js-cookie";

export default function AnnouncementContainer({ wantToEdit }) {
  const [announcements, setAnnouncements] = useState(null);
  const token = Cookies.get("user_token");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `https://lms-j2h1.onrender.com/announcements`, // AbuEssa if we need to add the institutionId we add it here
          {
            method: "GET",
            headers: { authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch announcements: ${response.statusText}`
          );
        }

        const data = await response.json();
        data.reverse();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error.message);
      }
    };

    fetchAnnouncements();
  }, [announcements]);

  return (
    <div className="flex flex-col gap-4 max-h-full  ">
      {announcements ? (
        announcements.map((e) => (
          <AnnouncementCard key={e.id} {...e} wantToEdit={wantToEdit} />
        ))
      ) : (
        <>
          <Skelton count={0} />
        </>
      )}
    </div>
  );
}
