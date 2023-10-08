"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import CourseBar from "@/app/components/Course/Bar";
import { MdEdit } from "react-icons/md";
import { GrAdd, GrClose } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Announcment() {
  const router = useRouter();
  const [isEditingAnnouncement, setIsEditingAnnouncement] = useState(false);
  const [isEditingDes, setIsEditingDes] = useState(false);
  const userDataCookie = Cookies.get("user_info");
  const [userData, setUserData] = useState(
    userDataCookie ? JSON.parse(userDataCookie) : null
  );
  if (!userData) {
    router.push("/login");
  }
  const token = Cookies.get("user_token");

  const handleSave = () => {
    setIsEditingAnnouncement(false);
  };
  const handleSaveDes = () => {
    setIsEditingDes(false);
  };

  const [announcements, setAnnouncements] = useState([]);

  const handleDelete = async (announcementId) => {
    try {
      const response = await fetch(
        `https://lms-j2h1.onrender.com/announcement/${announcementId}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete announcement: ${response.statusText}`
        );
      }

      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter(
          (announcement) => announcement.id !== announcementId
        )
      );

      console.log("Announcement deleted successfully");
    } catch (error) {
      console.error("Error deleting announcement:", error.message);
    }
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `https://lms-j2h1.onrender.com/announcements`,
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
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error.message);
      }
    };

    fetchAnnouncements();
  }, []);

  const role = userData.role;

  const announcementsEx = [
    {
      title: "announcement1",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate",
    },
    {
      title: "announcement1",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate",
    },
    {
      title: "announcement1",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate",
    },
    {
      title: "announcement1",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate",
    },
  ];
  return (
    <main className="main dark:bg-darkbg bg-gray-200">
      <div className="courseComponent rounded-lg">
        <div className="courseFlex bg-transparent">
          <div className="h-eighty overflow-y-auto ">
            <div className=" mt-8 bg-white dark:bg-darkcomp drop-shadow-xl rounded-lg">
              {role == "admin" && !isEditingAnnouncement && (
                <MdEdit
                  onClick={() => {
                    setIsEditingAnnouncement(true);
                  }}
                  className="absolute right-4 top-4 cursor-pointer text-lg"
                />
              )}
              {role == "admin" && isEditingAnnouncement && (
                <GrAdd className="absolute right-4 top-4 cursor-pointer text-lg" />
              )}
              <h2 id="announcements" className=" px-5 pt-5 text-xl mb-4">
                Announcements
              </h2>
              <hr className="mx-5 my-3" />
              <div className="p-5 overflow-y-auto h-half">
                {announcementsEx.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className=" relative text-center bg-gray-50 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 opacity-80 dark:border-gray-700 hover:opacity-100  transition-all mb-5 "
                    >
                      {role == "admin" && isEditingAnnouncement && (
                        <BsTrash
                          className="absolute top-2 right-2 cursor-pointer text-lg"
                          onClick={() => handleDelete(item.id)}
                        />
                      )}
                      {role == "admin" && isEditingAnnouncement && (
                        <MdEdit className="absolute top-2 right-8 cursor-pointer text-lg" />
                      )}
                      <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h5>
                      <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
                {role == "admin" && isEditingAnnouncement && (
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-sm rounded-sm text-sm px-2 py-1.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 float-right mt-2 mr-2"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                )}
                {role == "admin" && isEditingAnnouncement && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingAnnouncement(false);
                    }}
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-sm rounded-sm text-sm px-2 py-1.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 float-right mt-2 mr-2"
                  >
                    cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
