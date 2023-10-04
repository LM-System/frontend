'use client'
import React from "react";
import Link from "next/link";
import {Tabs, Tab, Chip} from "@nextui-org/react";
import icons from '@/public/icons'
import { useParams } from "next/navigation";

const DescriptionIcon = icons['description'];
const ClassListIcon = icons['classlist'];
const AnnouncementsIcon = icons['announcements'];
const AssignmentsIcon = icons['assignments'];

export default function CourseTabs() {
  const {id} = useParams()
  return (
    <div className="flex w-full flex-col">
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
        }}
      >
        <Tab
          key="description"
          title={
            <Link 
            href={`/courses/${id}/description`}
            className="flex items-center space-x-2">
              <DescriptionIcon/>
              <span>Description</span>
              <Chip size="sm" variant="faded">9</Chip>
            </Link>
          }
        />
        <Tab
          key="assignments"
          title={
            <Link 
            href={`/courses/${id}/assignments`}
            className="flex items-center space-x-2">
              <AssignmentsIcon/>
              <span>Assignments</span>
              <Chip size="sm" variant="faded">3</Chip>
            </Link>
          }
        />
        <Tab
          key="classlist"
          title={
            <Link 
            href={`/courses/${id}/classlist`}
            className="flex items-center space-x-2">
              <ClassListIcon/>
              <span>ClassList</span>
              <Chip size="sm" variant="faded">3</Chip>
            </Link>
          }
        />
        <Tab
          key="announcements"
          title={
            <Link 
            href={`/courses/${id}/announcements`}
            className="flex items-center space-x-2">
              <AnnouncementsIcon/>
              <span>Announcements</span>
              <Chip size="sm" variant="faded">1</Chip>
            </Link>
          }
        />
      </Tabs>
    </div>  
  );
}
