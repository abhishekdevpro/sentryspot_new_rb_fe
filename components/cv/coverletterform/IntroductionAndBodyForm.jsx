import React, { useContext } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
const IntroductionAndBodyForm = () => {
  const { coverLetterData, setCoverLetterData } =
    useContext(CoverLetterContext);

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
    <div className="p-4 md:p-8   rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Introduction & Body
      </h2>

      {/* Introduction Section */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-2">
          Introduction
        </label>
        <textarea
          value={coverLetterData.introduction}
          onChange={(e) => handleIntroductionChange(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Write your introduction here"
        ></textarea>
      </div>

      {/* Body Section */}
      <h3 className="text-xl font-semibold mb-4 text-white">Body Paragraphs</h3>
      {coverLetterData.body.map((paragraph, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-white font-medium mb-2">
              Paragraph {index + 1}
            </label>
            <button
              type="button"
              onClick={() => removeBodyParagraph(index)}
              aria-label="Remove"
              className="p-2 text-white bg-red-700 rounded-lg text-xl mb-2"
            >
              <MdRemoveCircle />
            </button>
          </div>

          <textarea
            value={paragraph}
            onChange={(e) => handleBodyChange(index, e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder={`Write paragraph ${index + 1}`}
          ></textarea>
        </div>
      ))}

      {/* Add Paragraph Button */}

      <button
        type="button"
        aria-label="Add"
        className="p-2 text-white bg-black rounded-lg text-sm"
        onClick={addBodyParagraph}
      >
        <span> ✙ Add section</span>
      </button>
    </div>
  );
};

export default IntroductionAndBodyForm;
