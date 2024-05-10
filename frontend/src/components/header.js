import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/tutorium-favicon-color.png";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/session") // Adjust the endpoint as necessary
      .then((response) => {
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error checking session", error);
        setIsLoggedIn(false);
      });
  }, []);

  

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onClick={() => navigate("/")} // Navigate to home when the logo or company name is clicked
          >
            <img src={logo} className="h-10" alt="Tutorium Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Tutorium
            </span>
          </a>
          <div className="flex md:order-2">
            <button
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer"
              onClick={() => navigate("/login")} // Navigate to login page when this button is clicked
            >
              Login
            </button>
          </div>
          <div className="hidden md:flex items-center justify-between w-full md:w-auto md:order-1">
            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:p-0 md:mt-0 md:space-x-8 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* Navigation links */}
              {/* Each link should use navigate function or Link component to redirect */}
              <li>
                <button
                  className="block px-3 py-2 rounded text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500"
                  onClick={() => navigate("/")} // Use navigate to handle routing for SPA-like behavior
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className="block px-3 py-2 rounded text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="block px-3 py-2 rounded text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500"
                  onClick={() => navigate("/tutors")}
                >
                  Browse Tutors
                </button>
              </li>
              <li>
                <button
                  className="block px-3 py-2 rounded text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500"
                  onClick={() => navigate("/topics")}
                >
                  Topics
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
