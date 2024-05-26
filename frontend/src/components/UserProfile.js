import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaDollarSign } from "react-icons/fa";
import AvailabilitySchedule from "./AvailabilitySchedule";
import UserSkill from "./UserSkill";

function UserProfile() {
  const { userEmail } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/get-user-by-email/${userEmail}`
        );
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUser();
  }, [userEmail]);
  const handleContactClick = () => {
    window.open(`https://wa.me/${user.PHONE_NUMBER}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <style jsx>{`
          .spinner {
            width: 44.8px;
            height: 44.8px;
            animation: spinner-y0fdc1 2s infinite ease;
            transform-style: preserve-3d;
          }

          .spinner > div {
            background-color: rgba(59, 130, 246, 0.2);
            height: 100%;
            position: absolute;
            width: 100%;
            border: 2.2px solid #3b82f6;
          }

          .spinner div:nth-of-type(1) {
            transform: translateZ(-22.4px) rotateY(180deg);
          }

          .spinner div:nth-of-type(2) {
            transform: rotateY(-270deg) translateX(50%);
            transform-origin: top right;
          }

          .spinner div:nth-of-type(3) {
            transform: rotateY(270deg) translateX(-50%);
            transform-origin: center left;
          }

          .spinner div:nth-of-type(4) {
            transform: rotateX(90deg) translateY(-50%);
            transform-origin: top center;
          }

          .spinner div:nth-of-type(5) {
            transform: rotateX(-90deg) translateY(50%);
            transform-origin: bottom center;
          }

          .spinner div:nth-of-type(6) {
            transform: translateZ(22.4px);
          }

          @keyframes spinner-y0fdc1 {
            0% {
              transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
            }
            50% {
              transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
            }
            100% {
              transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden cursor-pointer">
              <img
                src={
                  user.PROFILE_PICTURE
                    ? `http://localhost:5000/${user.PROFILE_PICTURE.replace(
                        /\\/g,
                        "/"
                      )}`
                    : user.GENDER === "Male"
                    ? "https://avatar.iran.liara.run/public/boy"
                    : "https://avatar.iran.liara.run/public/girl"
                }
                alt="User Avatar"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold md:text-3xl text-white">
                <UserIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
                {user.FULL_NAME}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                <BookIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
                {user.UNIVERSITY_NAME}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                <MajorIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
                {user.MAJOR}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                <LocationPinIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
                {user.LOCATION}
              </p>
              {user.HOURLY_RATE && (
                <p className="text-gray-500 dark:text-gray-400">
                  <FaDollarSign className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
                  {`${parseFloat(user.HOURLY_RATE).toFixed(2)}`} / Hr
                </p>
              )}
              <p className="text-gray-500 dark:text-gray-400">{user.BIO}</p>
            </div>
            <div className="flex flex-row justify-end gap-2">
              <button
                onClick={handleContactClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">
              <ActivityIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
              Skills
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {user &&
                user.SKILLS &&
                user.SKILLS.map((skill) => (
                  <UserSkill
                    key={skill.id}
                    skillName={skill.skill_name}
                    proficiency={skill.proficiency}
                  />
                ))}
            </div>
            <h2 className="text-xl font-bold text-white">
              <CalendarIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
              Availability
            </h2>
            <div>
              {user.AVAILABILITY && (
                <AvailabilitySchedule availability={user.AVAILABILITY} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
// SVG icons remain unchanged, included in your component.

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}
function LocationPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function MajorIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20" />
      <path d="M18 6l-6-4-6 4" />
      <path d="M6 10l6 4 6-4" />
      <path d="M6 14l6 4 6-4" />
    </svg>
  );
}

function UniversityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="1" />
      <path d="M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2" />
      <path d="M6 17v.01" />
      <path d="M6 13v.01" />
      <path d="M18 17v.01" />
      <path d="M18 13v.01" />
      <path d="M14 22v-5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
