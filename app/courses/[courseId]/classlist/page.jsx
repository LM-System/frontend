import React from "react";
import CourseBar from "@/app/components/courses/CourseBar";
import Image from "next/image";
import {BsFillChatSquareTextFill} from 'react-icons/bs'
import {AiOutlineUserAdd} from 'react-icons/ai'

function Classlist({ params }) {
  const role = 'teacher'
  const classList = [{name:'Ahmad Salem',email:'Ahmad@gmail.com',role:'student',status:'online',chat:'chatLink'},{name:'Ahmad Salem',email:'Ahmad@gmail.com',role:'student',status:'online',chat:'chatLink'},{name:'Ahmad Salem',email:'Ahmad@gmail.com',role:'student',status:'online',chat:'chatLink'},{name:'Ahmad Salem',email:'Ahmad@gmail.com',role:'student',status:'online',chat:'chatLink'}]
  const courseId = params.courseId;
  return (
    <div className="h-full overflow-hidden bg-gray-200">
      <CourseBar courseId={courseId} />
      <div className="flex justify-between h-full bg-gray-200 mt-4">
        <div className=" w-8/12 bg-white h-eighty overflow-y-auto drop-shadow-xl p-4">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            {role=='teacher'&&<AiOutlineUserAdd className="absolute right-2 top-3 cursor-pointer"/>}
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  classList.map((student)=>{
                    return(
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* <Image class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/> */}
                    <div class="pl-3">
                      <div class="text-base font-semibold">{student.name}</div>
                      <div class="font-normal text-gray-500">
                        {student.email}
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-4">{student.role}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                      {student.status}
                    </div>
                  </td>
                  <td class="px-6 py-4 w-20">
                    <a
                      href={student.chat}
                      type="button"
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline p-2 text-center"
                    >
                      <BsFillChatSquareTextFill className="w-20"/>
                    </a>
                  </td>
                </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-3/12 bg-white h-full drop-shadow-xl"></div>
      </div>
    </div>
  );
}

export default Classlist;
