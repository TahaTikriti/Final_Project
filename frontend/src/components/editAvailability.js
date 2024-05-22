import React, { useState } from "react";
import axios from "axios";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

function EditAvailability({ closeEdit }) {
  const initialAvailability = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  const [availability, setAvailability] = useState(initialAvailability);

  const handleChange = (day, timeRanges) => {
    setAvailability({ ...availability, [day]: timeRanges });
  };

  const handleAddTimeRange = (day) => {
    const newTimeRange = [new Date(), new Date()]; // Default new range with current time
    setAvailability({
      ...availability,
      [day]: [...availability[day], newTimeRange],
    });
  };

  const handleRemoveTimeRange = (day, index) => {
    const updatedRanges = availability[day].filter((_, i) => i !== index);
    setAvailability({ ...availability, [day]: updatedRanges });
  };

  const handleSubmit = async () => {
    console.log("Submitting Availability:", availability);

    try {
      const response = await axios.post(
        "http://localhost:5000/update-availability",
        { availability }
      );
      console.log("Availability Update successful:", response.data);
      alert("Availability updated successfully!");
      closeEdit();
    } catch (error) {
      console.error(
        "Error updating availability:",
        error.response ? error.response.data : error
      );
      alert("Failed to update availability.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:opacity-95 sm:p-5">
          <div className="flex justify-between items-start pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Availability
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {Object.keys(availability).map((day) => (
              <div key={day} className="space-y-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                  {day}
                </h4>
                {availability[day].map((range, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 mb-2 flex-wrap"
                  >
                    {" "}
                    <div className="my-timepicker">
                      <TimeRangePicker
                        className="rounded border shadow bg-white text-gray-800 select-none"
                        value={range}
                        onChange={(newRange) =>
                          handleChange(
                            day,
                            availability[day].map((r, idx) =>
                              idx === index ? newRange : r
                            )
                          )
                        }
                        disableClock
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveTimeRange(day, index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddTimeRange(day)}
                  className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                >
                  Add Time Range
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-primary-700 hover:bg-primary-800 text-white px-5 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={closeEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAvailability;
