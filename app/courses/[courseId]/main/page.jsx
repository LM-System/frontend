import React from "react";
import CourseBar from "@/app/components/courses/CourseBar";
function Main({ params }) {
  const announcements = [{title:'announcement1',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate'},{title:'announcement1',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate'},{title:'announcement1',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate'},{title:'announcement1',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam excepturi Ipsa corporis incidunt nemo placeat qui delectus,laudantium dolorum harum rem Sint aspernatur esse facere doloremque deserunt natus distinctio cupiditate'}]
  const courseId = params.courseId;
  return (
    <div className="h-full overflow-hidden bg-gray-200">
      <CourseBar courseId={courseId} />
      <div className="flex justify-between h-full bg-gray-200 mt-4">
        <div className=" w-8/12 h-full bg-gray-200 ">
          <div className="bg-white drop-shadow-xl p-5">
          
            <h2 className="text-xl mb-2">Description</h2>
            <hr />
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
              excepturi! Ipsa corporis incidunt nemo placeat qui delectus,
              laudantium dolorum harum rem! Sint aspernatur esse facere
              doloremque deserunt natus distinctio cupiditate.
            </p>
          </div>
          <div className=" mt-8 bg-white drop-shadow-xl">
            <h2 id="announcements" className=" px-5 pt-5 text-xl mb-4">
              Announcements
            </h2>
            <hr className="mx-5 my-3"/>
            <div className="p-5 overflow-y-auto h-half">
            {announcements.map((item)=>{
            return <div class="w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 opacity-80 dark:border-gray-700 hover:opacity-100  transition-all mb-5 ">
              <h5 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <p class="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                {item.body}
              </p>
            </div>
            })}
            </div>
          </div>
        </div>
        <div className="w-3/12 bg-white h-full drop-shadow-xl">

        </div>
      </div>
    </div>
  );
}

export default Main;
