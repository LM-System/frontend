import React from 'react'
import Card from '../components/Course/Card'

const mockCourses = [
  { id: 1, title: 'javascript', instructor: 'John Doe', semester: 'winter 2022/2023' },
  { id: 2, title: 'html', instructor: 'John Doe', semester: 'winter 2022/2023' },
  { id: 3, title: 'react', instructor: 'John Doe', semester: 'winter 2022/2023' },
  { id: 4, title: 'css', instructor: 'John Doe', semester: 'winter 2022/2023' }
]

export default function CoursesList() {
  return (
    <>
      <h2 className='font-bold text-2xl mb-4'>Your Courses</h2>
      <div className='grid grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto gap-4'>
        {mockCourses.map(e => (
          <Card
            key={e.id}
            id={e.id}
            title={e.title}
            instructor={e.instructor}
            semester={e.semester}
          />
        ))}
      </div>
    </>
  )
}
