import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import UserSkill from "./UserSkill";
import AvailabilitySchedule from "./AvailabilitySchedule";
import EditProfile from "./editProfile";
import EditAvailability from "./editAvailability";
import { FaDollarSign, FaClock, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export let userBio = null;
export let userLocation = null;
export let userHourlRate = null;
export let userMajor = null;
// Exportable variable for user's bio

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // To toggle edit form
  const fileInputRef = useRef(null);
  const [editAvailability, setEditAvailability] = useState(false); // To toggle availability form
  const [skillToDelete, setSkillToDelete] = useState("");
  const [showDeleteSkill, setShowDeleteSkill] = useState(false);

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
          userBio = userDetails.data.BIO;
          userLocation = userDetails.data.LOCATION;
          userHourlRate = userDetails.data.HOURLY_RATE;
          userMajor = userDetails.data.MAJOR;
          const skillsResponse = await axios.get(
            `http://localhost:5000/user_skills/${userId}`
          );
          setSkills(skillsResponse.data.skills || []); // Ensure skills is always an array
          console.log("Fetched skills:", skillsResponse.data.skills); // Debugging line
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
  const handleAvailabilityToggle = () => {
    setEditAvailability(!editAvailability);
  };
  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };
  const toggleDeleteSkill = () => {
    setShowDeleteSkill(!showDeleteSkill);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await axios.post(
          "http://localhost:5000/update-profile_picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File upload success:", response.data);
        // Update user state or perform other actions based on the response
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
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

  const handleDeleteSkillInput = async () => {
    if (!skillToDelete.trim()) {
      alert("Please enter a skill name to delete.");
      return;
    }

    try {
      // Retrieve user session to get the user ID
      const sessionResponse = await axios.get("http://localhost:5000/session", {
        withCredentials: true,
      });
      const userId = sessionResponse.data.user.id;

      const response = await axios.post(
        "http://localhost:5000/delete-skill",
        {
          userId,
          skillName: skillToDelete.trim(),
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Skill deleted successfully!");
        setSkills((prevSkills) =>
          prevSkills.filter(
            (skill) => skill.skill_name !== skillToDelete.trim()
          )
        );
        setSkillToDelete(""); // Clear the input field
      } else {
        alert("Skill not found or not deleted");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert(
        `Error occurred while trying to delete the skill: ${
          error.response ? error.response.data : "No response from server"
        }`
      );
    }
  };

  const handleDeleteAndRedirect = async () => {
    await handleDeleteSkillInput(); // Ensure this function is awaited if it returns a Promise
    window.location.href = "/profile";
  };

  if (!user) {
    return <div>User not found or not logged in</div>;
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden cursor-pointer"
              onClick={handleProfilePicClick}
            >
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
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
              />
            </div>
            <div className="">
              <h1 className="text-2xl font-bold md:text-3xl text-white">
                <UserIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
                {user.FULL_NAME}
              </h1>
            </div>
            <div className="text-left space-y-2 mr-6 ">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  <UniversityIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
                  {user.UNIVERSITY_NAME}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-2 break-words">
                  <BookIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
                  {user.MAJOR}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-2 break-words">
                  <LocationPinIcon className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
                  {user.LOCATION}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-2 break-words">
                  <FaDollarSign className="inline-block h-6 w-6 mr-2 text-gray-500 dark:text-blue-500" />
                  {(user.HOURLY_RATE ?? 0).toFixed(2)} / Hr
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">{user.BIO}</p>
            </div>
            <div className="flex flex-row justify-end gap-2">
              <button
                onClick={handleAvailabilityToggle}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaClock className="mr-2" />
                Availability
              </button>
              <button
                onClick={handleEditToggle}
                className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"
              >
                <FaEdit className="mr-2" />
                Edit User
              </button>
              <button
                onClick={toggleDeleteSkill}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <MdDelete className="mr-2" />
                Delete a Skill
              </button>
            </div>
            {showDeleteSkill && (
              <div className="flex items-center mt-2">
                <select
                  value={skillToDelete}
                  onChange={(e) => setSkillToDelete(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded shadow-sm"
                >
                  <option value="">Select a skill to delete</option>
                  {user.SKILLS.map((skill) => (
                    <option key={skill.skill_name} value={skill.skill_name}>
                      {skill.skill_name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleDeleteAndRedirect}
                  className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {editMode && <EditProfile user={user} closeEdit={handleEditToggle} />}
          {editAvailability && (
            <EditAvailability
              user={user}
              closeEdit={handleAvailabilityToggle}
            />
          )}
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

// SVG icons are assumed to be defined somewhere else as before.

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
