import React, { useState } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import {GrAdd} from 'react-icons/gr'
import { axiosHandler } from "@/public/Utilities/axiosHandler";

function AddDepartment({setIsAdding,institutionId,fetchData}) {
    const [error,setError]=useState('')
    const [departmentData,setDepartmentData]=useState({})
    const handleSubmit = async ()=>{
        try{
            console.log(departmentData);
            const data =await axiosHandler('POST',`/department`,departmentData)
            if(data){
                setIsAdding(false)
                fetchData()
            }
        }catch(e){setError(e.message)}
    }
    const changeHandler =(e)=>{
        const {name,value}= e.target
        setDepartmentData({institutionId:institutionId,[name]:value})
    }
  return (
      <div className="absolute right-8 top-16 w-60 h-1/6 z-10 ">
        <input onChange={changeHandler} type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required/>
    <GrAdd onClick={handleSubmit} className="absolute top-1 right-1 m-2 text-lg cursor-pointer"/>
    {error&&<p className="text-xs pl-3 text-red-700 font-bold">{error}</p>}
      </div>
  );
}

export default AddDepartment;
