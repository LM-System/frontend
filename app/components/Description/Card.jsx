"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Skelton from "../Loading/Skelton";
import { MdEdit } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import showToastify from "@/public/Utilities/Toastify";
import Loading from "@/app/components/Loading/Spinner";

export default function DescriptionCard({ sectionId }) {
  const { role } = JSON.parse(Cookies.get("user_info"));
  const [didUpdate, setDidUpdate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState(null);

  function handleChange(e) {
    const { value } = e.target;
    setDescription(value);
  }
  async function updateDescription() {
    setDidUpdate(true);
    const token = Cookies.get("user_token");
    const { data } = await axios({
      url: `https://lms-j2h1.onrender.com/course/${courseId}`,
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        description: description,
      },
    });
    console.log(data);
    setIsEdit(false);
    showToastify("updated");
  }
  useEffect(() => {
    const getDescription = async (id) => {
      const token = Cookies.get("user_token");
      const { data } = await axios({
        url: `https://lms-j2h1.onrender.com/course/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setDescription(data.description);
    };
    const getSectionDetails = async (id) => {
      const token = Cookies.get("user_token");
      const { data } = await axios({
        url: `https://lms-j2h1.onrender.com/section/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setCourseId(data.courseId);
      getDescription(data.courseId);
    };
    getSectionDetails(sectionId);
    setDidUpdate(false);
  }, [sectionId, didUpdate]);

  return (
    <div className="bg-white drop-shadow-xl dark:bg-darkcomp p-5 overflow-y-auto rounded-lg">
      {role === "instructor" && !isEdit ? (
        <MdEdit
          onClick={() => {
            setIsEdit(true);
          }}
          className="absolute right-4 top-4 cursor-pointer text-lg dark:text-white"
        />
      ) : (
        <GrClose
          onClick={() => {
            setIsEdit(false);
          }}
          className="absolute right-4 top-4 cursor-pointer text-lg dark:text-white"
        />
      )}
      <h2 className="text-xl mb-2">Description</h2>
      <hr />
      {description ? (
        <p className="py-5">
          {!isEdit ? (
            description
          ) : (
            <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <textarea
                  className="p-2 rounded-lg"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={description}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className={`bg-green-500 ${
                    !isLoading && "hover:bg-green-700"
                  } py-2 px-4 rounded-lg text-white`}
                  type="submit"
                  disabled={isLoading}
                  onClick={updateDescription}
                >
                  {isLoading ? <Loading dim={6} /> : "Update"}
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
          )}
        </p>
      ) : (
        <Skelton />
      )}
    </div>
  );
}
