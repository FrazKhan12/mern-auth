import React from "react";
import { Tabs } from "antd";
import UpdateProfile from "../User/updateProfile";
import UsersData from "./usersData";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const items = [
    {
      key: "1",
      label: "Profile",
      children: <UpdateProfile />,
    },
    {
      key: "2",
      label: "All Users",
      children: <UsersData />,
    },
  ];
  return (
    <div className="container mx-auto mt-10">
      <Tabs type="card" items={items} />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
