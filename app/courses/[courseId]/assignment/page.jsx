"use client";
import React from "react";
import CourseBar from "@/app/components/Course/Bar";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import {MdOutlineLibraryAdd} from 'react-icons/md'

function Assignment({ params }) {
  const sectionStudent =[{},{},{}]
  const role = 'teacher'
  const assignments= [{name:'JavaScript fundemental',url:'',completionStatus:'completed',score:10,evaluationURL:'fgsdgs'},{name:'JavaScript fundemental',url:'',completionStatus:'completed',score:10,evaluationURL:'fgsdgs'},{name:'JavaScript fundemental',url:'',completionStatus:'completed',score:10,evaluationURL:'fgsdgs'},{name:'JavaScript fundemental',url:'',completionStatus:'incompleted',score:0,evaluationURL:''}]
  const courseId = params.courseId;
  return (
    <div className="page">
      <Navbar/>
      <main className="main bg-gray-200">
      <section className="w-full flex justify-center bg-gray-200">
              <section className="w-11/12 mt-10 bg-gray-200">
    <div className="h-full overflow-hidden bg-gray-200">
      <CourseBar courseId={courseId} />
      <div className="flex justify-between h-full bg-gray-200 mt-4 ">
        <div className=" w-8/12 bg-white h-full drop-shadow-xl p-4 pt-6 h-eighty overflow-y-auto">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            {role == 'teacher' &&<Link href={'dfd'}>
            <MdOutlineLibraryAdd className="absolute right-2 top-3 text-lg"/></Link>}
            {role == 'student' &&<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Assignment
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Completion Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Score
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Evaluation 
                  </th>
                  <th scope="col" class="px-6 py-3">
                    DeadLine 
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment)=>{
                  return(
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  > <Link className="text-blue-300" href={assignment.url}>
                    {assignment.name}
                    </Link>
                  </th>
                  <td class="px-6 py-4">{assignment.completionStatus}</td>
                  <td class="px-6 py-4">{assignment.score} / 10</td>
                  <td class="px-6 py-4">{assignment.evaluationURL?<Link className="text-blue-300" href={assignment.evaluationURL}>Evaluated</Link>:''}</td>
                  <td class="px-6 py-4">{assignment.deadline}</td>
                </tr>
                  )
                })}
              </tbody>
            </table>}
            {role == 'teacher' &&<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Assignment
                  </th>
                  <th scope="col" class="px-6 py-3">
                    No of Submissions
                  </th>
                  <th scope="col" class="px-6 py-3">
                    no of evaluations
                  </th>
                  <th scope="col" class="px-6 py-3">
                    deadline 
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment)=>{
                  return(
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  > <Link className="text-blue-300" href={assignment.url}>
                    {assignment.name}
                    </Link>
                  </th>
                  <td class="px-6 py-4">{assignment.no}/{sectionStudent.length}</td>
                  <td class="px-6 py-4">{assignment.evaluated} / {assignment.no}</td>
                  <td class="px-6 py-4">{assignment.deadline}</td>
                </tr>
                  )
                })}
              </tbody>
            </table>}
          </div>
        </div>
        <div className="w-3/12 bg-white h-full drop-shadow-xl"></div>
      </div>
    </div>
    </section>
    </section>
    </main>
    </div>
  );
}

export default Assignment;
