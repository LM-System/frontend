

"use client";
import React, { useState ,useEffect} from "react";
import CourseBar from "@/app/components/Course/Bar";
import Navbar from "@/app/components/Navbar/Navbar";
import AddContentCard from "@/app/components/Course/Content/AddContentCard";
import EditContentCard from "@/app/components/Course/Content/EditContentCard";
import {MdEdit} from 'react-icons/md'
import {GrAdd} from 'react-icons/gr'
import {BsTrash} from 'react-icons/bs'
import axios from 'axios'
import { axiosHandler } from "@/public/Utilities/axiosHandler";



function Content({ params }) {
  const [isAdding,setIsAdding]=useState(false)
  const [isEditing,setIsEditing]=useState(false)
  const [contentList,setContentList]=useState([])
  const role = 'teacher'
  const sectionId = params.sectionId;
  const courseId = params.courseId;
    const fetchData = async ()=>{
    try{
      // console.log(section);
        const {data}=await axiosHandler('GET',`/sectioncontents/${courseId}`)
        setContentList(data.contents)
      }catch(e){setFetchingError(e.message)}
    }
    console.log(contentList);


async function handelDelete(id) {
  console.log(id);
  await axiosHandler('DELETE',`/content/${id}`)
  // axios.delete(`http://localhost:4000/content/${id}`)
  .then(res=>console.log("hi"))
  fetchData()
}
  const handleAdd = ()=>{
    setIsAdding(true)
  }
  
  useEffect(()=>{
    fetchData()
},[])


// console.log(contentList)
  return (
    <div className="page">
      {role=='teacher'&&isAdding&&<AddContentCard fetchData={fetchData} courseId={courseId} setIsAdding={setIsAdding} /> }
      {role=='teacher'&&isEditing&&<EditContentCard sectionId={sectionId} setIsEditing={setIsEditing} /> }
      <Navbar/>
      <main className="main bg-gray-200">
    <div className="courseComponent">
      <CourseBar sectionId={sectionId} courseId={courseId} />
      <div className="courseFlex">
        <div className="courseLeft">
            {role == 'teacher'&& <GrAdd onClick={handleAdd} className="absolute right-2 top-2 cursor-pointer text-lg"/>}
          <ol className="relative border-l border-gray-200 dark:border-gray-700 mt-5">
            { contentList.map((chapter, i)=>{
              return(
                <li key={i}className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg
                      className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {chapter.title}
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                      Latest
                    </span>
                    {role == 'teacher'&& <MdEdit onClick={()=>{setIsEditing(true)}} className="ml-6 cursor-pointer text-lg"/>}
                    {role == 'teacher'&& <BsTrash className="ml-4 cursor-pointer text-lg" onClick={()=>handelDelete(chapter.id)}/>}
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {chapter.due_date}
                  </time>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {chapter.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    <svg
                      className="w-3.5 h-3.5 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                      <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>{" "}
                    Download ZIP
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
    </main>
    </div>
  );
}

export default Content;
