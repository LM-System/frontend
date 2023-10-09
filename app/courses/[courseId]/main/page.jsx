import React, { Suspense } from "react";
import Loading from "@/app/components/Loading/Loading";
import Navbar from "@/app/components/Navbar/Navbar";
import CourseBar from "@/app/components/Course/Bar";
import { GrAdd, GrClose } from 'react-icons/gr'
import { MdEdit } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import Announcements from "@/app/components/Announcements/Announcements";
import DescriptionCard from "@/app/components/Description/Card"

export default function Main({ params }) {
  const courseId = params.courseId;
  // const [announcements, setAnnouncements] = useState([])
  // const [description, setDescription] = useState("")
  // const [isEditingAnnouncement, setIsEditingAnnouncement] = useState(false)
  // const [isEditingDes, setIsEditingDes] = useState(false)
  const handleSave = () => {
    setIsEditingAnnouncement(false)
  }
  const handleSaveDes = () => {
    setIsEditingDes(false)
  }

  const role = 'teacher'
  const description = "lorem ipsum dolor"
  return (
    <div className="page">
      <Navbar />
      <main className="main dark:bg-darkbg bg-gray-200">
        <div className="courseComponent rounded-lg">
          <CourseBar courseId={courseId} />
          <div className="courseFlex bg-transparent">
            <div className="h-eighty overflow-y-auto w-full">
              <DescriptionCard courseId={courseId} />
              <Announcements courseId={courseId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

