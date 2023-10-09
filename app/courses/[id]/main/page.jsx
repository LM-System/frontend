import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import CourseBar from "@/app/components/Course/Bar";
import Announcements from "@/app/components/Announcements/Announcements";
import DescriptionCard from "@/app/components/Description/Card"

export default function Main({ params }) {
  const sectionId = params.id;

  return (
    <div className="page">
      <Navbar />
      <main className="main dark:bg-darkbg bg-gray-200">
        <div className="courseComponent rounded-lg">
          <CourseBar sectionId={sectionId} />
          <div className="courseFlex bg-transparent">
            <div className="h-eighty overflow-y-auto w-full">
              <DescriptionCard sectionId={sectionId} />
              <Announcements sectionId={sectionId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

