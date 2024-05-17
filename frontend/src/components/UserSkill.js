import React from "react";
const UserSkill = ({ skillName, proficiency }) => {
  const getProficiencyPercentage = (proficiency) => {
    switch (proficiency.toLowerCase()) {
      case 'beginner':
        return 25;
      case 'intermediate':
        return 50;
      case 'advanced':
        return 75;
      case 'expert':
        return 100;
      default:
        return 0;  // Default case for unexpected proficiency labels
    }
  };

  const percentage = getProficiencyPercentage(proficiency);

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium flex items-center gap-2">
        <CodeIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        {skillName}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {proficiency} 
        </span>
      </div>
    </div>
  );
};


export default UserSkill;
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