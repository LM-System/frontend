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
  const {userEmail,id,role} = JSON.parse(Cookies.get('user_info'))
  console.log(userEmail)
  const sectionId = params.sectionId;
  const courseId = params.courseId;
  const [classlist, setClasslist] = useState([]);
  const [instructor, setInstructor] = useState({});
  const [isEditing,setIsEditing]= useState(false)
  const [isAdding,setIsAdding]= useState(false)
  const [instructorRoomId,setInstructorRoomId]= useState()

  const handleSave = ()=>{
    setIsEditing(false)
  }
  useEffect(() => {
    const fetchClassList = async () => {
      const {data} = await axiosHandler('GET', `/classlist/${sectionId}`)
      if(data){
        setClasslist([...data.students,{...data.instructor,role:'instructor'}])
        // setInstructor(data.instructor)
        console.log(data)
      }
    }
    fetchClassList()
    if(instructor.userEmail){
      const instructotEmailAscii = convertToAscii(instructor?.userEmail)
      setInstructorRoomId(emailAscii+instructotEmailAscii)
    }
  }, [])
  function convertToAscii (str){
    const arr =str.split('')
    const arr2 = arr.map((char)=>{
      return (char.charCodeAt())
    })
    return(arr2.join(''))
  }
  console.log(classlist)
  const emailAscii = convertToAscii(userEmail)
  return (
    <div className="page">
      {role =='instructor' &&isAdding&& <AddStudent setIsAdding={setIsAdding}/>}
      <Navbar/>
      <main className="main bg-gray-200">
    <div className="courseComponent rounded-lg">
      <CourseBar courseId={courseId} sectionId={sectionId}/>
      <div className="courseFlex">
        <div className='courseLeft'>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {role == 'instructor' &&<GrAdd onClick={()=>{
              setIsAdding(true)
            }} className="absolute right-3 top-3 cursor-pointer text-lg"/>}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Status
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  classlist?.map((student, i)=>{
                    const studentEmailAscii = convertToAscii(student.userEmail)
                    console.log(studentEmailAscii);
                    const roomId = emailAscii+studentEmailAscii
                    console.log(roomId)
                    return(
                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* <Image className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/> */}
                    <span className="flex flex-col gap pl-3">
                      <span className="text-base font-semibold">{student.fullname}{userEmail==student.userEmail&&<span className="ml-1 text-sm text-green-600">(me)</span>}</span>
                      
                      <span className="font-normal text-gray-500">
                        {student.userEmail}
                      </span>
                    </span>
                  </th>
                  <td className="px-6 py-4">{student.role?'instructor':'student'}</td>
                  {/* <td className="px-6 py-4">
                    <span className="flex items-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>{" "}
                      {student.status}
                    </span>
                  </td> */}
                  <td className="px-6 py-4 w-20">
                    <a
                      href={`/chat/${student.fullname}/${student.id}/${roomId}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline p-2 text-center"
                    >
                      <BsFillChatSquareTextFill className="w-20 text-lg"/>
                    </a>
                  </td>
                  {role=='instructor'&&<AiOutlineMinus className="absolute right-3 mt-4 cursor-pointer text-lg text-black"/>}
                </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
            {/* {role=='teacher'&&<button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-sm rounded-sm text-sm px-2 py-1.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 float-right mt-2 mr-2" onClick={handleSave}>Save Changes</button>} */}
              {/* {role=='teacher'&&<button type="button" onClick={()=>{
                setIsEditing(false)
              }} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-sm rounded-sm text-sm px-2 py-1.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 float-right mt-2 mr-2">cancel</button>} */}
        </div>
      </div>
    </div>
    </main>
    </div>
  );
}