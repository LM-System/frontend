"use client";
import React, { useState } from "react";
import CourseBar from "@/app/components/Course/Bar";
import Navbar from "@/app/components/Navbar/Navbar";
import AddContentCard from "@/app/components/Course/Content/AddContentCard";
import EditContentCard from "@/app/components/Course/Content/EditContentCard";
import {MdEdit} from 'react-icons/md'
import {GrAdd} from 'react-icons/gr'
import {BsTrash} from 'react-icons/bs'
import { axiosHandler } from "@/public/Utilities/axiosHandler";



function Content({ params }) {
  const role = 'teacher'
  const [isAdding,setIsAdding]=useState(false)
  const [isEditing,setIsEditing]=useState(false)
  let contentList= [
    {
        "id": 1,
        "title": null,
        "file": null,
        "description": null,
        "createdAt": "2023-10-08T13:40:11.006Z",
        "updatedAt": "2023-10-08T13:40:11.006Z",
        "courseId": 4
    },
    {
        "id": 2,
        "title": null,
        "file": null,
        "description": null,
        "createdAt": "2023-10-08T13:41:09.522Z",
        "updatedAt": "2023-10-08T13:41:09.522Z",
        "courseId": 4
    },
    {
        "id": 3,
        "title": null,
        "file": "assets/contentFile-1696773197013-638352128.docx",
        "description": null,
        "createdAt": "2023-10-08T13:53:17.021Z",
        "updatedAt": "2023-10-08T13:53:17.021Z",
        "courseId": 4
    },
    {
        "id": 4,
        "title": "malek",
        "file": null,
        "description": "hasan",
        "createdAt": "2023-10-08T18:58:52.058Z",
        "updatedAt": "2023-10-08T18:58:52.058Z",
        "courseId": 4
    },
    {
        "id": 5,
        "title": "musa",
        "file": null,
        "description": "musa",
        "createdAt": "2023-10-08T19:00:10.424Z",
        "updatedAt": "2023-10-08T19:00:10.424Z",
        "courseId": 4
    },
    {
        "id": 6,
        "title": "musa",
        "file": null,
        "description": "musa",
        "createdAt": "2023-10-08T19:04:24.275Z",
        "updatedAt": "2023-10-08T19:04:24.275Z",
        "courseId": 4
    },
    {
        "id": 7,
        "title": "musa",
        "file": null,
        "description": "musa",
        "createdAt": "2023-10-08T19:05:10.917Z",
        "updatedAt": "2023-10-08T19:05:10.917Z",
        "courseId": 4
    },
    {
        "id": 8,
        "title": null,
        "file": "assets/contentFile-1696791955994-423399953.docx",
        "description": null,
        "createdAt": "2023-10-08T19:05:56.001Z",
        "updatedAt": "2023-10-08T19:05:56.001Z",
        "courseId": 4
    },
    {
        "id": 9,
        "title": "musa",
        "file": null,
        "description": "musa",
        "createdAt": "2023-10-08T19:07:34.883Z",
        "updatedAt": "2023-10-08T19:07:34.883Z",
        "courseId": 4
    },
    {
        "id": 10,
        "title": "musa",
        "file": null,
        "description": "musa",
        "createdAt": "2023-10-08T19:11:28.928Z",
        "updatedAt": "2023-10-08T19:11:28.928Z",
        "courseId": 4
    },
    {
        "id": 11,
        "title": "hiiiiiiiiiiiiiiiiiiiiiiii",
        "file": null,
        "description": "hiiiiiiiiiiiiiiiiiiiiiiiii",
        "createdAt": "2023-10-08T19:12:02.310Z",
        "updatedAt": "2023-10-08T19:12:02.310Z",
        "courseId": 4
    },
    {
        "id": 12,
        "title": "hiiiiiiiiiiiiiiiiiiiiiiii",
        "file": "assets/contentFile-1696792374942-729158687.docx",
        "description": "hiiiiiiiiiiiiiiiiiiiiiiiii",
        "createdAt": "2023-10-08T19:12:54.944Z",
        "updatedAt": "2023-10-08T19:12:54.944Z",
        "courseId": 4
    },
    {
        "id": 13,
        "title": "hiiiiiiiiiiiiiiiiiiiiiiii",
        "file": "assets/contentFile-1696792400525-856939413.pdf",
        "description": "hiiiiiiiiiiiiiiiiiiiiiiiii",
        "createdAt": "2023-10-08T19:13:20.532Z",
        "updatedAt": "2023-10-08T19:13:20.532Z",
        "courseId": 4
    }
]
const courseId = params.courseId;
  // axiosHandler('GET',`/sectioncontents/${courseId}`).then(res=>console.log(res.contents))
  
  const handleAdd = ()=>{
    setIsAdding(true)
  }
  async function handelDelete(id) {
    // axiosHandler('DELETE',`/content/${id}`).then(res=>console.log(res.contents))
  }
  
  // const contentList = [{title:'Flowbite Application UI v2.0.0',date:'January 13th, 2022',description:'Get access to over 20+ pages including a dashboard layout,charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',docLink:''},{title:'Flowbite Application UI v2.0.0',date:'January 13th, 2022',description:'Get access to over 20+ pages including a dashboard layout,charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',docLink:''},{title:'Flowbite Application UI v2.0.0',date:'January 13th, 2022',description:'Get access to over 20+ pages including a dashboard layout,charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',docLink:''},{title:'Flowbite Application UI v2.0.0',date:'January 13th, 2022',description:'Get access to over 20+ pages including a dashboard layout,charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',docLink:''}]
  console.log(contentList.contents);

  return (
    <div className="page">
      {role=='teacher'&&isAdding&&<AddContentCard courseId={courseId} setIsAdding={setIsAdding} /> }
      {role=='teacher'&&isEditing&&<EditContentCard courseId={courseId} setIsEditing={setIsEditing} /> }
      <Navbar/>
      <main className="main bg-gray-200">
    <div className="courseComponent">
      <CourseBar courseId={courseId} />
      <div className="courseFlex">
        <div className="courseLeft">
            {role == 'teacher'&& <GrAdd onClick={handleAdd} className="absolute right-2 top-2 cursor-pointer text-lg"/>}
          <ol class="relative border-l border-gray-200 dark:border-gray-700 mt-5">
            {contentList.reverse().map((chapter, i)=>{
              return(
                <li key={i}class="mb-10 ml-6">
                  <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg
                      class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </span>
                  <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {chapter.title}
                    <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                      Latest
                    </span>
                    {role == 'teacher'&& <MdEdit onClick={()=>{setIsEditing(true)}} className="ml-6 cursor-pointer text-lg"/>}
                    {role == 'teacher'&& <BsTrash className="ml-4 cursor-pointer text-lg" onClick={()=>handelDelete(chapter.id)}/>}
                  </h3>
                  <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {chapter.due_date}
                  </time>
                  <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {chapter.description}
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    <svg
                      class="w-3.5 h-3.5 mr-2.5"
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
