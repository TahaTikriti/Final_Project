import React, { useState, useEffect } from "react";
import UserSkill from "./UserSkill";

export default function ProfilePage() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch skills from the database
    fetch("/skills") // Adjust the API endpoint as needed
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  const checkSession = () => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      alert('You are in session');
    } else {
      alert('There is no session');
    }
  };
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden">
              <img
                src="/placeholder-avatar.jpg"
                alt="@shadcn"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="text-center"> 
              <h1 className="text-2xl font-bold md:text-3xl flex items-center gap-2 text-white">
                <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                Jared Palmer
              </h1>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <BookIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                Computer Science
              </p>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <UniversityIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                University of California, Berkeley
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Contact
              </button>
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100">
                Edit Profile
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <ActivityIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                Skills
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {skills.map((skill) => (
                  <UserSkill
                    key={skill.id} // Assuming each skill has a unique id
                    skillName={skill.name}
                    proficiency={skill.proficiency}
                    percentage={skill.percentage}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                Availability Schedule
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Monday</div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 fill-primary" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      9:00 AM - 12:00 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 fill-primary" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      2:00 PM - 5:00 PM
                    </span>
                  </div>
                </div>
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
