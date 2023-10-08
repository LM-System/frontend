import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Link from 'next/link'

function Page() {
    const departments = [{id:2,title:'tech'}]
  return (
    <div className='page'>
        <Navbar/>
        <main className='main'>
            <div>
                
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Departments Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Department Head
                </th>
                <th scope="col" class="px-6 py-3">
                    No of Students
                </th>
            </tr>
        </thead>
        <tbody>
            {departments.map((department)=>{
                return(
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white">
                   <Link href={`/departments/${department.title}`}>{department.title}</Link>
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
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