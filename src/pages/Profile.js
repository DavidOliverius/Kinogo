import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/auth-provider";

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const username = user.displayName;
  console.log(username);
  console.log(id);

  return (
    <div>
      <h2>{username}'s profile</h2>
      <p>{id}</p>
    </div>
  );
};

export default Profile;
