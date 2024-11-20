import React, { useContext, useState } from "react";
import { ResumeContext } from "../../pages/builder";
import axios from 'axios';

const Summary = () => {
  const { resumeData, setResumeData, handleChange } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAIAssist = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      const location = localStorage.getItem("location");
      
      const response = await axios.post(
        'https://api.resumeintellect.com/api/user/ai-resume-summery-data',
        {
          key: "resumesummery",
          keyword: "professional summery in manner of description",
          content: resumeData.position,
          file_location: location
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      // Check if the response is successful and contains the expected data
      if (response.data.status === "success" && 
          response.data.data?.resume_analysis?.professional_summary) {
        setResumeData({ 
          ...resumeData, 
          summary: response.data.data.resume_analysis.professional_summary 
        });
      } else {
        setError("Unable to generate summary. Please try again.");
      }
    } catch (error) {
      console.error('Error getting AI-assisted summary:', error);
      setError("An error occurred while generating the summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-col-gap-3 w-full mt-10 px-10">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between mb-2 ">
          <h2 className="input-title text-black text-3xl">Summary</h2>
          <button
            type="button"
            className={`border px-4 py-2 rounded-3xl transition-colors ${
              loading 
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            onClick={handleAIAssist}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : '+ AI Assist'}
          </button>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error}
          </div>
        )}
      </div>

      <div className="grid-1 ">
        <textarea
          placeholder="Enter your professional summary or use AI Assist to generate one"
          name="summary"
          className="w-full other-input h-80 border-black border p-4 rounded"
          value={resumeData.summary}
          onChange={handleChange}
          maxLength="500"
        />
        <div className="text-sm text-gray-500 mt-1 text-right">
          {resumeData.summary?.length || 0}/500
        </div>
      </div>
    </div>
  );
};

export default Summary;