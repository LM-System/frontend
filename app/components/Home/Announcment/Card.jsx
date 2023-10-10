"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import showToastify from "@/public/Utilities/Toastify";

export default function AnnouncementCard({ title, body, id, wantToEdit }) {
  const { role } = JSON.parse(Cookies.get("user_info"));
  const [isEdit, setIsEdit] = useState(false);
  const [announcementObj, setAnnouncementObj] = useState({
    title: title,
    body: body,
  });
  async function deleteAnnouncement(id) {
    const token = Cookies.get("user_token");
    await axios({
      url: `https://lms-j2h1.onrender.com/announcement/${id}`,
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    showToastify("deleted");
  }
  async function updateAnnouncement(id) {
    const token = Cookies.get("user_token");
    await axios({
      url: `https://lms-j2h1.onrender.com/announcement/${id}`,
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: announcementObj,
    });
    setIsEdit(false);
    showToastify("updated");
  }
  function changeHandler(e) {
    e.preventDefault;
    const { name, value } = e.target;
    setAnnouncementObj({
      ...announcementObj,
      [name]: value,
    });
  }
  useEffect(() => {});
  return (
    <>
      {!isEdit ? (
        <div className="flex flex-col p-4 bg-gray-100 dark:bg-gray-700 rounded-lg relative">
          <h2 className="font-bold text-2xl">{title}</h2>
          <p>{body}</p>
          {role === "admin" && wantToEdit && (
            <div className="flex flex-col gap-2 absolute right-4 top-4">
              <MdEdit
                className="cursor-pointer"
                onClick={() => setIsEdit(true)}
              />
              <BsTrash
                className="cursor-pointer"
                onClick={() => deleteAnnouncement(id)}
              />
            </div>
          )}
        </div>
      ) : (
        wantToEdit && (
          <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex flex-col gap-1">
              <label className="font-bold">Title</label>
              <input
                className="p-2 rounded-lg"
                type="text"
                name="title"
                onChange={changeHandler}
                value={announcementObj.title}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold">Body</label>
              <input
                className="p-2 rounded-lg"
                type="text"
                name="body"
                onChange={changeHandler}
                value={announcementObj.body}
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded-lg text-white"
                type="submit"
                onClick={() => updateAnnouncement(id)}
              >
                Update
              </button>
              <button
                className="bg-gray-600  hover:bg-gray-800 py-2 px-4 rounded-lg text-white"
                type="delete"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
}
