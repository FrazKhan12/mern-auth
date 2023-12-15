import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setAuthUser } from "../redux/userSlice";
import { postHTTPrequest } from "../utils/API";

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getUserInfo = async () => {
    try {
      const response = await postHTTPrequest(
        "/user/get-user-info-by-id",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.success) {
        toast.success(response.message);
        dispatch(setAuthUser(response.data));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    if (!user) {
      getUserInfo();
    }
  }, [user]);
  if (localStorage.getItem("token")) {
    if (user && user.role === "admin") {
      return props.children;
    } else {
      return props.children;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
