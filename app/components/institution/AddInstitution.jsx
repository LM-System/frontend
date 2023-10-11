import React, { useState,useEffect } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import { axiosHandler } from "@/public/Utilities/axiosHandler";
import Loading from "../Loading/Spinner";
import showToastify from "@/public/Utilities/Toastify";


function AddInstitution({setIsAdding,fetchData}) {
    const [error,setError]=useState('')
    const [institutionData,setInstitutionData]=useState({})
    const [admins,setAdmins]=useState([])
    const [isloading,setIsloading]=useState(false)

    const handleSubmit = async (e)=>{
        setIsloading(true)
        e.preventDefault()
        try{
            console.log(JSON.stringify(institutionData))
            const {data} =await axiosHandler('POST',`/institution`,institutionData)
            if(data){
                showToastify("added")
                setIsAdding(false)
                setIsloading(false)
                fetchData()
            }
        }catch(e){
            showToastify("error")
            // setError(e.message)
            setIsloading(false)
        }
    }
    const changeHandler =(e)=>{
        const {name,value}= e.target
        setInstitutionData({...institutionData,[name]:value})
    }

    const fetchAdminsData = async ()=>{
        try{
            const {data}=await axiosHandler('GET',`/getadmins`)
            setAdmins(data)
        }catch(e){setError(e.message)}
    }
    useEffect(()=>{
        fetchAdminsData()
    },[])
  return (
    <div>
      <div className="absolute w-full h-full bg-black z-10 opacity-40"></div>
      <div className="absolute left-0 right-0 bottom-0 top-0 m-auto w-8/12 h-4/6 max-w-2xl rounded-lg bg-white z-10 ">
        <AiOutlineClose
          className=" float-right text-xl m-2 cursor-pointer"
          onClick={() => {
            setIsAdding(false);
          }}
        />
        <h1 className="my-8 text-2xl font-bold mx-10 ">Add Institution</h1> 
        {error&&<p className="text-lg text-red-700 font-bold">{error}</p>}
<form className="mx-10 mb-6" onSubmit={handleSubmit}>
    {/* <div className="grid gap-6 mb-6 md:grid-cols-2"> */}
        <div className="mb-4">
            <label htmlFor="Institution Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution Name</label>
            <input onChange={changeHandler} type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="company" required/>
        </div>
    <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input onChange={changeHandler} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required/>
    </div> 
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin</label>
            <select name="adminId" onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option></option>
                {admins?.map((admin)=>{
                    return(<option  value={admin.id}>{admin.fullname}</option>)
                })}
            </select>
        </div>
        <div className="mb-4">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <input onChange={changeHandler} type="text" name="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>  
        <div className="mb-5">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input onChange={changeHandler} type="text" name="phone_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>
    {/* </div> */}

    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isloading? <Loading dim={6}/> :'Submit'}</button>
</form>

      </div>
    </div>
  );
}

export default AddInstitution;
