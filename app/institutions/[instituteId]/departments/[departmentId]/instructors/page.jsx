"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/app/components/Navbar/Navbar'
import Link from 'next/link'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineClose,AiOutlineMinus} from 'react-icons/ai'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import AddInstructors from '@/app/components/department/AddInstructors'

function students({params}) {
  const instituteId = params.instituteId
  const departmentId = params.departmentId
    const [fetchingError,setFetchingError]=useState('')
    const [isAdding,setIsAdding] = useState(false)
    const [students,setStudents]=useState([])

    const handleDelete = async (id)=>{
        try{
            const data =await axiosHandler('DELETE',`/department/${id}`)
        }catch(e){setFetchingError(e.message)}
    }
    
    const fetchData = async ()=>{
        try{
            const data=await axiosHandler('GET',`/departmentstudents/${departmentId}`)
            setStudents(data.rows)
        }catch(e){setFetchingError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='page'>
    {isAdding&&<AddInstructors departmentId={departmentId} setIsAdding={setIsAdding}/>}
        <Navbar/>
        <main className='main'>
        {fetchingError&& <p className='text-lg text-red-600 bottom-1/2 left-1/4 font-bold absolute text-center z-10'>{fetchingError}, Please refresh the page</p>}
            <div>
                
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    {!isAdding&&<GrAdd onClick={()=>{setIsAdding(true)}} className='absolute right-3 top-3 text-lg cursor-pointer'/>}
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Student Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Sections
                </th>
            </tr>
        </thead>
        <tbody>
            {students?.map((course)=>{
                return(
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white">
                   {course.name}
                </th>
                <td class="px-6 py-4">
                    {course.description}
                </td>
                <td class="px-6 py-4">
                <Link href={`/institutions/${instituteId}/departments/${departmentId}/students/${course.id}`}>Sections</Link>
                </td>
                {/* <AiOutlineMinus onClick={()=>{
                    handleDelete(department.id)
                }} className='text-lg absolute right-4 mt-3 text-black cursor-pointer'/> */}
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

export default students