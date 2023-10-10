"use client"
import React, { use, useEffect, useState } from 'react'
import Navbar from '@/app/components/Navbar/Navbar'
import Link from 'next/link'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import {MdEdit} from 'react-icons/md'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineMinus} from 'react-icons/ai'
import AddDepartmentHead from '@/app/components/departmentHead/AddDepartmentHead'

function Page() {
    const [fetchingError,setFetchingError]=useState('')
    const [isAdding,setIsAdding] = useState(false)
    const [departmentHead,setDepartmentHead]=useState([])

    const handleDelete =  (id)=>{
        try{
            axiosHandler('DELETE',`/deleteinstructor/${id}`)
            .then((result)=>{
                fetchData()
            })
        }catch(e){setFetchingError(e.message)}
    }
    const fetchData = async ()=>{
        try{
            const {data}=await axiosHandler('GET',`/departmenthead`)
                setDepartmentHead(data)
        }catch(e){setFetchingError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div className='page'>
        {isAdding && <AddDepartmentHead fetchData={fetchData} setIsAdding={setIsAdding}/>}
        <Navbar/>
        <main className='main'>
                {fetchingError&& <p className='text-lg text-red-600 bottom-1/2 left-1/4 font-bold absolute text-center z-10'>{fetchingError}, Please refresh the page</p>}
            <div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <GrAdd onClick={()=>{setIsAdding(true)}} className='absolute right-3 top-3 text-lg cursor-pointer'/>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Instructor ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Gender
                </th>
                <th scope="col" class="px-6 py-3">
                    Birth Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Phone Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Address
                </th>
            </tr>
        </thead>
        <tbody>
            {departmentHead?.map((user)=>{
                return(
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white">
                   {user.instructor?.id}
                </th>
                <td class="px-6 py-4">
                    {user.instructor?.fullname}
                </td>
                <td class="px-6 py-4">
                    {user.instructor?.userEmail}
                </td>
                <td class="px-6 py-4">
                    {user.instructor?.gender}
                </td>
                <td class="px-6 py-4">
                    {user.instructor?.birth_date?.split('T')[0]}
                </td>
                <td class="px-6 py-4">
                    {user.instructor?.phone_number}
                </td>
                <td class="px-6 py-4">
                    {user.instructor?.address}
                </td>
                {/* <td class="px-6 py-4">
                <Link href={`/institutions/${instituteId}/departments/${departmentId}/instructors/${course.id}`}>Sections</Link>
                </td> */}
                <AiOutlineMinus onClick={()=>{
                    handleDelete(user.instructor?.id)
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

export default Page