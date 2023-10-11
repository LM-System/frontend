import React, { useState,useEffect } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Loading from "../Loading/Spinner";
import showToastify from "@/public/Utilities/Toastify";


function JoinSection({setIsAdding,departmentId,refreshData,studentId}) {
    const [error,setError]=useState('')
    const [sectionId,setSectionId]=useState(0)
    const [sections,setSections]=useState([])
    const [courses,setCourses]=useState([])
    const [isloading,setIsloading]=useState(false)

    const handleSubmit = async ()=>{
        try{
            setIsloading(true)
            const data =await axiosHandler('POST',`/registersection/${studentId}/${sectionId}`)
            if(data){
                showToastify("added")
                refreshData()
                setIsloading(false)
            }
        }catch(e){
            showToastify("error")
            setIsloading(false)
            // setError(e.message)
        }
    }
    const selectHandler = async (e)=>{
        try{
            const {data} =await axiosHandler('GET',`/coursesections/${e.target.value}`)
            if(data){
                setSections(data.rows)
            }
        }catch(e){setError(e.message)}
    }
    const changeHandler =(e)=>{
        setSectionId(e.target.value)
    }
    const fetchData = async ()=>{
        try{
            const {data}=await axiosHandler('GET',`/departmentcourses/${departmentId}`)
            setCourses(data.rows)
        }catch(e){setError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
      <div className="absolute w-full h-full bg-black z-10 opacity-40"></div>
      <div className="absolute left-0 right-0 bottom-0 top-0 m-auto w-6/12 h-3/6 max-w-2xl rounded-lg bg-white z-10 ">
        <AiOutlineClose
          className=" float-right text-xl m-2 cursor-pointer"
          onClick={() => {
            setIsAdding(false)
            refreshData();
          }}
        />
        <h1 className="my-12 text-2xl font-bold mx-10 ">Join Section</h1> 
        {error&&<p className="text-lg text-red-700 font-bold">{error}</p>}
<div className="mx-10 mb-6" >
<div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Course</label>
        <select name="coursesId" onChange={selectHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option></option>
                {courses?.map((course)=>{
                    return(<option key={course.id} value={course.id}>{course.name}</option>)
                })}
            </select>
    </div> 
<div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Section</label>
        <select name="coursesId" onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option></option>
                {sections?.map((section)=>{
                    return(<option key={section.id} value={section.id}>{section.name}</option>)
                })}
            </select>
    </div> 
    
    <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isloading? <Loading dim={6}/> :'Add'}</button>
</div>

      </div>
    </div>
  );
}

export default JoinSection;
