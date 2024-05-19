import React, { useState, useEffect } from "react";
import axios from "axios";
import UserSkill from "./UserSkill";
import EditProfile from "./editProfile";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // To toggle edit form

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const sessionResponse = await axios.get(
          "http://localhost:5000/session"
        );
        if (sessionResponse.data.isAuthenticated) {
          const userId = sessionResponse.data.user.id;
          const userDetails = await axios.get(
            `http://localhost:5000/user/${userId}`
          );
          setUser(userDetails.data);
          const skillsResponse = await axios.get(
            `http://localhost:5000/user_skills/${userId}`
          );
          setSkills(skillsResponse.data.skills || []); // Ensure skills is always an array
        } else {
          alert("Not authenticated");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          style={{
            border: "4px solid rgba(255, 255, 255, 0.3)", // Light grey border
            borderTop: "4px solid #3498db", // Blue border
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 2s linear infinite",
          }}
        />
      </div>
    );
  }

  if (!user) {
    return <div>User not found or not logged in</div>;
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden">
              <img
                src={
                  user.PROFILE_PICTURE ||
                  "https://avatar.iran.liara.run/public/boy"
                }
                alt="User Avatar"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold md:text-3xl text-white">
                <UserIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />{" "}
                {user.FULL_NAME}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                <BookIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />{" "}
                {user.UNIVERSITY_NAME}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                <LocationPinIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />{" "}
                {user.LOCATION}
              </p>
              <p className="text-gray-500 dark:text-gray-400">{user.BIO}</p>{" "}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Contact
              </button>
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"
              >
                Edit Profile
              </button>
            </div>
          </div>
          {editMode && <EditProfile user={user} closeEdit={handleEditToggle} />}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                <ActivityIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />{" "}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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
