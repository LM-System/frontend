import React from "react";
import {AiOutlineClose} from 'react-icons/ai'

function EditContentCard({setIsEditing}) {
  return (
    <div>
      <div className="absolute w-full h-full bg-black z-10 opacity-40"></div>
      <div className="absolute left-0 right-0 bottom-0 top-0 m-auto w-4/12 h-3/5 bg-white z-10 ">
        <AiOutlineClose
          className=" float-right text-xl m-2 cursor-pointer"
          onClick={() => {
            setIsEditing(false);
          }}
        />

        <form className="m-10">
          <div class="mb-6">
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              title
            </label>
            <input
              type="text"
              id="title"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="Date"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date on timeline
            </label>
            <input
              type="Date"
              id="Date"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
          <div class="mb-6">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="multiple_files"
            >
              Upload multiple files
            </label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              type="file"
              multiple
            />
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to content
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditContentCard;
