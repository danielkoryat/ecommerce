import { useState } from "react";
import { Button } from "@material-tailwind/react";



const UserInfoSection = ({ userInfo: { email, username } }) => {
    const [userInfo, setUserInfo] = useState({ email, username });

    const handleUserInfoChange = (event) => {
      const { name, value } = event.target;
      setUserInfo({ ...userInfo, [name]: value });
    }
    
    const submitUserInfo = () => {
      // TODO implement user info submission
      console.log(userInfo);
    }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
      <div className="flex flex-col">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleUserInfoChange}
          className="mb-4 p-2 border rounded"
        />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleUserInfoChange}
          className="mb-4 p-2 border rounded"
        />
        <Button
          onClick={submitUserInfo}
        >
          Update Info
        </Button>
      </div>
    </div>
  );
};

export default UserInfoSection;
