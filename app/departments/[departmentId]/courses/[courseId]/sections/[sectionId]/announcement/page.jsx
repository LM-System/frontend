"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/app/components/Navbar/Navbar'
import Link from 'next/link'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineClose,AiOutlineMinus} from 'react-icons/ai'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import AddAnnouncement from '@/app/components/section/AddAnnouncement'
import showToastify from '@/public/Utilities/Toastify'

function page({params}) {
  const {instituteId,departmentId,courseId,sectionId} = params
    const [fetchingError,setFetchingError]=useState('')
    const [isAdding,setIsAdding] = useState(false)
    const [announcements,setAnnouncements]=useState([])

    const handleDelete = async (id)=>{
        try{
            const data =await axiosHandler('DELETE',`/sectionAnnouncement/${id}`)
            if(data){
                showToastify("deleted")
                fetchData()
            }
        }catch(e){
            // setFetchingError(e.message)
            showToastify("error")
        }
    }
    
    const fetchData = async ()=>{
        try{
            const data=await axiosHandler('GET',`/sectionannouncements/${sectionId}`)
            setAnnouncements(data)
        }catch(e){setFetchingError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='page'>
    {isAdding&&<AddAnnouncement refreshData={fetchData} courseId={courseId} sectionId={sectionId} setIsAdding={setIsAdding}/>}
        <Navbar/>
        <main className='main'>
        {fetchingError&& <p className='text-lg text-red-600 bottom-1/2 left-1/4 font-bold absolute text-center z-10'>{fetchingError}, Please refresh the page</p>}
            <div>
                
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    {!isAdding&&<GrAdd onClick={()=>{setIsAdding(true)}} className='absolute right-3 top-3 text-lg cursor-pointer'/>}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Body
                </th>
            </tr>
        </thead>
        <tbody>
            {announcements?.map((announcement)=>{
                return(
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                   {announcement.title}
                </th>
                <td className="px-6 py-4">
                    {announcement.body}
                </td>
                <AiOutlineMinus onClick={()=>{
                    handleDelete(announcement.id)
                }} className='text-lg absolute right-4 mt-3 text-black cursor-pointer'/>
            </tr>
                )
            })}
        </tbody>
    </table>
</div>

            </div>
        </main>
        </div>
  )
}

export default page