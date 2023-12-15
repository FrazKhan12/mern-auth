import React from "react";
import { Tabs } from "antd";
import UpdateProfile from "./updateProfile";
import ForgetPassword from "./forgetPassword";

const UserDashboard = () => {
  const items = [
    {
      key: "1",
      label: "Profile",
      children: <UpdateProfile />,
    },
    {
      key: "2",
      label: "Forget Password",
      children: <ForgetPassword />,
    },
  ];
  return (
    <div className="container mx-auto mt-10">
      <Tabs type="card" items={items} />
    </div>
  );
};

export default UserDashboard;
