import React, { useState,useEffect } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import { axiosHandler } from "@/public/Utilities/axiosHandler";

function AddSection({setIsAdding,courseId,departmentId,refreshData}) {
    const [error,setError]=useState('')
    const [sectionData,setSectionData]=useState({})
    const [checkedData,setCheckedData]=useState([])
    const [instructors,setInstructors]=useState([])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            console.log(JSON.stringify({...sectionData,courseId:courseId}));
            const data =await axiosHandler('POST',`/section`,{...sectionData,courseId:courseId,days:checkedData.join()})
            if(data){
                setIsAdding(false)
                refreshData()
            }
        }catch(e){setError(e.message)}
    }
    const changeHandler =(e)=>{
        const {name,value}= e.target
        setSectionData({...sectionData,[name]:value})
    }
    const checkHandler = (e)=>{
        const{checked, value}=e.target
        if(checked){
            setCheckedData([...checkedData,value])
        }else{
            const data = checkedData.filter(item=>item!==value)
            setCheckedData(data)
        }
    }
    const fetchData = async ()=>{
        try{
            const data=await axiosHandler('GET',`/departmentinstructors/${departmentId}`)
            setInstructors(data.rows)
        }catch(e){setError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
      <div className="absolute w-full h-full bg-black z-10 opacity-40"></div>
      <div className="absolute left-0 right-0 bottom-0 top-0 m-auto w-8/12 h-5/6 bg-white z-10 ">
        <AiOutlineClose
          className=" float-right text-xl m-2 cursor-pointer"
          onClick={() => {
            setIsAdding(false);
          }}
        />
        <h1 className="my-10 text-2xl font-bold mx-10 ">Add Section</h1> 
        {error&&<p className="text-lg text-red-700 font-bold">{error}</p>}
<form className="mx-10 mb-6" onSubmit={handleSubmit}>
    <div class="grid gap-4 mb-6 md:grid-cols-2">
        <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section Name</label>
            <input onChange={changeHandler} type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>
        <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section Number</label>
            <input onChange={changeHandler} type="number" name="section_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>
        <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
            <input onChange={changeHandler} type="number" name="year" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>  
        <div>
            <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
            <input onChange={changeHandler} type="text" name="semester" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>
        <div>
            <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Building</label>
            <input onChange={changeHandler} type="text" name="building" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>
        <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Number</label>
            <input onChange={changeHandler} type="text" name="room_no" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>  
        <div>
            <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">instructor</label>
            <input list="instructors" onChange={changeHandler} type="text" name="instructorId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            <datalist id="instructors">
                {instructors.map((instructor)=>{
                    <option value={instructor.id}>{instructor.name}</option>
                })}
            </datalist>
        </div>
        <div>
            <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacity</label>
            <input onChange={changeHandler} type="number" name="capacity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>
        <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
            <input onChange={changeHandler} type="date" name="start_time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>  
        <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
            <input onChange={changeHandler} type="date" name="end_time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>  
    <div >
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days</label>
            <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="vue-checkbox-list" onChange={checkHandler} type="checkbox" name="days" value="Sunday" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="vue-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sun</label>
                    </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="react-checkbox-list" onChange={checkHandler} type="checkbox" name="days" value="Monday" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="react-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mon</label>
                    </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="angular-checkbox-list" onChange={checkHandler} name="days" type="checkbox" value="Tuesday" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="angular-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tues</label>
                    </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="laravel-checkbox-list" onChange={checkHandler} name="days" type="checkbox" value="Wednsday" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="laravel-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wed</label>
                    </div>
                </li>
                <li class="w-full dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="laravel-checkbox-list" onChange={checkHandler} name="days" type="checkbox" value="Thursday" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="laravel-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thu</label>
                    </div>
                </li>
            </ul>

        </div> 
        <div>
            <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
            <select id="countries" name="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""></option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
            </select>
        </div> 
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

      </div>
    </div>
  );
}

export default AddSection;
