import React, { useState, useEffect } from 'react';
import Header from './header'; // Adjust the import path as necessary

export default function Component() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTutors(data);
      } catch (error) {
        console.error('Failed to fetch tutors:', error);
      }
    };
  
    fetchTutors();
  }, []);

  return (
    <>
      {/* Replace the existing header/navigation with the imported Header component */}
      <Header />

      <main className="bg-gray-100 dark:bg-gray-900 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8">Our Experienced Tutors</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tutors.map(tutor => (
              <div key={tutor.EMAIL} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img alt="Tutor Image" className="w-full h-48 object-cover" src={tutor.PROFILE_PICTURE || '/placeholder.svg'} />
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{tutor.FULL_NAME}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{tutor.BIO || 'No bio available'}</p>
                    <div className="flex items-center">
                      {Array(5).fill().map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                      <span className="ml-2 text-gray-600 dark:text-gray-400">Rating Placeholder</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-sm bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100 rounded">Subject Placeholder</span>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 text-sm text-primary-700 border border-primary-700 rounded hover:bg-primary-100 dark:text-primary-100 dark:border-primary-900 dark:hover:bg-primary-800 transition-colors">Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function StarIcon() {
  return (
    <span className="inline-block w-5 h-5 fill-current text-primary-500">&#9733;</span>
  );
}
