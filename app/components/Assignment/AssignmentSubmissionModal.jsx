"use client";
import React, { useState,useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Cookies from "js-cookie";
import  showToastify  from "@/public/Utilities/Toastify";

function AssignmentSubmissionModal({fetchSubData,sectionId,setIsOpen,assignmentId}) {
  const token = Cookies.get("user_token");
  const {id} =JSON.parse(Cookies.get("user_info"));
  console.log(id);
  const [form,setForm]=useState({
    content:"",
    studentId:id,
    assignmentId:assignmentId 
   })

    function handelChangefiles(e) {
    setForm({...form,[e.target.name]:e.target.files[0]})
    }
    async function handelSubmit(e) {
      e.preventDefault();
      const formData=new FormData();
      formData.append('assignmentSubmissionFile',form.content)
      formData.append('status','Submitted')
      formData.append('priority','High')
      formData.append('studentId',form.studentId)
      formData.append('assignmentId',form.assignmentId)
      console.log(formData);
     await axios.post('https://lms-j2h1.onrender.com/assignmentSubmittion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for sending files
          authorization: `Bearer ${token}`,
        },
      })
      fetchSubData();
      showToastify('added')
      setIsOpen(false);
    }

  return (
    <div className="overflow-x-hidden">
      <div className="absolute w-full h-full bg-black z-10 opacity-40"></div>
      <div className="absolute left-0 right-0 bottom-0 top-0 m-auto w-6/12 h-5/6 bg-white z-10 ">
        <AiOutlineClose
          className=" float-right text-xl m-2 cursor-pointer"
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <h1 className="mt-10 text-2xl font-bold mx-10 ">Add Assignment</h1>
        <form className="mx-10 mt-5" onSubmit={handelSubmit}>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="multiple_files"
            >
              Upload multiple files
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              onChange={handelChangefiles}
              name="content"
              type="file"
              multiple
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to Assignment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssignmentSubmissionModal;
