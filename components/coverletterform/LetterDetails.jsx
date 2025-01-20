import React, { useContext } from "react";
import { CoverLetterContext } from "../context/CoverLetterContext";

const LetterDetails = () => {
  const { coverLetterData, setCoverLetterData } = useContext(CoverLetterContext);

  const handleChange = (field, value) => {
    setCoverLetterData((prevData) => ({
      ...prevData,
      letterDetails: {
        ...prevData.letterDetails,
        [field]: value,
      },
    }));
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Letter Details</h2>
      <div className="space-y-4">
        {/* Date */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Date</label>
          <input
            type="date"
            value={coverLetterData.letterDetails.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Select a date"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Job Title</label>
          <input
            type="text"
            value={coverLetterData.letterDetails.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the job title"
          />
        </div>

        {/* Reference */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Reference</label>
          <input
            type="text"
            value={coverLetterData.letterDetails.reference}
            onChange={(e) => handleChange("reference", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the reference (e.g., Ref#123)"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Company Name</label>
          <input
            type="text"
            value={coverLetterData.letterDetails.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the company's name"
          />
        </div>

        {/* Salutation */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Salutation</label>
          <input
            type="text"
            value={coverLetterData.letterDetails.salutation}
            onChange={(e) => handleChange("salutation", e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the salutation (e.g., Ms. Smith)"
          />
        </div>
      </div>
      <button
        onClick={() => console.log("Letter Details Updated:", coverLetterData.letterDetails)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default LetterDetails;
