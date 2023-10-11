"use client"
import Navbar from "./components/Navbar/Navbar";
import TimeDate from "./components/Home/TimeDate";
import Announcment from "./components/Home/Announcment/Announcment";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

export default function Home() {
  const token = Cookies.get("user_token");
  const router = useRouter();
  if(!token) {
    router.push('/login')
    return null
  }
  
  return (
    <div className="page">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 shadow-md p-4 gap-2 w-full">
        <Announcment />
        <TimeDate />
      </div>
    </div>
  );
}
