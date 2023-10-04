// 'use client'
import Link from "next/link";
import icons from "@/public/icons"
import Image from "next/image";

export default function AboutCard({ name, major, link, image }) {
  const GithubIcon = icons['github']
  const LinkedinIcon = icons['linkedin']
  return (
    <div className='flex flex-col sm:flex-row gap-6 p-6 shadow-md bg-gray-50 dark:bg-darkcomp rounded-lg '>
        <Image
          src={image}
          alt={name}
          className="rounded-lg w-full sm:w-[200px]"
          width={200}
          height={200}
        />
      <div className='flex flex-col gap-2 justify-between w-full flex-grow-1'>
        <div>
          <h3 className='uppercase font-bold'>{name}</h3>
          <p>{major}</p>
        </div>
        <div className='flex flex-row justify-end gap-1'>
          <Link href={link.github} className="hover:text-secondary transition duration-500">
            <GithubIcon />
          </Link>
          <Link href={link.linkedin} className="hover:text-secondary transition duration-500">
            <LinkedinIcon />
          </Link>
        </div>
      </div>

    </div>
  );
}
