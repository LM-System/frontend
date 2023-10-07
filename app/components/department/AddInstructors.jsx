import React, { useState } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import { axiosHandler } from "@/public/Utilities/axiosHandler";

function AddInstructors({setIsAdding}) {
    const [error,setError]=useState('')
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try{
        const formData = new FormData();
        formData.append('file', selectedFile);
        await axiosHandler('POST',`/instructor`,formData)
      }catch(e){
        setError(e.message)
      }
        
    }
  };    
  return (
    <div>
      <div className="absolute w-full h-full bg-black z-10 opacity-40"></div>
      <div className="absolute left-0 right-0 bottom-0 top-0 m-auto w-5/12 h-3/6 bg-white z-10 ">
        <AiOutlineClose
          className=" float-right text-xl m-2 cursor-pointer"
          onClick={() => {
            setIsAdding(false);
          }}
        />
        <h1 className="my-10 text-2xl font-bold mx-10 ">Add Instructors</h1> 
        {error&&<p className="text-lg text-red-700 font-bold">{error}</p>}
<div className="mx-10 mb-6">
<a
        href='../../../public/assets/instructors.xlsx'
        download
      >
<button type="button" class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
  Download xlsx required to create instructors
</button>
</a>

<div className="my-10">
<label class="block mb-2 text-lg font-bold text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input onChange={handleFileChange} class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
</div>   
<button onClick={handleFileUpload} class="float-right text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg font-bold w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</div>

      </div>
    </div>
  );
}

export default AddInstructors;
