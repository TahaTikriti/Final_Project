import React from "react";


const AvailabilitySchedule = ({ availability }) => {
   const days = [
     "Monday",
     "Tuesday",
     "Wednesday",
     "Thursday",
     "Friday",
     "Saturday",
     "Sunday",
   ];

  const formatTimeRange = (startTime, endTime) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };

    let startDateTime;
    if (startTime.includes(":") && !startTime.includes("T")) {
      // startTime seems to be only a time, no date part, assume same date as endTime
      const endDate = new Date(endTime);
      const datePart = endDate.toISOString().split("T")[0]; // Extract the date part from endTime
      startDateTime = new Date(`${datePart}T${startTime}`); // Combine with startTime
    } else {
      // startTime is assumed to be a full DateTime string
      startDateTime = new Date(startTime);
    }

    const start = startDateTime.toLocaleTimeString("en-US", options);
    const end = new Date(endTime).toLocaleTimeString("en-US", options);
    return `${start} - ${end}`;
  };

return (
    <div className="space-y-4">
        <div className="grid grid-cols-3 gap-8">
            {days.map((day) => (
                <div key={day} className="space-y-1 w-full"> 
                    <div className=" font-medium text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                        {day}
                    </div>
                    {availability[day] && availability[day].length > 0 ? (
                        availability[day].map((timeRange, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-200" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatTimeRange(timeRange[0], timeRange[1])}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-200" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                No hours set
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);
};

export default AvailabilitySchedule;


function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}