import React from 'react';
import rabihImage from '../images/rabih.jpg';
import tahaImage from '../images/taha.jpg';

const Team = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Team</h2>
          
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          
          {/* Rabih's profile */}
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="w-48 h-48 rounded-lg sm:rounded-none sm:rounded-l-lg" src={rabihImage} alt="Rabih Avatar" />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Rabih Kouzayha</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">MERN STACK DEV</span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Rabih drives the technical strategy of the platform and brand.
              </p>
              <ul className="flex space-x-4 sm:mt-0">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    {/* Social media icon */}
                  </a>
                </li>
                {/* Additional list items for other social media links */}
              </ul>
            </div>
          </div>

          {/* Taha's profile */}
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="w-48 h-48 rounded-lg sm:rounded-none sm:rounded-l-lg" src={tahaImage} alt="Taha Avatar" />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Taha Tekriti</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">MERN STACK DEV</span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Taha drives the technical strategy of the platform and brand.
              </p>
              <ul className="flex space-x-4 sm:mt-0">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    {/* Social media icon */}
                  </a>
                </li>
                {/* Additional list items for other social media links */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
