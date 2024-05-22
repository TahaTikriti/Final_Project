import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/tutorium-favicon-color.png";
import { Navbar, Button } from "flowbite-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/session", { withCredentials: true })
      .then((response) => {
        setIsLoggedIn(response.data.isAuthenticated);
      })
      .catch((error) => {
        console.error("Error checking session", error);
        setIsLoggedIn(false);
      });
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Navbar fluid className="lg:px-24 lg:py-2 dark:bg-gray-800">
      <Navbar.Brand
        className="ml-4 lg:ml-8"
        href="#"
        onClick={() => handleNavigation("/")}
      >
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Tutorium Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Tutorium
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 mr-4 lg:mr-8">
        {isLoggedIn ? (
          <button
            className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
            onClick={() => {
              axios
                .get("http://localhost:5000/logout", {
                  withCredentials: true,
                })
                .then(() => {
                  setIsLoggedIn(false);
                  handleNavigation("/login");
                });
            }}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
              />
            </svg>
            <span>Logout</span>
          </button>
        ) : (
          <button
            className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
            onClick={() => handleNavigation("/login")}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
              />
            </svg>
            Login
          </button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="" onClick={() => handleNavigation("/")}>
          Home
        </Navbar.Link>
        <Navbar.Link href="" onClick={() => handleNavigation("/profile")}>
          Profile
        </Navbar.Link>
        <Navbar.Link href="" onClick={() => handleNavigation("/tutors")}>
          Browse Tutors
        </Navbar.Link>
        <Navbar.Link href="" onClick={() => handleNavigation("/topics")}>
          Topics
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
