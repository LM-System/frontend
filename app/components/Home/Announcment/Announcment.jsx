"use client";
import React, { useState, useEffect } from "react";
import AnnouncementContainer from "./Container";
import Cookies from "js-cookie";
import { MdEdit } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { BsPlusLg } from "react-icons/bs";

import { useRouter } from "next/navigation";
import AddAnnouncement from "../../Announcements/AddAnnouncment";

export default function Announcements() {
  const router = useRouter();
  const userDataCookie = Cookies.get("user_info");
  const [userInfo, setUserInfo] = useState(
    userDataCookie ? JSON.parse(userDataCookie) : null
  );
  const [isAdding, setIsAdding] = useState(false);

  if (!userInfo) {
    router.push("/login");
  }

  const [wantToEdit, setWantToEdit] = useState(false);
  const handleAdd = () => {
    setIsAdding(true);
  };
  return (
    <div className=" mt-8 bg-white dark:bg-darkcomp drop-shadow-xl rounded-lg">
      {userInfo.role === "admin" && isAdding && (
        <AddAnnouncement setIsAdding={setIsAdding} />
      )}
      {userInfo.role === "admin" && (
        <BsPlusLg
          onClick={handleAdd}
          className="absolute right-1  top-4 cursor-pointer text-lg "
        />
      )}
      {userInfo.role === "admin" && !wantToEdit ? (
        <MdEdit
          onClick={() => {
            setWantToEdit(true);
          }}
          className="absolute right-4 mr-4 top-4 cursor-pointer text-lg "
        />
      ) : (
        userInfo.role === "admin" && (
          <GrClose
            onClick={() => {
              setWantToEdit(false);
            }}
            className="absolute right-4 top-4 mr-4 cursor-pointer text-lg "
          />
        )
      )}

      <h2 id="announcements" className=" px-5 pt-5 text-xl mb-4">
        Announcements
      </h2>
      <hr className="mx-5 my-3" />
      <div className="p-5 overflow-y-auto h-half">
        <AnnouncementContainer wantToEdit={wantToEdit} />
      </div>
    </div>
  );
}
