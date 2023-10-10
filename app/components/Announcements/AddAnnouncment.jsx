import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../Loading/Spinner";
import showToastify from "@/public/Utilities/Toastify";

function AddAnnouncement({ setIsAdding }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(form);
      const token = Cookies.get("user_token");
      await axios.post("https://lms-j2h1.onrender.com/announcement", form, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      showToastify("added");
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  }

  return (
    <div>
      <div className="absolute w-full h-full bg-black z-10 opacity-40"></div>
      <div className="absolute left-0 right-0 bottom-0 top-0 m-auto w-6/12 h-1/3 bg-white dark:bg-darkcomp z-10 rounded-lg ">
        <AiOutlineClose
          className=" float-right text-xl m-2 cursor-pointer"
          onClick={() => {
            setIsAdding(false);
          }}
        />
        <h1 className="mt-10 text-2xl font-bold mx-10 ">Add Announcement</h1>
        <form className="mx-10 mt-5" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="body"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Body
            </label>
            <textarea
              onChange={handleChange}
              name="body"
              id="body"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? <Loading dim={6} /> : "Add Announcement"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAnnouncement;
