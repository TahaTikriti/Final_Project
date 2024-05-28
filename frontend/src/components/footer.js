"use client";


import logo from "../images/tutorium-favicon-color.png";
import { Footer } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Footer_component = () => {
  const handleNavigation = (path) => {
    navigate(path);
  };
    const navigate = useNavigate();
    

  return (
    <Footer container className="rounded-none">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="#"
            onClick={() => handleNavigation("/")}
            src={logo}
            alt="Tutorium Logo"
            name="Tutorium"
          />
          <Footer.LinkGroup>
            <Footer.Link href="">About</Footer.Link>
            <Footer.Link href="/team">Our Team</Footer.Link>
            <Footer.Link href="">Licensing</Footer.Link>
            <Footer.Link href="">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="" by="Tutorium™" year={2024} />
      </div>
    </Footer>
  );
};

export default Footer_component;
