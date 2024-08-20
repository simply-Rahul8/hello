import React from "react";
import UserProfile from "../components/UserProfile";

const ProfilePage: React.FC = () => {
  const user = {
    name: "John Doe",
    password: "askdnasfd22wds",
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center text-3xl font-bold mb-6">User Profile</h1>
      <UserProfile name={user.name} password={user.password} />
    </div>
  );
};

export default ProfilePage;
