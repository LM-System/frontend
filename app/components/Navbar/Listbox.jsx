import React from "react";
import ThemeButton from "./ThemeButton";
import Logout from "./Logout";
import { useTheme } from "next-themes";

export default function Listbox() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center rounded-lg p-4 absolute -top-[135px] right-[15px] bg-primary shadow-lg gap-4 dark:bg-darkcomp">
      <div className="flex flex-row bg-transparent justify-center items-center gap-4">
        <ThemeButton />
      </div>
      <Logout route={"/login"} />
    </div>
  );
}
