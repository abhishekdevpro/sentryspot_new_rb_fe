import React, { useContext, useState } from "react";
import { CoverLetterContext } from "../context/CoverLetterContext";

const PersonalInformation = () => {
  const { coverLetterData, setCoverLetterData } = useContext(CoverLetterContext);

  const handleChange = (field, value) => {
    setCoverLetterData((prevData) => ({
      ...prevData,
      personalDetails: {
        ...prevData.personalDetails,
        [field]: value,
      },
    }));
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Information</h2>
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Name</label>
          <input
            type="text"
            value={coverLetterData.personalDetails.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Email</label>
          <input
            type="email"
            value={coverLetterData.personalDetails.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Address</label>
          <textarea
            value={coverLetterData.personalDetails.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your address"
            rows="3"
          ></textarea>
        </div>

        {/* Contact Field */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Contact</label>
          <input
            type="tel"
            value={coverLetterData.personalDetails.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your contact number"
          />
        </div>
      </div>
      <button
        onClick={() => console.log("Personal Information Updated:", coverLetterData.personalDetails)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default PersonalInformation;
