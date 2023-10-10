"use client";
import React from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar/Navbar";
import CoursesList from "./CoursesList";
import { useRouter } from "next/navigation";
export default function Courses() {
  const isLogin = Cookies.get("user_token")
  const router = useRouter()
  if(!isLogin) {
    router.push('/login')
    return null
  }
  const userInfo = JSON.parse(Cookies.get('user_info'))

  return (
    <div className="page">
      <Navbar />
      <main className="main">
        <CoursesList id={userInfo.id}/>
      </main>
    </div>
  );
}
