import React, { useState, useEffect } from 'react';

export default function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [location, setLocation] = useState('');
  const [major, setMajor] = useState('');
  const [gender, setGender] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [skillName, setSkillName] = useState('');

  useEffect(() => {
    fetchTutors();
  }, [location, major, gender, hourlyRate, skillName]);

  const fetchTutors = async () => {
    let url = 'http://localhost:5000/users'; // Default URL to fetch all tutors
    const queryParams = [];

    if (location) queryParams.push(`location=${location}`);
    if (major) queryParams.push(`major=${major}`);
    if (gender) queryParams.push(`gender=${gender}`);
    if (hourlyRate) queryParams.push(`hourlyRate=${hourlyRate}`);
    if (skillName) queryParams.push(`skillname=${skillName}`);

    if (queryParams.length) {
      url = `http://localhost:5000/search?${queryParams.join('&')}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error('Failed to fetch tutors:', error);
      setTutors([]); // Clear tutors on error or if no data found
    }
  };

  return (
    <>
      <main className="bg-gray-100 dark:bg-gray-900 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8">Our Experienced Tutors</h1>
          <div className="flex gap-4 mb-8">
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="p-2 border rounded-lg">
              <option value="">All Locations</option>
              <option value="TRIPOLI">TRIPOLI</option>
              <option value="BEIRUT">BEIRUT</option>
              <option value="SAIDA">SAIDA</option>
              <option value="SOUR">SOUR</option>
            </select>
            <input
              type="text"
              placeholder="Major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
           <select
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  className="p-2 border rounded-lg w-full"
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

            <input
              type="text"
              placeholder="Hourly Rate"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Skill Name"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tutors.length > 0 ? (
              tutors.map(tutor => (
                <div key={tutor.EMAIL} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <img alt="Tutor Image" className="w-full h-48 object-cover" src={tutor.PROFILE_PICTURE || '/placeholder.svg'} />
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{tutor.FULL_NAME}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{tutor.BIO || 'No bio available'}</p>
                      <div className="flex items-center">
                        <StarIcon />
                        <span className="ml-2 text-gray-600 dark:text-gray-400">Rating Placeholder</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-sm bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100 rounded">Subject Placeholder</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => window.open(`https://wa.me/${tutor.PHONE_NUMBER}`, '_blank')}
                      className="mt-4 px-4 py-2 text-sm text-primary-700 border border-primary-700 rounded hover:bg-primary-100 dark:text-primary-100 dark:border-primary-900 dark:hover:bg-primary-800 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">No tutors found. Try adjusting your search criteria.</div>
            )}
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
