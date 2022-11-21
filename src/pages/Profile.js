import React from "react";
import { useAuth } from "../auth/auth-provider";

const Profile = () => {
  const { user } = useAuth();
  const username = user.displayName
  console.log(username)

  return (
    <div>
      <h2>{username}'s profile</h2>
    </div>
  );
};

export default Profile;
