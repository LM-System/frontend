"use client"
import React, { useState,useEffect } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import CourseBar from "@/app/components/Course/Bar";
import {MdEdit} from 'react-icons/md'
import {GrAdd,GrClose} from 'react-icons/gr'
import Assignment from '../page';

function Page({ params }) {
  const [isEditing,setIsEditing]=useState(false)
  const [isEditingSubmission,setIsEditingSubmission]=useState(false)
  const [assignment,setAssignment]=useState({
    id: 1,
    title: "malek",
    description: "hiiiiiiiiiiiiiiiiiiii",
    due_date: "2023-10-08T13:24:13.834Z",
    attachment: "assets/assignmentFile-1696771453818-748002275.docx",
    createdAt: "2023-10-08T13:24:13.834Z",
    updatedAt: "2023-10-08T13:24:13.834Z",
    sectionId: 1
})
  const role = "teacher";
  const courseId = params.courseId;
  const assignmentId = params.assignmentId;
  // const assignmentId=params.
  // console.log(params.assignmentId);
  const fetchData = async ()=>{
    try{
        const data=await axiosHandler('GET',`/assignment/${assignmentId}`)
        setContentList({...assignment,data})
    }catch(e){setFetchingError(e.message)}
}

console.log(assignment);
  useEffect(()=>{
    fetchData()
},[])
  return (
    <div className="page">
      <Navbar />
      <main className="main bg-gray-200">
        <div className="courseComponent">
          <CourseBar courseId={courseId} />
          <div className="courseFlex">
            <div className="courseLeft">
              {role == "student" && (
                <div>
                  <h1 className="p-3 text-3xl font-extrabold">
                    {assignment.title}
                  </h1>
                  <p>{new Date(assignment.due_date).toDateString()}</p>
                  <h2 className="p-3 text-xl font-bold">Overview:</h2>
                  <p className="p-3">{assignment.description}</p>
                  <h2 className="p-3 text-xl font-bold">Requirements:</h2>
                  <p className="p-3">{assignment.attachment}</p>
                  <h2 className="p-3 text-xl font-bold">
                    Submission Instruction:
                  </h2>
                  <p className="p-3">{assignment.description}</p>
                  <h2 className="p-3 text-xl font-bold">Submit:</h2>

                  <div className="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              )}
              {role == "teacher" && (
                <div>
                    {!isEditing&&<div>
                    <MdEdit onClick={()=>{
                        setIsEditing(true)
                    }} className="absolute top-4 right-4 cursor-pointer text-lg"/>
                  <h1 className="p-3 text-3xl font-extrabold">
                    {assignment.title}
                  </h1>
                  <h2 className="p-3 text-xl font-bold">Overview:</h2>
                  <p className="p-3">{assignment.description}</p>
                  <h2 className="p-3 text-xl font-bold">Requirements:</h2>
                  <p className="p-3">{assignment.requirements}</p>
                  <h2 className="p-3 text-xl font-bold">
                    Submission Instruction:
                  </h2>
                  <p className="p-3">{assignment.submissionInstruction}</p>
                  </div>}
                    {isEditing&&<div>
                        <GrClose onClick={()=>{
                        setIsEditing(false)
                    }} className="absolute top-4 right-4 cursor-pointer text-lg"/>
                    <input value={assignment.title} className="p-3 text-3xl font-extrabold" />
                  <h2 className="p-3 text-xl font-bold">Overview:</h2>
                  <textarea value={assignment.description} className="w-full h-ten p-3" />
                  <h2 className="p-3 text-xl font-bold">Requirements:</h2>
                  <textarea value={assignment.requirements} className="w-full h-ten p-3" />
                  <h2 className="p-3 text-xl font-bold">
                    Submission Instruction:
                  </h2>
                  <textarea value={assignment.submissionInstruction} className="w-full h-ten p-3" />
                  <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-sm rounded-sm text-sm px-2 py-1.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 float-right mt-2 mr-2" onClick={()=>{setIsEditing(false)}}>Save Changes</button>
                  </div>}
                  {!isEditingSubmission&&<div>
                    {role == 'teacher'&& <MdEdit onClick={()=>{
                      setIsEditingSubmission(true)
                    }} className=" absolute right-4 mt-3 cursor-pointer text-lg"/>}
                  <h2 className="p-3 text-xl font-bold mt-8"> Submissions:</h2>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Student name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Submission
                          </th>
                          <th scope="col" className="px-6 py-3">
                            grade
                          </th>
                          <th scope="col" className="px-6 py-3">
                            evaluation
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Apple MacBook Pro 17"
                          </th>
                          <td className="px-6 py-4">Silver</td>
                          <td className="px-6 py-4">Laptop</td>
                          <td className="px-6 py-4">$2999</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  </div>}
                  {isEditingSubmission&&<div>
                    <GrClose onClick={()=>{
                        setIsEditingSubmission(false)
                    }} className="absolute mt-3 right-4 cursor-pointer text-lg"/>
                  <h2 className="p-3 text-xl font-bold mt-8"> Submissions:</h2>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Student name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Submission
                          </th>
                          <th scope="col" className="px-6 py-3">
                            grade
                          </th>
                          <th scope="col" className="px-6 py-3">
                            evaluation
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <input value={'Apple MacBook Pro 17"'} className=""/>
                          </th>
                          <td className="px-6 py-4"><input value={'Silver'} className=""/></td>
                          <td className="px-6 py-4"><input value={'Laptop'} className=""/></td>
                          <td className="px-6 py-4"><input value={'$2999'} className=""/></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-sm rounded-sm text-sm px-2 py-1.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 float-right mt-2 mr-2" onClick={()=>{setIsEditingSubmission(false)}}>Save Changes</button>
                  </div>}
                </div>
              )}
            </div>
            <div className="courseRight"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
