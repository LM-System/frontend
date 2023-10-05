"use client";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CoursesList from "./CoursesList";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

// console.log(decoded);

export default function Courses() {
  var token = Cookies.get("user_token");
  var token2 = Cookies.get("user_info");
  console.log(token);
  console.log(JSON.parse(token2));
  console.log(jwt_decode(token));
  return (
    <div className="page">
      <Navbar />
      <main className="main">
        <CoursesList />
      </main>
    </div>
  );
}
