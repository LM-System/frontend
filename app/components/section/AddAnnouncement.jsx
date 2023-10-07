import React, { useState } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import { axiosHandler } from "@/public/Utilities/axiosHandler";

function AddAnnouncement({setIsAdding,sectionId,refreshData}) {
    const [error,setError]=useState('')
    const [announcementData,setAnnouncementData]=useState({})
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            console.log(JSON.stringify({...announcementData,sectionId:sectionId}));
            const data =await axiosHandler('POST',`/sectionAnnouncement`,{...announcementData,sectionId:sectionId})
            if(data){
                setIsAdding(false)
                refreshData()
            }
        }catch(e){setError(e.message)}
    }
    const changeHandler =(e)=>{
        const {name,value}= e.target
        setAnnouncementData({...announcementData,[name]:value})
    }
  return (
    <div>
      <div className="absolute w-full h-full bg-black z-10 opacity-40"></div>
      <div className="absolute left-0 right-0 bottom-0 top-0 m-auto w-6/12 h-3/6 bg-white z-10 ">
        <AiOutlineClose
          className=" float-right text-xl m-2 cursor-pointer"
          onClick={() => {
            setIsAdding(false);
          }}
        />
        <h1 className="my-12 text-2xl font-bold mx-10 ">Add Section Announcement</h1> 
        {error&&<p className="text-lg text-red-700 font-bold">{error}</p>}
<form className="mx-10 mb-6" onSubmit={handleSubmit}>
    <div class="mb-6">
        <label for="course Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input onChange={changeHandler} type="text" name="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
    </div>
    <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body</label>
        <textarea onChange={changeHandler} type="text" name="body" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
    </div> 
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

      </div>
    </div>
  );
}

export default AddAnnouncement;
