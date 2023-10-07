"use client";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CoursesList from "./CoursesList";

export default function Courses() {
  return (
    <div className="page">
      <Navbar />
      <main className="main">
        <CoursesList />
      </main>
    </div>
  );
}
