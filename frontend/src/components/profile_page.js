import React from "react";
import profilePic from "../assets/icons/tutorium-favicon-color.png"; // Assume a default profile picture

const ProfilePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex items-center space-x-4">
            <img
              src={profilePic}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover"
            />
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              User's Name
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <dl>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Major:
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 dark:text-white">
                  Computer Science
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  University/Campus:
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 dark:text-white">
                  University of Example
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 px-4 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Skills & Proficiency:
                </div>
                <ul className="mt-1 text-sm text-gray-900 sm:mt-0 dark:text-white">
                  <li>JavaScript - Advanced</li>
                  <li>Data Structures - Intermediate</li>
                  <li>Algorithms - Intermediate</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Availability:
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 dark:text-white">
                  Weekdays evenings and weekends
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Hourly Rate:
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 dark:text-white">
                  $40/hour
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
