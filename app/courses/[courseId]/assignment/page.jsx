"use client";
import React ,{useState,useEffect}from "react";
import CourseBar from "@/app/components/Course/Bar";
import Navbar from "@/app/components/Navbar/Navbar";
import AddAssignmentModal from "@/app/components/Assignment/AddAssignmentModal";
import Link from "next/link";
import {MdOutlineLibraryAdd} from 'react-icons/md'
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Cookies from "js-cookie";


function Assignment({ params }) {
  const role = 'teacher'
  var token2 = Cookies.get("user_info");
  const courseId = params.courseId;
  const [isAdding,setIsAdding]=useState(false)
  const [assignmentList,setAssignmentList]=useState([])

  const fetchData = async ()=>{
    try{
        const {data}=await axiosHandler('GET',`/assignments/${courseId}`)
        console.log(data);
        setAssignmentList(data)
    }catch(e){setFetchingError(e.message)}
}


  
  // const sectionStudent =[{},{},{}]
  useEffect(()=>{
    fetchData()
},[])
  return (
    <div className="page">
    {role=='teacher'&&isAdding&&<AddAssignmentModal courseId={courseId} setIsAdding={setIsAdding} /> }
      <Navbar/>
      <main className="main bg-gray-200">
    <div className="courseComponent rounded-lg">
      <CourseBar courseId={courseId} />
      <div className="courseFlex">
        <div className="courseLeft">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {role == 'teacher' && <MdOutlineLibraryAdd onClick={()=>{setIsAdding(true)}} className="absolute right-2 top-3 text-lg"/>}
            {role == 'student' &&<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 text-center py-3">
                    Assignment
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    Completion Status
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    Score
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    Evaluation 
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    DeadLine 
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {assignmentList&&assignmentList.map((assignment, i)=>{
                  return(
                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  > <Link className="text-blue-300" href={`/courses/${courseId}/assignment/${assignment.id}`}>
                    {assignment.name}
                    </Link>
                  </th>
                  <td className="px-6 text-center py-4">{assignment.completionStatus}</td>
                  <td className="px-6 text-center py-4">{assignment.score} / 10</td>
                  <td className="px-6 text-center py-4">{assignment.evaluationURL?<Link className="text-blue-300" href={`/courses/${courseId}/assignment/${assignment.id}/evaluation`}>Evaluated</Link>:''}</td>
                  <td className="px-6 text-center py-4">{assignment.deadline}</td>
                </tr>
                  )
                })}
              </tbody>
            </table>}
            {role == 'teacher' &&<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 text-center py-3">
                    Assignment
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    No of Submissions
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    no of evaluations
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    deadline 
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignmentList && assignmentList.map((assignment, i)=>{
                  return(
                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  > <Link className="text-blue-300" href={`/courses/${courseId}/assignment/${assignment.id}`}>
                    {assignment.title}
                    </Link>
                  </th>
                  <td className="px-6 text-center py-4">{assignment.no}/{assignment}</td>
                  <td className="px-6 text-center py-4">{assignment.evaluated} / {assignment.no}</td>
                  <td className="px-6 text-center py-4">{new Date(assignment.due_date).toDateString()}</td>
                </tr>
                  )
                })}
              </tbody>
            </table>}
          </div>
        </div>
      </div>
    </div>
    </main>
    </div>
  );
}

export default Assignment;
