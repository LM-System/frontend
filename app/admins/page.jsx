"use client"
import React, { use, useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Link from 'next/link'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import {MdEdit} from 'react-icons/md'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineMinus} from 'react-icons/ai'
import AddAdmin from '../components/admin/AddAdmin'

function Page() {
    const [fetchingError,setFetchingError]=useState('')
    const [isAdding,setIsAdding] = useState(false)
    const [admins,setAdmins]=useState([])

    const handleDelete =  (id)=>{
        try{
            axiosHandler('DELETE',`/deleteadmin/${id}`)
            .then((result)=>{
                fetchData()
            })
        }catch(e){setFetchingError(e.message)}
    }
    const fetchData = async ()=>{
        try{
            const {data}=await axiosHandler('GET',`/getadmins`)
                setAdmins(data)
        }catch(e){setFetchingError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div className='page'>
        {isAdding && <AddAdmin fetchData={fetchData} setIsAdding={setIsAdding}/>}
        <Navbar/>
        <main className='main'>
                {fetchingError&& <p className='text-lg text-red-600 bottom-1/2 left-1/4 font-bold absolute text-center z-10'>{fetchingError}, Please refresh the page</p>}
            <div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <GrAdd onClick={()=>{setIsAdding(true)}} className='absolute right-3 top-3 text-lg cursor-pointer'/>
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
            </tr>
        </thead>
        <tbody>
            {admins&& admins.map((admin)=>{
                return(
            <tr key={admin.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white">
                   {admin.id}
                </th>
                <td className="px-6 py-4">
                    {admin.fullname}
                </td>
                <td className="px-6 py-4">
                    {admin.userEmail}
                </td>
                <td className="px-6 py-4">
                    {admin.gender}
                </td>
                <td className="px-6 py-4">
                    {admin.birth_date.split('T')[0]}
                </td>
                <td className="px-6 py-4">
                    {admin.phone_number}
                </td>
                <td className="px-6 py-4">
                    {admin.address}
                </td>
                {/* <td className="px-6 py-4">
                <Link href={`/institutions/${instituteId}/departments/${departmentId}/instructors/${course.id}`}>Sections</Link>
                </td> */}
                <AiOutlineMinus onClick={()=>{
                    handleDelete(admin.id)
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