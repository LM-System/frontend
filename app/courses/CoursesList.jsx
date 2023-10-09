import React from 'react'
import Card from '../components/Course/Card'
import { axiosHandler } from '@/public/Utilities/axiosHandler';

const mockCourses = [
  { id: 8, title: 'javascript', instructor: 'John Doe', semester: 'winter 2022/2023' },
  { id: 2, title: 'html', instructor: 'John Doe', semester: 'winter 2022/2023' },
  { id: 3, title: 'react', instructor: 'John Doe', semester: 'winter 2022/2023' },
  { id: 4, title: 'css', instructor: 'John Doe', semester: 'winter 2022/2023' }
]

export default function CoursesList({id}) {
  // console.log(id);
  let courseList=[
    {
        "id": 4,
        "name": "python 1",
        "section_number": 2,
        "year": 2009,
        "semester": "Fall",
        "room_no": "room 2",
        "status": "Offline",
        "building": null,
        "days": null,
        "capacity": null,
        "start_time": null,
        "end_time": null,
        "createdAt": "2023-10-08T11:48:14.612Z",
        "updatedAt": "2023-10-08T11:48:14.612Z",
        "instructorId": 1,
        "courseId": 4,
        "student_section": {
            "grade": null,
            "createdAt": "2023-10-08T16:00:55.090Z",
            "updatedAt": "2023-10-08T16:00:55.090Z",
            "studentId": 1,
            "sectionId": 4
        },
        "instructor": {
            "id": 1,
            "fullname": "helmi",
            "gender": "male",
            "birth_date": "1970-01-01T00:00:36.806Z",
            "phone_number": "789999999",
            "image": null,
            "bio": null,
            "address": null,
            "createdAt": "2023-10-08T11:33:01.952Z",
            "updatedAt": "2023-10-08T11:33:01.952Z",
            "userEmail": "h@h.com",
            "departmentId": null
        }
    }
]
  axiosHandler('GET',`/studentsections/${id}`).then(res=>courseList=res.data[0].sections)

  
  return (
    <>
      <h2 className='font-bold text-2xl mb-4'>Your Courses</h2>
      <div className='grid grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto gap-4'>
        {courseList.map((e) => (
          <Card
            key={e.id}
            id={e.id}
            title={e.name}
            instructor={e.instructor.fullname}
            semester={e.semester}
          />
        ))}
      </div>
    </>
  )
}
