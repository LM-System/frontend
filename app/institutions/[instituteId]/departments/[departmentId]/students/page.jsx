"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/app/components/Navbar/Navbar'
import Link from 'next/link'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineClose,AiOutlineMinus} from 'react-icons/ai'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import AddStudents from '@/app/components/department/AddStudents'
function students({params}) {
  const instituteId = params.instituteId
  const departmentId = params.departmentId
    const [fetchingError,setFetchingError]=useState('')
    const [isAdding,setIsAdding] = useState(false)
    const [students,setStudents]=useState([])

    const handleDelete = async (id)=>{
        try{
            const data =await axiosHandler('DELETE',`/deletestudent/${id}`)
            if(data){
                fetchData()
            }
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
    {isAdding&&<AddStudents departmentId={departmentId} fetchData={fetchData} setIsAdding={setIsAdding}/>}
        <Navbar/>
        <main className='main'>
        {fetchingError&& <p className='text-lg text-red-600 bottom-1/2 left-1/4 font-bold absolute text-center z-10'>{fetchingError}, Please refresh the page</p>}
            <div>
                
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    {!isAdding&&<GrAdd onClick={()=>{setIsAdding(true)}} className='absolute right-3 top-3 text-lg cursor-pointer'/>}
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Student ID
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
                    Sections
                </th>
            </tr>
        </thead>
        <tbody>
            {students?.map((student)=>{
                return(
            <tr key={student.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                   {student.id}
                </th>
                <td className="px-6 py-4">
                    {student.fullname}
                </td>
                <td className="px-6 py-4">
                    {student.userEmail}
                </td>
                <td className="px-6 py-4">
                    {student.gender}
                </td>
                <td className="px-6 py-4">
                    {student.birth_date.split('T')[0]}
                </td>
                <td className="px-6 py-4">
                    {student.phone_number}
                </td>
                <td className="px-6 py-4">
                    {student.adderss}
                </td>
                <td className="px-6 text-blue-600 py-4">
                <Link href={`/institutions/${instituteId}/departments/${departmentId}/students/${student.id}/sections`}>Sections</Link>
                </td>
                <AiOutlineMinus onClick={()=>{
                    handleDelete(student.id)
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

export default students