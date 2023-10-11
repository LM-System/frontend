"use client"
import React, { useState,useEffect } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import CourseBar from "@/app/components/Course/Bar";
import AssignmentSubmissionModal from "@/app/components/Assignment/AssignmentSubmissionModal";
import {MdEdit} from 'react-icons/md'
import {GrAdd,GrClose} from 'react-icons/gr'
import Assignment from '../page';
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Cookies from "js-cookie";

function Page({ params }) {
  const [isEditing,setIsEditing]=useState(false)
  const [isEditingSubmission,setIsEditingSubmission]=useState(false)
  const [assignment,setAssignment]=useState({})
  const [submissions,setSubmissions]=useState([])
  const [isOpen,setIsOpen]=useState(false)
  const {role,id} = JSON.parse(Cookies.get('user_info'));
  const courseId = params.courseId;
  const sectionId = params.sectionId;
  const assignmentId = params.assignmentId;
  const fetchData = async ()=>{
    try{
      const {data}=await axiosHandler('GET',`/assignment/${assignmentId}`)
      setAssignment(data)
    }catch(e){setFetchingError(e.message)}
}
const fetchSubData = async ()=>{
  try{
    const {data}=await axiosHandler('GET',`/assignmentSubmittion/${id}/${assignmentId}`)
    setSubmissions(data)
    fetchData();
  }catch(e){setFetchingError(e.message)}
}
console.log(submissions)
useEffect(()=>{
  fetchData()
  fetchSubData()
},[])
  return (
    <div className="page">
      {isOpen && <AssignmentSubmissionModal fetchSubData={fetchSubData} sectionId={sectionId} assignmentId={assignmentId} setIsOpen={setIsOpen}/>}
      <Navbar />
      <main className="main bg-gray-200">
        <div className="courseComponent">
          <CourseBar sectionId={sectionId} courseId={courseId} />
          <div className="courseFlex">
            <div className="courseLeft">
              
                <div>
                  <h1 className="p-3 text-3xl font-extrabold">
                    {assignment.title}
                  </h1>
                  <p>{new Date(assignment.due_date).toDateString()}</p>
                  <h2 className="p-3 text-xl font-bold">Overview:</h2>
                  <p className="p-3">{assignment.description}</p>
                  <h2 className="p-3 text-xl font-bold">Requirements:</h2>
                  <p className="p-3">{assignment.description}</p>
                  <h2 className="p-3 text-xl font-bold">
                    Submission Instruction:
                  </h2>
                  <p className="p-3">{assignment.description}</p>
                
                    {!isEditing&&<div>
                   {role=='student'&& <button
                   onClick={()=>setIsOpen(true)}
                  type="submit"
                  className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-7 focus:outline-none focus:ring-blue-300 font-medium  text-md px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                  Submit
                </button>}
                  <h2 className="p-3 text-xl font-bold mt-8"> Submissions:</h2>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                           Details
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Submission
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Submitted At
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {submissions.map((submission)=>{
                          return(
                        <tr key={submission.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {submission.content}
                          </th>
                          <td className="px-6 py-4">{submission.status}</td>
                          <td className="px-6 py-4">{new Date(submission.createdAt).toDateString()}</td>
                        </tr>
                          )
                        })}
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
            </div>
            {/* <div className="courseRight"></div> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
