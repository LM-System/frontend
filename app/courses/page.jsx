"use client";
import React,{useState} from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar/Navbar";
import CoursesList from "./CoursesList";

export default function Courses() {
  const [courseId,setCourseId]=useState()
  const userInfo=JSON.parse(Cookies.get('user_info'))

  return (
    <div className="page">
      <Navbar />
      <main className="main">
        <CoursesList role={userInfo.role} setCourseId={setCourseId} id={userInfo.id}/>
      </main>
    </div>
  );
}
