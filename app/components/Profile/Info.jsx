"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";

export default function UserProfile ({ userId }) {
  const [user, setUser] = useState(null);

  const separateWords = (inputString) => {
    const wordsArray = inputString.match(/[A-Z][a-z]*/g);
    const resultString = wordsArray ? wordsArray.join(" ") : "";
    return resultString;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }
  const separatedRole = separateWords(user.role);

  return (
    <div>
      <div className="relative pb-2 h-full justify-center items-center">
        <div className="flex flex-col pb-5">
          <div className="relative flex flex-col mb-7">
            <div className="flex flex-col justify-center items-center">
              <Avatar
                style={{
                  width: "75px",
                  height: "75px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                sx={{ bgcolor: deepPurple[500] }}
              >
                {user.instructor.fullname.slice(0, 1)}
              </Avatar>
            </div>
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.instructor.fullname}
            </h1>
            <div className="text-xl text-center mt-3">{separatedRole}</div>
          </div>
        </div>
      </div>
      <div class="container mx-auto my-8 flex">
        <div class="w-1/2 p-6">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div className="user-email">
              <h4>Email</h4>
              <div className="details">
                <AlternateEmailRoundedIcon />
                <p>{`${user.email}`}</p>
              </div>
            </div>
            <div className="user-email">
              <h4>Gender</h4>
              <div className="details">
                <AlternateEmailRoundedIcon />
                <p>{`${user.instructor.gender}`}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/2 p-6">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <p>This is the content of the right column.</p>
          </div>
        </div>
      </div>
    </div>
  );
};