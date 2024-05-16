"use client";

import { Footer as FlowbiteFooter } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
  BsEnvelope,
  BsPhone,
  BsMap,
} from "react-icons/bs";

const Footer = () => {
  return (
    <FlowbiteFooter bgDark>
      <div className="w-full rounded-none">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-3">
          <div>
            <FlowbiteFooter.Title title="Company" />
            <FlowbiteFooter.LinkGroup col>
              <FlowbiteFooter.Link href="#">About</FlowbiteFooter.Link>
              <FlowbiteFooter.Link href="#">Careers</FlowbiteFooter.Link>
              <FlowbiteFooter.Link href="#">Brand Center</FlowbiteFooter.Link>
              <FlowbiteFooter.Link href="#">Blog</FlowbiteFooter.Link>
            </FlowbiteFooter.LinkGroup>
          </div>
          <div>
            <FlowbiteFooter.Title title="About Us" />
            <FlowbiteFooter.LinkGroup col>
              <FlowbiteFooter.Link href="#">Our Story</FlowbiteFooter.Link>
              <FlowbiteFooter.Link href="#">
                Mission & Vision
              </FlowbiteFooter.Link>
              <FlowbiteFooter.Link href="#">Team</FlowbiteFooter.Link>
            </FlowbiteFooter.LinkGroup>
          </div>
          <div>
            <FlowbiteFooter.Title title="Contact Us" />
            <FlowbiteFooter.LinkGroup col>
              <FlowbiteFooter.Link href="#">
                <BsPhone className="inline mr-2" />
                Call us: 123-456-7890
              </FlowbiteFooter.Link>
              <FlowbiteFooter.Link href="#">
                <BsEnvelope className="inline mr-2" />
                Mail us: info@example.com
              </FlowbiteFooter.Link>
              <FlowbiteFooter.Link href="#">
                <BsMap className="inline mr-2" />
                Address: 1234 Example St, City, Country
              </FlowbiteFooter.Link>
            </FlowbiteFooter.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <FlowbiteFooter.Copyright href="#" by="Flowbite™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FlowbiteFooter.Icon href="#" icon={BsFacebook} />
            <FlowbiteFooter.Icon href="#" icon={BsInstagram} />
            <FlowbiteFooter.Icon href="#" icon={BsTwitter} />
            <FlowbiteFooter.Icon href="#" icon={BsGithub} />
            <FlowbiteFooter.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  );
};

export default Footer;
