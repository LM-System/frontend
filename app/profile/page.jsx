import UserProfile from "@/app/components/Profile/Info";
import Navbar from "@/app/components/Navbar/Navbar";
export default function UserProfilePage() {
  return (
    <div className="page">
        
      <Navbar />
      <div className="main">
        <UserProfile />
      </div>
    </div>
  );
}
