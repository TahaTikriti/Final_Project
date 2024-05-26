import React, { useState, useEffect } from 'react';
import Icon from '../assets/icons/tutorium-favicon-color.png';  // Adjust the path and filename as necessary

export default function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [location, setLocation] = useState('');
  const [major, setMajor] = useState('');
  const [gender, setGender] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [skillName, setSkillName] = useState('');

  const baseStyle = {
    color: 'white',
    border: '2px solid rgb(26 86 219)',
    borderRadius: '10px',
    padding: '10px',
    background: 'transparent',
    width: '180px',
    transition: 'box-shadow 0.3s ease-in-out'
  };

  const focusedStyle = {
    ...baseStyle,
    boxShadow: '2px 2px 15px rgb(26 86 219) inset'
  };

  // Using state to handle dynamic styles for focus
  const [locationStyle, setLocationStyle] = useState(baseStyle);
  const [genderStyle, setGenderStyle] = useState(baseStyle);
  const [majorStyle, setMajorStyle] = useState(baseStyle);
  const [hourlyRateStyle, setHourlyRateStyle] = useState(baseStyle);
  const [skillNameStyle, setSkillNameStyle] = useState(baseStyle);

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
      <style>
        {`
          .whatsapp-button {
            background-color: #fff;
            border: 1px solid #25D366;
            padding: 5px;
            position: relative;
            width: 80%;  /* Increased width */
            height: 2em;
            transition: 0.5s;
            font-size: 17px;
            border-radius: 0.4em;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;  /* Centering the button */
            margin-right: auto; /* Centering the button */
          }
  
          .whatsapp-button p {
            margin: 0;
            padding: 0;
            transition: .5s;
            color: #25D366;
            position: absolute;
            top: 50%; /* Center vertically */
            left: 50%; /* Center horizontally */
            transform: translate(-50%, -50%); /* Ensure it is centered */
          }
  
          .whatsapp-button svg {
            position: absolute;
            top: 0.45em;
            right: 0.5em;
            margin: 0;
            padding: 0;
            opacity: 0;
            transition: 0.5s;
            height: 1em;
            fill: #fff;
          }
  
          .whatsapp-button:hover p {
            color: #fff;
          }
  
          .whatsapp-button:hover svg {
            opacity: 1;
          }
  
          .whatsapp-button:hover {
            background-color: #25D366;
          }
  
          .search-row {
            display: flex;
            justify-content: center;
            gap: 20px; /* Spacing between elements */
            margin-bottom: 20px; /* Spacing below the row */
          }
  
          .search-input, .search-select {
            flex-grow: 1;
            max-width: 180px; /* Ensures inputs and selects do not grow too large */
          }
        `}
      </style>
      <main className="bg-gray-100 dark:bg-gray-900 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8">Our Experienced Tutors</h1>
          <div className="search-row">
            <select 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              style={{ ...locationStyle, appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }} // Ensuring custom styles don't hide the dropdown arrow
              onFocus={() => setLocationStyle(focusedStyle)}
              onBlur={() => setLocationStyle(baseStyle)}
              className="search-select"
            >
              <option value="">All Locations</option>
              <option value="TRIPOLI">TRIPOLI</option>
              <option value="BEIRUT">BEIRUT</option>
              <option value="SAIDA">SAIDA</option>
              <option value="SOUR">SOUR</option>
            </select>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
              style={{ ...genderStyle, appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }} // Same as above
              onFocus={() => setGenderStyle(focusedStyle)}
              onBlur={() => setGenderStyle(baseStyle)}
              className="search-select"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="search-row">
            <input
              type="text"
              placeholder="Major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              style={majorStyle}
              onFocus={() => setMajorStyle(focusedStyle)}
              onBlur={() => setMajorStyle(baseStyle)}
              className="search-input"
            />
            <input
              type="text"
              placeholder="Hourly Rate"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              style={hourlyRateStyle}
              onFocus={() => setHourlyRateStyle(focusedStyle)}
              onBlur={() => setHourlyRateStyle(baseStyle)}
              className="search-input"
            />
            <input
              type="text"
              placeholder="Skill Name"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              style={skillNameStyle}
              onFocus={() => setSkillNameStyle(focusedStyle)}
              onBlur={() => setSkillNameStyle(baseStyle)}
              className="search-input"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {tutors.length > 0 ? (
    tutors.map(tutor => (
      <div key={tutor.EMAIL} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between px-4 pt-4">
          {/* Icon on the left */}
          <img src={Icon} alt="Left Icon" className="w-5 h-5 text-gray-500 dark:text-gray-400" />

          {/* Icon on the right */}
          <img src={Icon} alt="Right Icon" className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={
            tutor.PROFILE_PICTURE
              ? `http://localhost:5000/${tutor.PROFILE_PICTURE.replace(/\\/g, "/")}`
              : tutor.GENDER === "Male"
              ? "https://avatar.iran.liara.run/public/boy"
              : "https://avatar.iran.liara.run/public/girl"
          } alt="Tutor Image"/>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{tutor.FULL_NAME}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{tutor.MAJOR || 'No major available'}</span>
          <div className="flex mt-4 md:mt-6">
            <a href={`https://wa.me/${tutor.PHONE_NUMBER}`} target="_blank" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Contact Me</a>
            <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">View Profile</a>
          </div>
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
