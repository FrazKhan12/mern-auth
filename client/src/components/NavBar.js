import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { links } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
    dispatch(setAuthUser(null));
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Your Logo</div>

        <div className="hidden md:flex space-x-4">
          {links.map((link, index) => {
            return (
              <Link key={index} to={link.link} className="text-white">
                {link.title}
              </Link>
            );
          })}
          {user ? (
            <li className="flex cursor-pointer list-none	 text-[16px] text-white ml-10">
              <Link
                className="flex gap-2"
                to={
                  user.role === "admin" ? "admin-dashboard" : "user-dashboard"
                }
              >
                <CiUser size={24} color="#fff" />
                <span>{user?.userName}</span>
              </Link>
            </li>
          ) : (
            <p></p>
          )}
          {user ? (
            <li className="flex align-center cursor-pointer list-none text-[16px] text-white ml-10">
              <IoIosLogOut onClick={logOut} size={24} color="#fff" />
            </li>
          ) : (
            <li className="cursor-pointer list-none	 text-[16px] text-white ml-10">
              <Link to="/login">
                <IoIosLogIn size={24} color="#fff" />
              </Link>
            </li>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "" : "hidden"
        } bg-gray-800 p-4`}
      >
        {links.map((link, index) => {
          return (
            <Link key={index} to={link.link} className="block text-white py-2">
              {link.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
