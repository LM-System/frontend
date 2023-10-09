"use client";
import React ,{useState}from "react";
import CourseBar from "@/app/components/Course/Bar";
import Navbar from "@/app/components/Navbar/Navbar";
import AddAssignmentModal from "@/app/components/Assignment/AddAssignmentModal";
import Link from "next/link";
import {MdOutlineLibraryAdd} from 'react-icons/md'
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Cookies from "js-cookie";


function Assignment({ params }) {
  var token2 = Cookies.get("user_info");
  const [isAdding,setIsAdding]=useState(false)

  
  const sectionStudent =[{},{},{}]
  const role = 'teacher'
  // const assignments= [{id:1,title:'JavaScript fundemental',url:'',description:'completed',score:10,evaluationURL:'fgsdgs'},{id:2,name:'JavaScript fundemental',url:'',completionStatus:'completed',score:10,evaluationURL:'fgsdgs'},{id:3,name:'JavaScript fundemental',url:'',completionStatus:'completed',score:10,evaluationURL:'fgsdgs'},{id:4,name:'JavaScript fundemental',url:'',completionStatus:'incompleted',score:0,evaluationURL:''}]
  const assignments= [
{
      "id": 2,
      "title": "malek",
      "description": "hiiiii",
      "due_date": "2023-10-10T00:00:00.000Z",
      "attachment": null,
      "createdAt": "2023-10-09T06:14:21.565Z",
      "updatedAt": "2023-10-09T06:14:21.565Z",
      "sectionId": 4,
      "studentAssignmentSubmissions": []
  },
  {
      "id": 4,
      "title": "hiiiiiiiiiiiiiii",
      "description": "hiiiiiiiiiiiiiiii",
      "due_date": "+020032-10-06T21:00:00.000Z",
      "attachment": "assets/assignmentFile-1696832305567-937960002.pdf",
      "createdAt": "2023-10-09T06:18:25.584Z",
      "updatedAt": "2023-10-09T06:18:25.584Z",
      "sectionId": 4,
      "studentAssignmentSubmissions": []
  }
]
  const courseId = params.courseId;
  // const assignments= axiosHandler('GET',`/sectionAssignment/${courseId}`)
  return (
    <div className="page">
    {role=='teacher'&&isAdding&&<AddAssignmentModal courseId={courseId} setIsAdding={setIsAdding} /> }
      <Navbar/>
      <main className="main bg-gray-200">
    <div className="courseComponent rounded-lg">
      <CourseBar courseId={courseId} />
      <div className="courseFlex">
        <div className="courseLeft">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            {role == 'teacher' && <MdOutlineLibraryAdd onClick={()=>{setIsAdding(true)}} className="absolute right-2 top-3 text-lg"/>}
            {role == 'student' &&<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 text-center py-3">
                    Assignment
                  </th>
                  <th scope="col" class="px-6 text-center py-3">
                    Completion Status
                  </th>
                  <th scope="col" class="px-6 text-center py-3">
                    Score
                  </th>
                  <th scope="col" class="px-6 text-center py-3">
                    Evaluation 
                  </th>
                  <th scope="col" class="px-6 text-center py-3">
                    DeadLine 
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment, i)=>{
                  return(
                <tr key={i} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  > <Link className="text-blue-300" href={`/courses/${courseId}/assignment/${assignment.id}`}>
                    {assignment.name}
                    </Link>
                  </th>
                  <td class="px-6 text-center py-4">{assignment.completionStatus}</td>
                  <td class="px-6 text-center py-4">{assignment.score} / 10</td>
                  <td class="px-6 text-center py-4">{assignment.evaluationURL?<Link className="text-blue-300" href={`/courses/${courseId}/assignment/${assignment.id}/evaluation`}>Evaluated</Link>:''}</td>
                  <td class="px-6 text-center py-4">{assignment.deadline}</td>
                </tr>
                  )
                })}
              </tbody>
            </table>}
            {role == 'teacher' &&<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 text-center py-3">
                    Assignment
                  </th>
                  <th scope="col" class="px-6 text-center py-3">
                    No of Submissions
                  </th>
                  <th scope="col" class="px-6 text-center py-3">
                    no of evaluations
                  </th>
                  <th scope="col" class="px-6 text-center py-3">
                    deadline 
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment, i)=>{
                  return(
                <tr key={i} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  > <Link className="text-blue-300" href={`/courses/${courseId}/assignment/${assignment.id}`}>
                    {assignment.title}
                    </Link>
                  </th>
                  <td class="px-6 text-center py-4">{assignment.no}/{assignment.studentAssignmentSubmissions.length}</td>
                  <td class="px-6 text-center py-4">{assignment.evaluated} / {assignment.no}</td>
                  <td class="px-6 text-center py-4">{new Date(assignment.due_date).toDateString()}</td>
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
