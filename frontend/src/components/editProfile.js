import React, { useState } from "react";
import axios from "axios";
import { userBio, userLocation } from "./profile_page";
function EditProfile({ closeEdit }) {
  const [formData, setFormData] = useState({
    profilePicture: null,
    bio: userBio,
    location: userLocation,
    skills: [{ skillName: "", skillProficiency: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "profilePicture") {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else if (
      name.startsWith("skillName") ||
      name.startsWith("skillProficiency")
    ) {
      const index = parseInt(name.split("-")[1], 10);
      const field = name.split("-")[0]; // 'skillName' or 'skillProficiency'
      const updatedSkills = formData.skills.map((skill, i) => {
        if (i === index) {
          return { ...skill, [field]: value };
        }
        return skill;
      });
      setFormData({ ...formData, skills: updatedSkills });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { skillName: "", skillProficiency: "" }],
    });
  };

  const handleRemoveSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      BIO: formData.bio,
      LOCATION: formData.location,
      skills: formData.skills.filter(
        (skill) => skill.skillName && skill.skillProficiency
      ),
    };

    console.log("Sending data:", updatedData);

    try {
      const response = await axios.post(
        "http://localhost:5000/update-profile",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update successful:", response.data);
      alert("Profile updated successfully!");
      closeEdit();
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error
      );
      alert(
        "Failed to update profile. " +
          (error.response ? error.response.data.message : "No error data")
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-start pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Profile
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="sm:col-span-2">
              <label
                htmlFor="profilePicture"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text:white"
              >
                Profile Picture
              </label>
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text:white"
                accept="image/*"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text:white"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text:white"
                placeholder="Write your bio here"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text:white"
              >
                Location
              </label>
              <select
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text:white"
              >
                <option value="">Select your location</option>
                <option value="TRIPOLI">TRIPOLI</option>
                <option value="BEIRUT">BEIRUT</option>
                <option value="SAIDA">SAIDA</option>
                <option value="SOUR">SOUR</option>
              </select>
            </div>

            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2"
              >
                <input
                  type="text"
                  name={`skillName-${index}`}
                  data-index={index}
                  value={skill.skillName}
                  onChange={handleChange}
                  className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text:white"
                  placeholder="Enter a skill"
                />
                <select
                  name={`skillProficiency-${index}`}
                  data-index={index}
                  value={skill.skillProficiency}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text:white"
                >
                  <option value="">Select proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm px-3 py-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSkill}
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Another Skill
            </button>
            {/* Close and Save buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                onClick={() => (window.location.href = "/profile")}
              >
                Save Changes
              </button>

              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                onClick={closeEdit}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
