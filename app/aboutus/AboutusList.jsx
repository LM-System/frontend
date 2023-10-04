import AboutCard from '@/app/components/Aboutus/Card'
import Image from 'next/image'
const information = [
  {
    id: 1,
    name: 'Helmi Qatqat',
    major: 'Fullstack Web Developer',
    link: {
      github: 'https://github.com/helmiqatqat',
      linkedin: 'https://www.linkedin.com/in/helmiqatqat/'
    },
    image: '/images/personal/Helmi.png'
  },
  {
    id: 2,
    name: 'Malek Hasan',
    major: 'Fullstack Web Developer',
    link: {
      github: 'https://github.com/MalekHasan',
      linkedin: 'https://www.linkedin.com/in/malek-al-sheekh-hasan-1a451a25a'
    },
    image: '/images/personal/malek.jpg'
  },
  {
    id: 3,
    name: 'Mohammad AbuEssa',
    major: 'Fullstack Web Developer',
    link: {
      github: 'https://github.com/MohammedAbuEssa',
      linkedin: 'https://www.linkedin.com/in/mohammad-a-8903911a0/'
    },
    image: '/images/personal/AbuEssa.jpeg'
  },
  {
    id: 4,
    name: 'Mohammad Keath',
    major: 'Fullstack Web Developer',
    link: {
      github: 'https://github.com/Mohammad-Keath',
      linkedin: 'https://www.linkedin.com/in/mhd-keath-zaytowna-407519258'
    },
    image: '/images/personal/ghyath.jpeg'
  }
]
export default function AboutusList() {
  return (
    <>
      <div className='font-bold text-2xl mb-4'>
        <h2>Meet Our Team</h2>
      </div>
      <div className='grid grid-cols grid-cols-1 lg:grid-cols-2 grid-rows-auto gap-4'>
        {information.map(e => (
          <AboutCard
          key={e.id}
          id={e.id}
          name={e.name}
          link={e.link}
          major={e.major}
          image={e.image}
          />
          ))}
      </div>
    </>
  )
}