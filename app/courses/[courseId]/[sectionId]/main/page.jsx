"use client"
import React,{useState} from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import CourseBar from "@/app/components/Course/Bar";
import Announcements from "@/app/components/Announcements/Announcements";
import DescriptionCard from "@/app/components/Description/Card"
import AddAnnouncement from "@/app/components/section/AddAnnouncement";

export default function Main({ params }) {
  const sectionId = params.sectionId;
  const courseId = params.courseId;
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="page">
      {isAdding && <AddAnnouncement sectionId={sectionId} setIsAdding={setIsAdding}/>}
      <Navbar />
      <main className="main dark:bg-darkbg bg-gray-200">
        <div className="courseComponent rounded-lg">
          <CourseBar sectionId={sectionId} courseId={courseId}/>
          <div className="courseFlex bg-transparent">
            <div className="h-eighty overflow-y-auto w-full">
              <DescriptionCard sectionId={sectionId} />
              <Announcements isAdding={isAdding} setIsAdding={setIsAdding} sectionId={sectionId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

