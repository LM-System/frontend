"use client"
import React, { useState, useEffect } from "react";
import CourseBar from "@/app/components/Course/Bar";
import Navbar from "@/app/components/Navbar/Navbar";
import Image from "next/image";
import AddStudent from "@/app/components/Course/ClassList/AddStudent";
import {MdEdit} from 'react-icons/md'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineMinus} from 'react-icons/ai'
import {BsTrash,BsFillChatSquareTextFill} from 'react-icons/bs'
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Cookies from "js-cookie";

export default function Classlist({ params }) {
  const {userEmail,id} = JSON.parse(Cookies.get('user_info'))
  console.log(userEmail)
  const courseId = params.courseId;
  const [classlist, setClasslist] = useState([]);
  const [instructor, setInstructor] = useState({});
  const [isEditing,setIsEditing]= useState(false)
  const [isAdding,setIsAdding]= useState(false)
  const [instructorRoomId,setInstructorRoomId]= useState(false)

  const handleSave = ()=>{
    setIsEditing(false)
  }
  useEffect(() => {
    const fetchClassList = async () => {
      const data = await axiosHandler('GET', `/classlist/${courseId}`)
      if(data){
        setClasslist(data.students)
        setInstructor(data.instructor)
        console.log(data)
      }
    }
    fetchClassList()
  }, [courseId])
  const role = 'student'
  function convertToAscii (str){
    const arr =str.split('')
    const arr2 = arr.map((char)=>{
      return (char.charCodeAt())
    })
    return(arr2.join(''))
  }
  const emailAscii = convertToAscii(userEmail)
  if(instructor?.email){
    const instructotEmailAscii = convertToAscii(instructor?.userEmail)
    setInstructorRoomId(emailAscii+instructotEmailAscii)
  }
  return (
    <div className="page">
      {role =='teacher' &&isAdding&& <AddStudent setIsAdding={setIsAdding}/>}
      <Navbar/>
      <main className="main bg-gray-200">
    <div className="courseComponent rounded-lg">
      <CourseBar courseId={courseId} />
      <div className="courseFlex">
        <div className='courseLeft'>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            {role == 'teacher' &&<GrAdd onClick={()=>{
              setIsAdding(true)
            }} className="absolute right-3 top-3 cursor-pointer text-lg"/>}
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody>
                {instructor &&
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* <Image class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/> */}
                    <span class="flex flex-col gap pl-3">
                      <span class="text-base font-semibold">{instructor?.fullname}</span>
                      <span class="font-normal text-gray-500">
                        {instructor?.email}
                      </span>
                    </span>
                  </th>
                  <td class="px-6 py-4">instructor</td>
                  <td class="px-6 py-4">
                    <span class="flex items-center">
                      <span class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>{" "}
                      {instructor?.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 w-20">
                    <a
                      href={`/chat/${instructor?.fullname}/${instructor?.id}/${instructorRoomId}`}
                      type="button"
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline p-2 text-center"
                    >
                      <BsFillChatSquareTextFill className="w-20 text-lg"/>
                    </a>
                  </td>
                  {role=='teacher'&&<AiOutlineMinus className="absolute right-3 mt-4 cursor-pointer text-lg text-black"/>}
                </tr>}
                {
                  classlist?.map((student, i)=>{
                    const studentEmailAscii = convertToAscii(student.userEmail)
                    console.log(studentEmailAscii);
                    const roomId = emailAscii+studentEmailAscii
                    console.log(roomId)
                    return(
                <tr key={i} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* <Image class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/> */}
                    <span class="flex flex-col gap pl-3">
                      <span class="text-base font-semibold">{student.fullname}{id==student.id&&<span className="ml-1 text-sm text-green-600">(me)</span>}</span>
                      
                      <span class="font-normal text-gray-500">
                        {student.userEmail}
                      </span>
                    </span>
                  </th>
                  <td class="px-6 py-4">student</td>
                  <td class="px-6 py-4">
                    <span class="flex items-center">
                      <span class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>{" "}
                      {student.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 w-20">
                    <a
                      href={`/chat/${student.fullname}/${student.id}/${roomId}`}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline p-2 text-center"
                    >
                      <BsFillChatSquareTextFill className="w-20 text-lg"/>
                    </a>
                  </td>
                  {role=='teacher'&&<AiOutlineMinus className="absolute right-3 mt-4 cursor-pointer text-lg text-black"/>}
                </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
            {/* {role=='teacher'&&<button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-sm rounded-sm text-sm px-2 py-1.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 float-right mt-2 mr-2" onClick={handleSave}>Save Changes</button>} */}
              {/* {role=='teacher'&&<button type="button" onClick={()=>{
                setIsEditing(false)
              }} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-sm rounded-sm text-sm px-2 py-1.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 float-right mt-2 mr-2">cancel</button>} */}
        </div>
      </div>
    </div>
    </main>
    </div>
  );
}