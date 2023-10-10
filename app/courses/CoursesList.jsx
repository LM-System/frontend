import React,{useState,useEffect} from 'react'
import Card from '../components/Course/Card'
import { axiosHandler } from '@/public/Utilities/axiosHandler';

const mockCourses = [
  { id: 8, title: 'javascript', instructor: 'John Doe', semester: 'winter 2022/2023' },
  { id: 2, title: 'html', instructor: 'John Doe', semester: 'winter 2022/2023' },
  { id: 3, title: 'react', instructor: 'John Doe', semester: 'winter 2022/2023' },
  { id: 4, title: 'css', instructor: 'John Doe', semester: 'winter 2022/2023' }
]

export default function CoursesList({id,role,setCourseId}) {
  const [courseList,setCourseList]=useState([])
  const fetchData = async ()=>{
    try{
      const {data}=await axiosHandler('GET',`/${role}sections/${id}`);

      console.log(data);
        if(data){
          // console.log(data.sections);
          setCourseList(data.sections)
        }
    }catch(e){console.log(e.message)}
}
useEffect(()=>{
    fetchData()
},[])
  return (
    <>
      <h2 className='font-bold text-2xl mb-4'>Your Courses</h2>
      <div className='grid grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto gap-4'>
        {courseList.map((e) => (
          <Card
          setCourseId={setCourseId}
            courseId={e.courseId}
            key={e.id}
            id={e.id}
            title={e.name}
            instructor={e.instructor?.fullname}
            semester={e.semester}
          />
        ))}
      </div>
    </>
  )
}
