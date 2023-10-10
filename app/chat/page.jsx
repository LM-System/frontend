'use client'
import React from 'react'
import io from "socket.io-client";
import Navbar from '@/app/components/Navbar/Navbar';
import Cookies from "js-cookie";
import PeopleList from '@/app/components/chat/PeopleList';



const socket = io.connect("http://localhost:5000");
function page() {
    const {id,fullname} = JSON.parse(Cookies.get("user_info"));
  return (
    <div className='page'>
        <Navbar/>
        <main className='main bg-gray-100'>
          <div className='flex h-full border-2 border-gray-300 rounded-lg overflow-hidden'>
        <div className='w-9/12 h-full bg-white'>
    </div>
    <div className='w-3/12 h-full bg-indigo-100'>
      <PeopleList  id={id} />
    </div>
    </div>
        </main>
    </div>
  )
}

export default page