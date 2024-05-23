import React from 'react';

const Introduction = () => {
  return (
    <>
      {/* Original section with image on the left */}
      <section className="bg-white dark:bg-gray-800">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img 
            className="w-full dark:hidden rounded-md shadow-lg" 
            src="https://images.hdqwalls.com/download/student-study-stress-img-1280x1024.jpg" 
            alt="dashboard image" 
            style={{ width: '500px', height: '300px' }}  
          />
          <img 
            className="w-full hidden dark:block rounded-md shadow-lg" 
            src="https://images.hdqwalls.com/download/student-study-stress-img-1280x1024.jpg" 
            alt="dashboard image" 
            style={{ width: '500px', height: '300px' }}  
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Let's create more tools and ideas that bring us together.</h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.
            </p>
          </div>
        </div>
      </section>

      {/* Mirrored section with image on the right and text on the left */}
      <section className="bg-white dark:bg-gray-800">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Discover new opportunities to learn and grow.</h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Our platform offers diverse resources to enhance your skills and connect with experts worldwide. Join us to expand your horizons.
            </p>
          </div>
          <img 
            className="w-full dark:hidden rounded-md shadow-lg" 
            src="https://img.freepik.com/premium-photo/two-friends-boy-girl-students-are-studying-library-young-students-are-studying-together-using-books-working-with-tablet-smartphone-while-sitting-library_161094-3254.jpg" 
            alt="engagement image" 
            style={{ width: '500px', height: '300px' }}  
          />
          <img 
            className="w-full hidden dark:block rounded-md shadow-lg" 
            src="https://img.freepik.com/premium-photo/two-friends-boy-girl-students-are-studying-library-young-students-are-studying-together-using-books-working-with-tablet-smartphone-while-sitting-library_161094-3254.jpg" 
            alt="engagement image" 
            style={{ width: '500px', height: '300px' }}  
          />
        </div>
      </section>
    </>
  );
};

export default Introduction;
