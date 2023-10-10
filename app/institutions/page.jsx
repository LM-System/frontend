"use client"
import React, { use, useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Link from 'next/link'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import {MdEdit} from 'react-icons/md'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineMinus} from 'react-icons/ai'
import AddInstitution from '../components/institution/AddInstitution'
function Page() {
    const [fetchingError,setFetchingError]=useState('')
    const [isAdding,setIsAdding] = useState(false)
    const [institutions,setInstitutions]=useState([])

    const handleDelete =  (id)=>{
        try{
            axiosHandler('DELETE',`/institution/${id}`)
            .then((result)=>{
                fetchData()
            })
        }catch(e){setFetchingError(e.message)}
    }
    const fetchData = async ()=>{
        try{
            const data=await axiosHandler('GET',`/institutions`)
                setInstitutions(data.rows)
        }catch(e){setFetchingError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div className='page'>
        {isAdding && <AddInstitution fetchData={fetchData} setIsAdding={setIsAdding}/>}
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
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                   Institution Admin
                </th>
                <th scope="col" class="px-6 py-3">
                   phone number
                </th>
                <th scope="col" class="px-6 py-3">
                   email 
                </th>
                <th scope="col" class="px-6 py-3">
                   address
                </th>
                {/* <th scope="col" class="px-6 py-3">
                    Departments 
                </th> */}
            </tr>
        </thead>
        <tbody>
            {institutions?.map((institute)=>{
                return(
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 whitespace-nowrap dark:text-white">
                   {institute.id}
                </th>
                <td class="px-6 py-4">
                    {institute.name}
                </td>
                <td class="px-6 py-4">
                    {institute.admin?.fullname}
                </td>
                <td class="px-6 py-4">
                    {institute.phone_number}
                </td>
                <td class="px-6 py-4">
                    {institute.email}
                </td>
                <td class="px-6 py-4">
                    {institute.address}
                </td>
                {/* <td class="px-6 py-4">
                    <Link className='text-blue-600' href={`/institutions/${institute.id}/departments`}>Departments</Link>
                </td> */}
                <AiOutlineMinus onClick={()=>{
                    handleDelete(institute.id)
                }} className='text-lg absolute right-4 mt-4 text-black cursor-pointer'/>
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