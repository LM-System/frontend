"use client"
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import CourseBar from "@/app/components/Course/Bar";
import {MdEdit} from 'react-icons/md'
import {GrAdd,GrClose} from 'react-icons/gr'
import {BsTrash} from 'react-icons/bs'

function Main({ params }) {
  const [isEditingAnnouncement,setIsEditingAnnouncement]=useState(false)
  const [isEditingDes,setIsEditingDes]=useState(false)

  const handleSave = ()=>{
    setIsEditingAnnouncement(false)
  }
  const handleSaveDes = ()=>{
    setIsEditingDes(false)
  }

  const role = 'teacher'
  const description ='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,excepturi! Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem! Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate.'
  const announcements = [{title:'announcement1',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate'},{title:'announcement1',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate'},{title:'announcement1',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate'},{title:'announcement1',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate'}]
  const courseId = params.courseId;
  return (
    <div className="page">
      <Navbar/>
      <main className="main bg-gray-200">
    <div className="courseComponent">
      <CourseBar courseId={courseId} />
      <div className="courseFlex">
        <div className="w-8/12 bg-gray-200 h-eighty overflow-y-auto ">
          <div className="bg-white drop-shadow-xl p-5 overflow-y-auto rounded-lg">
            {role=='teacher'&& !isEditingDes&&<MdEdit onClick={()=>{setIsEditingDes(true)}} className="absolute text-lg top-4 right-4 cursor-pointer"/>}
            {role=='teacher'&& isEditingDes&&<GrClose onClick={()=>{setIsEditingDes(false)}} className="absolute top-4 right-4 cursor-pointer text-lg"/>}
            <h2 className="text-xl mb-2">Description</h2>
            <hr />
            {!isEditingDes&&<p className="mt-2">
              {description}
            </p>}
            {role=='teacher'&& isEditingDes&&<textarea className="w-full" value={description}></textarea>}
            {role=='teacher'&&isEditingDes&&<button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-sm rounded-sm text-sm px-2 py-1.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 float-right mt-2 mr-2" onClick={handleSaveDes}>Save Changes</button>}
          </div>
          <div className=" mt-8 bg-white drop-shadow-xl rounded-lg">
            {role == 'teacher' && !isEditingAnnouncement &&<MdEdit onClick={()=>{setIsEditingAnnouncement(true)}} className="absolute right-4 top-4 cursor-pointer text-lg"/>}
            {role == 'teacher' && isEditingAnnouncement &&<GrAdd className="absolute right-4 top-4 cursor-pointer text-lg"/>}
            <h2 id="announcements" className=" px-5 pt-5 text-xl mb-4">
              Announcements
            </h2>
            <hr className="mx-5 my-3"/>
            <div className="p-5 overflow-y-auto h-half">
            {announcements.map((item)=>{
            return <div class="w-full relative text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 opacity-80 dark:border-gray-700 hover:opacity-100  transition-all mb-5 ">
              {role=='teacher'&&isEditingAnnouncement&&<BsTrash className="absolute top-2 right-2 cursor-pointer text-lg"/>}
              {role=='teacher'&&isEditingAnnouncement&&<MdEdit className="absolute top-2 right-8 cursor-pointer text-lg"/>}
              <h5 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <p class="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                {item.body}
              </p>
            </div>
            })}
              {role=='teacher'&&isEditingAnnouncement&&<button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-sm rounded-sm text-sm px-2 py-1.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 float-right mt-2 mr-2" onClick={handleSave}>Save Changes</button>}
              {role=='teacher'&&isEditingAnnouncement&&<button type="button" onClick={()=>{
                setIsEditingAnnouncement(false)
              }} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-sm rounded-sm text-sm px-2 py-1.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 float-right mt-2 mr-2">cancel</button>}
            </div>
          </div>
        </div>
        <div className="courseRight">

        </div>
      </div>
    </div>
    </main>
    </div>
  );
}

export default Main;
