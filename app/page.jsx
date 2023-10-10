import Navbar from "./components/Navbar/Navbar";
import TimeDate from "./components/Home/TimeDate";
import Announcment from "./components/Home/Announcment/Announcment";
export default function Home() {
  return (
    <div className="page">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 shadow-md p-4 gap-2 w-full">
        <Announcment/>
        <TimeDate />
      </div>
    </div>
  );
}
