"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/app/components/Navbar/Navbar'
import Link from 'next/link'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineClose,AiOutlineMinus} from 'react-icons/ai'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import AddInstructors from '@/app/components/department/AddInstructors'
import showToastify from '@/public/Utilities/Toastify'

function Students({params}) {
  const instituteId = params.instituteId
  const departmentId = params.departmentId
    const [fetchingError,setFetchingError]=useState('')
    const [isAdding,setIsAdding] = useState(false)
    const [instructors,setInstructors]=useState([])

    const handleDelete = async (id)=>{
        try{
            const {data} =await axiosHandler('DELETE',`/deleteinstructor/${id}`)
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
            const {data}=await axiosHandler('GET',`/departmentinstructors/${departmentId}`)
            setInstructors(data.rows)
        }catch(e){setFetchingError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='page'>
    {isAdding&&<AddInstructors departmentId={departmentId} fetchData={fetchData} setIsAdding={setIsAdding}/>}
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
                    Instructor ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Gender
                </th>
                <th scope="col" className="px-6 py-3">
                    Birth Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Address
                </th>
                <th scope="col" className="px-6 py-3">
                </th>
            </tr>
        </thead>
        <tbody>
            {instructors?.map((instructor)=>{
                return(
            <tr key={instructor.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white">
                   {instructor.id}
                </th>
                <td className="px-6 py-4">
                    {instructor.fullname}
                </td>
                <td className="px-6 py-4">
                    {instructor.userEmail}
                </td>
                <td className="px-6 py-4">
                    {instructor.gender}
                </td>
                <td className="px-6 py-4">
                    {instructor.birth_date.split('T')[0]}
                </td>
                <td className="px-6 py-4">
                    {instructor.phone_number}
                </td>
                <td className="px-6 py-4">
                    {instructor.address}
                </td>
                {/* <td className="px-6 py-4">
                <Link href={`/institutions/${instituteId}/departments/${departmentId}/instructors/${course.id}`}>Sections</Link>
                </td> */}
                <AiOutlineMinus onClick={()=>{
                    handleDelete(instructor.id)
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

export default Students