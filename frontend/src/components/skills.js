import React, { useState, useEffect } from 'react';

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch skills data
    fetch('http://localhost:5000/getskills')  // Adjust the URL as needed
      .then(response => response.json())
      .then(data => setSkills(data))
      .catch(error => console.error('Error fetching skills:', error));
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-gray-900 ">
            Explore the Latest Technologies
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Stay ahead of the curve with our curated selection of the hottest
            programming languages and frameworks.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-900"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <img
                    src={skill.URL}
                    alt={skill.SKILL_NAME}
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {skill.SKILL_NAME}
                </h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {skill.DESCRIPTION}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
