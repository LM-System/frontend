"use client"
import React,{useState} from "react";
import {AiOutlineClose} from 'react-icons/ai'
import axios from "axios";

function AddContentCard({setIsAdding,courseId}) {
  const [form,setForm]=useState({
    title:"",
    description:"",
    file:"",
    courseId:courseId
  })
function handelChange(e) {
setForm({...form,[e.target.name]:e.target.value})
}
function handelChangefiles(e) {
setForm({...form,[e.target.name]:e.target.files[0]})
}
async function handelSubmit(e) {
  e.preventDefault();
  const formData=new FormData();
  formData.append('contentFile',form.file)
  formData.append('title',form.title)
  formData.append('description',form.description)
  formData.append('courseId',form.courseId)
  console.log(formData);
 await axios.post('https://lms-j2h1.onrender.com/content', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Important for sending files
    },
  })
  // await axios.post('http://localhost:4000/sectionAnnouncement',formData);
  setIsAdding(false);
}
// console.log(form);

  return (
    <div>
      <div className="absolute w-full h-full bg-black z-10 opacity-40"></div>
      <div className="absolute left-0 right-0 bottom-0 top-0 m-auto w-4/12 h-4/6 bg-white z-10 ">
        <AiOutlineClose
          className=" float-right text-xl m-2 cursor-pointer"
          onClick={() => {
            setIsAdding(false);
          }}
        />
        <h1 className="mt-10 text-2xl font-bold mx-10 ">Add Content</h1> 
        <form className="mx-10 mt-5" onSubmit={handelSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handelChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
            onChange={handelChange}
              name="description"
              id="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
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
              name="file"
              type="file"
              multiple
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to content
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddContentCard;
