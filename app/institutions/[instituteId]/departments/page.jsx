'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import Link from 'next/link'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineClose,AiOutlineMinus} from 'react-icons/ai'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import AddDepartment from '@/app/components/department/AddDepartment'
import { usePathname } from 'next/navigation'


function Page({params}) {
    const pathname = usePathname()
    const instituteId = params.instituteId
    const [fetchingError,setFetchingError]=useState('')
    const [isAdding,setIsAdding] = useState(false)
    const [departments,setDepartments]=useState([])
    const handleDelete = async (id)=>{
        try{
            const data =await axiosHandler('DELETE',`/department/${id}`)
        }catch(e){setFetchingError(e.message)}
    }
    const fetchData = async ()=>{
        try{
            const data=await axiosHandler('GET',`/institutiondepartments/${instituteId}`)
            setDepartments(data.rows)
        }catch(e){setFetchingError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='page'>
        <Navbar/>
        {isAdding && <AddDepartment institutionId={instituteId} fetchData={fetchData} setIsAdding={setIsAdding}/>}
        <main className='main'>
        {fetchingError&& <p className='text-lg text-red-600 bottom-1/2 left-1/4 font-bold absolute text-center z-10'>{fetchingError}, Please refresh the page</p>}
            <div>
                
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    {!isAdding&&<GrAdd onClick={()=>{setIsAdding(true)}} className='absolute right-3 top-3 text-lg cursor-pointer'/>}
    {isAdding&&<AiOutlineClose onClick={()=>{setIsAdding(false)}} className='absolute right-3 top-3 text-lg cursor-pointer text-black'/>}
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Departments ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Department Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Department Head
                </th>
                <th scope="col" class="px-6 py-3">
                    Courses
                </th>
                <th scope="col" class="px-6 py-3">
                    Students
                </th>
                <th scope="col" class="px-6 py-3">
                    instructors
                </th>
            </tr>
        </thead>
        <tbody>
            {departments?.map((department)=>{
                return(
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th class="px-6 py-4">
                {department.id}
                </th>
                <td scope="row" class="px-6 py-4  text-blue-700">
                  {department.name}
                </td>
                <td scope="row" class="px-6 py-4  text-blue-700">
                  {department.departmentHead.fullname}
                </td>
                <td scope="row" class="px-6 py-4  text-blue-700">
                   <Link href={`/institutions/${instituteId}/departments/${department.id}/courses`}>courses</Link>
                </td>
                <td class="px-6 py-4 text-blue-700">
                    <Link href={`${pathname}/${department.id}/students`}>students</Link>
                </td>
                <td class="px-6 py-4 text-blue-700">
                    <Link href={`${pathname}/${department.id}/instructors`}>instructors</Link>
                </td>
                <AiOutlineMinus onClick={()=>{
                    handleDelete(department.id)
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