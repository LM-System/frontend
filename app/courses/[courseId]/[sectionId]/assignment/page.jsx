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
  const {role} = JSON.parse(Cookies.get("user_info"))
  var token2 = Cookies.get("user_info");
  const sectionId = params.sectionId;
  const courseId = params.courseId;
  const [isAdding,setIsAdding]=useState(false)
  const [assignmentList,setAssignmentList]=useState([])

  const fetchData = async ()=>{
    try{
        const {data}=await axiosHandler('GET',`/assignments/${sectionId}`)
        setAssignmentList(data)
    }catch(e){setFetchingError(e.message)}
}


  console.log(assignmentList)
  useEffect(()=>{
    fetchData()
},[])
  return (
    <div className="page">
    {role=='instructor'&&isAdding&&<AddAssignmentModal sectionId={sectionId} fetchData={fetchData} setIsAdding={setIsAdding} /> }
      <Navbar/>
      <main className="main bg-gray-200">
    <div className="courseComponent rounded-lg">
      <CourseBar courseId={courseId} sectionId={sectionId} />
      <div className="courseFlex">
        <div className="courseLeft">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {role == 'instructor' && <MdOutlineLibraryAdd onClick={()=>{setIsAdding(true)}} className="absolute right-2 top-3 text-lg"/>}
            {role == 'student' &&<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 text-center py-3">
                    Assignment
                  </th>
                  {/* <th scope="col" className="px-6 text-center py-3">
                    Completion Status
                  </th> */}
                  <th scope="col" className="px-6 text-center py-3">
                    Score
                  </th>
                  {/* <th scope="col" className="px-6 text-center py-3">
                    Evaluation 
                  </th> */}
                  <th scope="col" className="px-6 text-center py-3">
                    DeadLine 
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {assignmentList.map((assignment, i)=>{
                  return(
                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center dark:text-white"
                  > <Link className="text-blue-300 " href={`/courses/${courseId}/${sectionId}/assignment/${assignment.id}`}>
                    {assignment.title}
                    </Link>
                  </th>
                  {/* <td className="px-6 text-center py-4">{assignment.completionStatus}</td> */}
                  <td className="px-6 text-center py-4">{assignment.score} / 10</td>
                  {/* <td className="px-6 text-center py-4">{assignment.evaluationURL?<Link className="text-blue-300" href={`/courses/${courseId}/assignment/${assignment.id}/evaluation`}>Evaluated</Link>:''}</td> */}
                  <td className="px-6 text-center py-4">{assignment.due_date.slice(0,10)}</td>
                </tr>
                  )
                })}
              </tbody>
            </table>}
            {role == 'instructor' &&<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 text-center py-3">
                    Assignment
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    # Submissions
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    # evaluations
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    deadline 
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignmentList.map((assignment, i)=>{
                  return(
                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  > <Link className="text-blue-300" href={`/courses/${courseId}/${sectionId}/assignment/${assignment.id}`}>
                    {assignment.title}
                    </Link>
                  </th>
                  <td className="px-6 text-center py-4">{assignment.studentAssignmentSubmissions.length}</td>
                  <td className="px-6 text-center py-4"> {assignment.no}</td>
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
