import { useState } from "react";
import { Button } from "@material-tailwind/react";

const UserInfoSection = ({ userInfo: { email, username } }) => {
  const [userInfo, setUserInfo] = useState({ email, username });


  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
      <div className="flex flex-col">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          className="mb-4 p-2 border rounded"
          readOnly
        />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          className="mb-4 p-2 border rounded"
          readOnly
        />
      </div>
    </div>
  );
};

export default UserInfoSection;
