"use client";
import React, { useState } from "react";
import Option from "./Option";
import Listbox from "./Listbox";
import icons from "@/public/icons";
import { ThemeProvider } from "next-themes";
import ThemeButton from "./ThemeButton";
import Logout from "./Logout";

export default function Navbar() {
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
      title: "profile",
      route: `/profile/`,
      type: "navlink",
    },
    {
      title: "aboutus",
      route: `/aboutus`,
      type: "navlink",
    }
  ];

  function toggleDropDown() {
    setShowDropdown((oldState) => !oldState);
  }
  const OptionsIcon = icons["options"];
  return (
    <ThemeProvider attribute="class">
      <nav className="nav">
        <div className="navlist">
          {NavLinks.map((e, i) => (
            <Option id={i} key={i} {...e} type="navlink" />
          ))}
        </div>
        <div className="md:flex hidden flex-col items-center gap-4 justify-center">
          <ThemeButton />
          <Logout route={"/login"} />
        </div>
        <div className="absolute right-2 md:hidden bg-transparent">
          <span className="flex justify-center items-center bg-transparent hover:bg-gray-800 dark:hover:bg-darkbg hover:cursor-pointer rounded-full p-2">
            <OptionsIcon className="text-white" onClick={toggleDropDown} />
            {showDropdown && <Listbox className="text-white" />}
          </span>
        </div>
      </nav>
    </ThemeProvider>
  );
}
