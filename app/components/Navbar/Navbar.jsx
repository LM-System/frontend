"use client";
import React, { useState,useEffect } from "react";
import Cookies from "js-cookie";
import Option from "./Option";
import Listbox from "./Listbox";
import icons from "@/public/icons";
import { ThemeProvider } from "next-themes";
import ThemeButton from "./ThemeButton";
import Logout from "./Logout";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const router = useRouter();
  const { role,departmentId } = JSON?.parse(Cookies?.get("user_info"))||'';
  
  const userDataCookie = Cookies.get("user_info");
  const [userData, setUserData] = useState(
    userDataCookie ? JSON.parse(userDataCookie) : null
  );
  const [NavLinks,setNavLinks]=useState([])
  if (!userData) {
    router.push("/login");
  }
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(role)

  useEffect(()=>{

    if(role == 'student'|| role == 'instructor'){
      setNavLinks([
        {
          title: "home",
          route: "/",
          type: "navlink",
        },
        {
          title: "courses",
          route: "/courses",
          type: "navlink",
        },
        {
          title: "chat",
          route: "/chat",
          type: "navlink",
        },
        {
          title: "aboutus",
          route: `/aboutus`,
          type: "navlink",
        },
      ]);
    } else if(role=='admin'){
      setNavLinks([
        {
          title: "home",
          route: "/",
          type: "navlink",
        },
        {
          title: "departs",
          route: "/departments",
          type: "navlink",
        },
        {
          title: "heads",
          route: "/heads",
          type: "navlink",
        },
        {
          title: "aboutus",
          route: `/aboutus`,
          type: "navlink",
        },
      ])
    } else if(role=='instructorDepartmentHead'){
      setNavLinks([
        {
          title: "home",
          route: "/",
          type: "navlink",
        },
        {
          title: "courses",
          route: `/departments/${departmentId}/courses`,
          type: "navlink",
        },
        {
          title: "instructors",
          route: `/departments/${departmentId}/instructors`,
          type: "navlink",
        },
        {
          title: "students",
          route: `/departments/${departmentId}/students`,
          type: "navlink",
        },
        {
          title: "aboutus",
          route: `/aboutus`,
          type: "navlink",
        },
      ])
    } else if(role=='superAdmin'){
      setNavLinks([
        {
          title: "home",
          route: "/",
          type: "navlink",
        },
        {
          title: "institutions",
          route: `/institutions`,
          type: "navlink",
        },
        {
          title: "admins",
          route: `/admins`,
          type: "navlink",
        },
        {
          title: "aboutus",
          route: `/aboutus`,
          type: "navlink",
        },
      ])
    }
  },[])

  function toggleDropDown() {
    setShowDropdown((oldState) => !oldState);
  }
  const OptionsIcon = icons["options"];
  return (
    <ThemeProvider attribute="class">
      <nav className="nav">
        <div className="flex flex-col gap-4">
          <div className="hidden md:flex flex-col items-center">
            <Link href={"/profile"}>
              <span className="flex justify-center items-center w-12 h-12 transition duration-300 cursor-pointer hover:bg-sky-700 bg-secondary text-white rounded-full shadow-lg">
                {userData.fullname.slice(0, 1).toUpperCase()}
              </span>
            </Link>
          </div>
          <div className="navlist">
            {NavLinks.map((e, i) => (
              <Option id={i} key={i} {...e} type="navlink" />
            ))}
          </div>
        </div>
        <div className="md:flex hidden flex-col items-center gap-4 justify-center">
          <ThemeButton />
          <Logout route={"/login"} />
        </div>
        <div className="absolute right-6 md:hidden bg-transparent">
          <span className="flex gap-1 items-center">
            <span className="flex justify-center items-center w-10 h-10 transition duration-300 cursor-pointer hover:bg-sky-700 bg-secondary text-white rounded-full shadow-lg">
              {userData.fullname.slice(0, 1).toUpperCase()}
            </span>
            <span className="flex gap-2 items-center bg-transparent hover:bg-gray-800 dark:hover:bg-darkbg hover:cursor-pointer rounded-full p-1">
              <OptionsIcon className="text-white" onClick={toggleDropDown} />
              {showDropdown && <Listbox className="text-white" />}
            </span>
          </span>
        </div>
      </nav>
    </ThemeProvider>
  );
}
