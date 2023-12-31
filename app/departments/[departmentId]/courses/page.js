"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/app/components/Navbar/Navbar'
import Link from 'next/link'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineClose,AiOutlineMinus} from 'react-icons/ai'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import AddCourse from '@/app/components/Course/AddCourse'
import showToastify from '@/public/Utilities/Toastify'

function Department({params}) {
  const instituteId = params.instituteId
  const departmentId = params.departmentId
    const [fetchingError,setFetchingError]=useState('')
    const [isAdding,setIsAdding] = useState(false)
    const [courses,setCourses]=useState([])

    const handleDelete =  (id)=>{
        try{
            axiosHandler('DELETE',`/course/${id}`)
            .then((result)=>{
                showToastify("deleted")
                fetchData()
            })
            
        }catch(e){
            // setFetchingError(e.message)
            showToastify("error")
        }
    }
    
    const fetchData = async ()=>{
        try{
            const {data}=await axiosHandler('GET',`/departmentcourses/${departmentId}`)
            setCourses(data.rows)
        }catch(e){setFetchingError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='page'>
    {isAdding&&<AddCourse fetchData={fetchData} departmentId={departmentId} setIsAdding={setIsAdding}/>}
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
                    Course ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Sections
                </th>
                <th scope="col" className="px-6 py-3">
                </th>
            </tr>
        </thead>
        <tbody>
            {courses?.map((course)=>{
                return(
            <tr key={course.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
                   {course.id}
                </th>
                <td className="px-6 py-4">
                    {course.name}
                </td>
                <td className="px-6 py-4">
                    {course.description}
                </td>
                <td className="px-6 py-4 text-blue-700">
                <Link  href={`/departments/${departmentId}/courses/${course.id}/sections`}>Sections</Link>
                </td>
                <AiOutlineMinus onClick={()=>{
                    handleDelete(course.id)
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

export default Department