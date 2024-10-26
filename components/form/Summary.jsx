import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
const Summary = () => {
  const { resumeData, setResumeData, handleChange } = useContext(ResumeContext);
  return (
    <div className="flex-col-gap-3 w-full mt-10 px-10">
      <div className="flex justify-between mb-2">
      <h2 className="input-title text-black  text-3xl">Summary</h2>
            <button
              type="button"
              className="border bg-black text-white px-3 rounded-3xl"
            
            >
              + AI Assist
            </button>
          </div>
    
      <div className="grid-4">
        <textarea
          placeholder="Summary"
          name="summary"
          className="w-full other-input h-40 border-black border"
          value={resumeData.summary}
          onChange={handleChange}
          maxLength="500"
        />
      </div>
    </div>
  );
};

export default Summary;
