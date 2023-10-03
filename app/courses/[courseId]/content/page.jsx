"use client";
import React from "react";
import CourseBar from "@/app/components/courses/CourseBar";

function Assignment({ params }) {
  const courseId = params.courseId;
  const content = [{title:'Flowbite Application UI v2.0.0',date:'January 13th, 2022',description:'Get access to over 20+ pages including a dashboard layout,charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',docLink:''},{title:'Flowbite Application UI v2.0.0',date:'January 13th, 2022',description:'Get access to over 20+ pages including a dashboard layout,charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',docLink:''},{title:'Flowbite Application UI v2.0.0',date:'January 13th, 2022',description:'Get access to over 20+ pages including a dashboard layout,charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',docLink:''},{title:'Flowbite Application UI v2.0.0',date:'January 13th, 2022',description:'Get access to over 20+ pages including a dashboard layout,charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',docLink:''}]

  return (
    <div className="h-full overflow-hidden bg-gray-200">
      <CourseBar courseId={courseId} />
      <div className="flex justify-between h-full bg-gray-200 mt-4">
        <div className=" w-8/12 bg-white h-full drop-shadow-xl p-4 h-eighty overflow-y-auto">
          <ol class="relative border-l border-gray-200 dark:border-gray-700">
            {content.map((chapter)=>{
              return(
                <li class="mb-10 ml-6">
                  <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg
                      class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </span>
                  <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {chapter.title}{" "}
                    <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                      Latest
                    </span>
                  </h3>
                  <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {chapter.date}
                  </time>
                  <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {chapter.description}
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    <svg
                      class="w-3.5 h-3.5 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                      <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>{" "}
                    Download ZIP
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
        <div className="w-3/12 bg-white h-full drop-shadow-xl"></div>
      </div>
    </div>
  );
}

export default Assignment;
