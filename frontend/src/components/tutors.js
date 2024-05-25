import React, { useState, useEffect } from 'react';

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
                <div key={tutor.EMAIL} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <img alt="Tutor Image" className="w-full h-48 object-cover" src={tutor.PROFILE_PICTURE || '/placeholder.svg'} />
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{tutor.FULL_NAME}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{tutor.BIO || 'No bio available'}</p>
                    </div>
                    <button
                      onClick={() => window.open(`https://wa.me/${tutor.PHONE_NUMBER}`, '_blank')}
                      className="whatsapp-button"
                    >
                      <p>Contact</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                      </svg>
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
