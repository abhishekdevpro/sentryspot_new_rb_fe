import React, { useContext } from "react";
import { CoverLetterContext } from "../context/CoverLetterContext";

const IntroductionAndBodyForm = () => {
  const { coverLetterData, setCoverLetterData } = useContext(CoverLetterContext);

  const handleIntroductionChange = (value) => {
    setCoverLetterData((prevData) => ({
      ...prevData,
      introduction: value,
    }));
  };

  const handleBodyChange = (index, value) => {
    setCoverLetterData((prevData) => {
      const updatedBody = [...prevData.body];
      updatedBody[index] = value;
      return {
        ...prevData,
        body: updatedBody,
      };
    });
  };

  const addBodyParagraph = () => {
    setCoverLetterData((prevData) => ({
      ...prevData,
      body: [...prevData.body, ""], // Add a new empty paragraph
    }));
  };

  const removeBodyParagraph = (index) => {
    setCoverLetterData((prevData) => {
      const updatedBody = prevData.body.filter((_, i) => i !== index);
      return {
        ...prevData,
        body: updatedBody,
      };
    });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Introduction & Body</h2>

      {/* Introduction Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Introduction</label>
        <textarea
          value={coverLetterData.introduction}
          onChange={(e) => handleIntroductionChange(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Write your introduction here"
        ></textarea>
      </div>

      {/* Body Section */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Body Paragraphs</h3>
      {coverLetterData.body.map((paragraph, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Paragraph {index + 1}
          </label>
          <textarea
            value={paragraph}
            onChange={(e) => handleBodyChange(index, e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder={`Write paragraph ${index + 1}`}
          ></textarea>
          <button
            onClick={() => removeBodyParagraph(index)}
            className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
          >
            Remove Paragraph
          </button>
        </div>
      ))}

      {/* Add Paragraph Button */}
      <button
        onClick={addBodyParagraph}
        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
      >
        Add New Paragraph
      </button>
    </div>
  );
};

export default IntroductionAndBodyForm;
