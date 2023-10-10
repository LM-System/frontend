"use client"
import React, {useState} from 'react'
import AnnouncementContainer from './Container'
import Cookies from 'js-cookie'
import { MdEdit } from "react-icons/md";
import {GrClose} from "react-icons/gr"

export default function Announcements({sectionId}) {
  const { role } = JSON.parse(Cookies.get("user_info"))
  const [wantToEdit, setWantToEdit] = useState(false)
  return (
    <div className=" mt-8 bg-white dark:bg-darkcomp drop-shadow-xl rounded-lg w-full">
    {role === 'instructor' &&
      !wantToEdit ?
      <MdEdit
      onClick={() => { setWantToEdit(true) }}
      className="absolute right-4 top-4 cursor-pointer text-lg dark:text-white" />
      :
      <GrClose
      onClick={() => { setWantToEdit(false) }}
      className="absolute right-4 top-4 cursor-pointer text-lg dark:text-white" />
    }
    <h2 id="announcements" className=" px-5 pt-5 text-xl mb-4">
      Announcements
    </h2>
    <hr className="mx-5 my-3" />
    <div className="p-5 overflow-y-auto h-half">
      <AnnouncementContainer sectionId={sectionId} wantToEdit={wantToEdit}/>
    </div>
  </div>
  )
}
