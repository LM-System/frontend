"use client"
import React, { useState } from 'react'
import Navbar from '@/app/components/Navbar/Navbar'
import CourseBar from '@/app/components/Course/Bar'
import { MdEdit } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import Cookies from 'js-cookie'

function Grades({ params }) {
    const [changedGrades, setChangedGrades] = useState([])
    const [ischanging, setIschanging] = useState(false)

    const handleChange = (e, student) => {
        const { name, value } = e.target
        setChangedGrades([...changedGrades, { [student]: { [name]: value } }])
    }

    const handleSave = () => {
        setIschanging(false)
    }

    const {role} = JSON.parse(Cookies.get("user_info"))
    const grades = [{ name: 'ahmad', subject: 'math', first: 30, second: 20, final: 40 }]
    const sectionId = params.sectionId;
    const courseId = params.courseId;    return (
        <div className="page">
            <Navbar />
            <main className="main bg-gray-200">
                <div className='courseComponent'>
                    <CourseBar courseId={courseId} sectionId={sectionId}/>
                    <div className='courseFlex'>
                        <div className='courseLeft'>

                            <div className="relative overflow-x-auto rounded-lg">
                                {role == 'instructor' && !ischanging && <MdEdit onClick={() => {
                                    setIschanging(true)
                                }} className='absolute top-3 right-3 cursor-pointer text-lg' />}
                                {role == 'instructor' && ischanging && <AiOutlineClose onClick={() => {
                                    setIschanging(false)
                                }} className='absolute top-3 right-3 cursor-pointer text-lg' />}
                                {!ischanging && <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                {role == 'instructor' ? 'Student Name' : 'Subject'}
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                First
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Second
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Final
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                overall
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grades.map((grade, i) => {
                                            const overall = grade.first + grade.second + grade.final
                                            return (
                                                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {role == 'instructor' ? grade.name : grade.subject}
                                                    </th>
                                                    <td className="px-6 py-4" >
                                                        {grade.first} / 30
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {grade.second} / 30
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {grade.final} / 40
                                                    </td>
                                                    <td className={`px-6 py-4 ${overall >= 50 ? 'text-green-500' : 'text-red-500'}`}>
                                                        {overall} / 100
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>}
                                {ischanging && <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                {role == 'instructor' ? 'Student Name' : 'Subject'}
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                First
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Second
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Final
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                overall
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grades.map((grade) => {
                                            const overall = grade.first + grade.second + grade.final
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {role == 'instructor' ? grade.name : grade.subject}
                                                    </th>
                                                    <td className="px-6 py-4" >
                                                        <input name='firse' onChange={(e) => handleChange(e, grade.name)} placeholder={grade.first} className='w-7' /> / 30
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <input name='second' onChange={(e) => handleChange(e, grade.name)} placeholder={grade.second} className='w-7' /> / 30
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <input name='final' onChange={(e) => handleChange(e, grade.name)} placeholder={grade.final} className='w-7' /> / 40
                                                    </td>
                                                    <td className={`px-6 py-4 ${overall >= 50 ? 'text-green-500' : 'text-red-500'}`}>
                                                        {overall} / 100
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>}
                                {ischanging && <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-sm rounded-sm text-sm px-2 py-1.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 float-right mt-2 mr-2" onClick={handleSave}>Save Changes</button>}
                            </div>


                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Grades