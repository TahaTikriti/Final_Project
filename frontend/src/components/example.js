// SkillsComponent.js
import React, { useState, useEffect } from 'react';

function Example() {
  // Declare state to hold skills
  const [skills, setSkills] = useState([]);

  // Fetch data from the skills API when the component mounts
  useEffect(() => {
    async function fetchSkills() {
      try {
        // Replace with your backend server URL
        const response = await fetch('http://localhost:5000/getskills');
        if (response.ok) {
          const data = await response.json();
          // Update state with only the relevant fields
          setSkills(data.map(skill => ({
            name: skill.SKILL_NAME,
            description: skill.DESCRIPTION
          })));
        } else {
          console.error('Error fetching skills:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    }

    fetchSkills();
  }, []);

  // Render skills in individual containers
  return (
    <div>
      {skills.length === 0 ? (
        <p>No skills available.</p>
      ) : (
        skills.map((skill, index) => (
          <div key={index} className="skill-container" style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px 0'
          }}>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Example;
