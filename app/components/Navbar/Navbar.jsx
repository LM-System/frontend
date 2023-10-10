"use client";
import React, { useState } from "react";
import Cookies from "js-cookie"
import Option from "./Option";
import Listbox from "./Listbox";
import icons from "@/public/icons";
import { ThemeProvider } from "next-themes";
import ThemeButton from "./ThemeButton";
import Logout from "./Logout";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

export default function Navbar() {
  const { fullname } = JSON.parse(Cookies.get("user_info"))
  const [showDropdown, setShowDropdown] = useState(false);

  const NavLinks = [
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
      title: "aboutus",
      route: `/aboutus`,
      type: "navlink",
    },
  ];

  function toggleDropDown() {
    setShowDropdown((oldState) => !oldState);
  }
  const OptionsIcon = icons["options"];
  return (
    <ThemeProvider attribute="class">
      <nav className="nav">
        <div className="flex flex-col gap-4">
          <div className="hidden md:flex flex-col items-center">
            <Link href={'/profile'}>
              <span className="flex justify-center items-center w-12 h-12 transition duration-300 cursor-pointer hover:bg-sky-700 bg-secondary text-white rounded-full shadow-lg">
                {fullname.slice(0, 1).toUpperCase()}
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
                {fullname.slice(0, 1).toUpperCase()}
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
