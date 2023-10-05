import UserProfile from "@/app/components/Profile/Info";
import Navbar from "@/app/components/Navbar/Navbar";
export default function UserProfilePage({ params }) {
  const userId = params.id;
  console.log(userId);
  if (!userId) {
    return (
      <div className="page">
        <Navbar />
        <div className="main">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <div className="main">
        <UserProfile userId={userId} />
      </div>
    </div>
  );
}
