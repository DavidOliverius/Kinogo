import React from "react";
import { useAuth } from "../auth/auth-provider";
import { useParams } from "react-router-dom";

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
