import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { postHTTPrequest } from "../../utils/API";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await postHTTPrequest("/user/login", values);
      dispatch(hideLoading());
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center justify-between gap-[100px]">
        <div>
          <dotlottie-player
            src="https://lottie.host/c267c477-4047-4e31-965e-1eb05fcf3593/7UFnaU9TAo.json"
            background="transparent"
            speed="1"
            style={{ width: "400px", height: "400px" }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className=" mt-[50px] rounded ">
          <h1 className="font-medium text-3xl">Login</h1>
          <p className="text-gray-600 mt-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos dolorem vel cupiditate laudantium dicta.
          </p>

          <Form onFinish={onFinish} layout="vertical">
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <Form.Item
                  label="Email"
                  name="email"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
            </div>

            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <Form.Item
                  label=" Password"
                  name="password"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input
                    type="password"
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  />
                </Form.Item>
              </div>
            </div>

            <div className="space-x-4 mt-8">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="px-8 bg-gray-800 h-[40px] hover:bg-gray-800"
                >
                  Login
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div>
            <p className="text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link className="hover:underline text-primary" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
