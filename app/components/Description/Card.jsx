"use client"
import React, {useState} from 'react'

export default function DescriptionCard({courseId}) {
  const [wantToEdit, setWantToEdit] = useState(false)
  return (
    <div className="bg-white drop-shadow-xl dark:bg-darkcomp p-5 overflow-y-auto rounded-lg">
      {/* {role == 'teacher' && !isEditingDes && <MdEdit onClick={() => { setIsEditingDes(true) }} className="absolute text-lg top-4 right-4 cursor-pointer" />}
      {role == 'teacher' && isEditingDes && <GrClose onClick={() => { setIsEditingDes(false) }} className="absolute top-4 right-4 cursor-pointer text-lg" />} */}
      <h2 className="text-xl mb-2">Description</h2>
      <hr />
      {/* {!isEditingDes && 
      <p className="mt-2">
        {description}
      </p>} */}
      {/* {role == 'teacher' && isEditingDes && <textarea className="w-full" value={description}></textarea>}
      {role == 'teacher' && isEditingDes && <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-sm rounded-sm text-sm px-2 py-1.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 float-right mt-2 mr-2" onClick={handleSaveDes}>Save Changes</button>} */}
    </div>
  )
}
