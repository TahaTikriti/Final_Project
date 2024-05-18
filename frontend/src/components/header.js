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
    <Navbar fluid className="lg:px-20 lg:pt-4 dark:bg-gray-800">
      <Navbar.Brand className="lg:ml-14" href="" onClick={() => handleNavigation("/")}>
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Tutorium Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Tutorium
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 lg:mr-14">
        {isLoggedIn ? (
          <Button 
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
            Logout
          </Button>
        ) : (
          <Button 
          className="enabled:bg-background  "
           onClick={() => handleNavigation("/login")}>Login</Button>
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
