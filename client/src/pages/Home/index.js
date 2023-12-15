import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="container mx-auto mt-9">
      <h1 className="text-2xl font-bold">
        Welcome {user && `${user.firstName} ${user.lastName}`}
      </h1>
      <Outlet />
    </div>
  );
};

export default Home;
