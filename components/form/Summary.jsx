// import React, { useContext, useState } from "react";
// import { ResumeContext } from "../../pages/builder";
// import axios from "axios";
// // import ReactQuill from "react-quill";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css"; // Import Quill CSS for styling
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// const Summary = () => {
//   const { resumeData, setResumeData, handleChange } = useContext(ResumeContext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleAIAssist = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("token");
//       const location = localStorage.getItem("location");

//       const response = await axios.post(
//         "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-summery-data",
//         {
//           key: "resumesummery",
//           keyword: "professional summery in manner of description",
//           content: resumeData.position,
//           file_location: location,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       // Check if the response is successful and contains the expected data
//       if (
//         response.data.status === "success" &&
//         response.data.data?.resume_analysis?.professional_summary
//       ) {
//         setResumeData({
//           ...resumeData,
//           summary: response.data.data.resume_analysis.professional_summary,
//         });
//       } else {
//         setError("Unable to generate summary. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error getting AI-assisted summary:", error);
//       setError(
//         "An error occurred while generating the summary. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuillChange = (content) => {
//     setResumeData({
//       ...resumeData,
//       summary: content,
//     });
//   };

//   return (
//     <div className="flex-col-gap-3 w-full mt-10 px-10">
//       <div className="flex flex-col gap-2">
//         <div className="flex justify-between mb-2 ">
//           <h2 className="input-title text-black text-3xl">Summary</h2>
//           <button
//             type="button"
//             className={`border px-4 py-2 rounded-3xl transition-colors ${
//               loading
//                 ? "bg-gray-400 text-white cursor-not-allowed"
//                 : "bg-black text-white hover:bg-gray-800"
//             }`}
//             onClick={handleAIAssist}
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="flex items-center gap-2">
//                 <svg
//                   className="animate-spin h-4 w-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Loading...
//               </span>
//             ) : (
//               "+ AI Assist"
//             )}
//           </button>
//         </div>

//         {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
//       </div>

//       <div className="grid-1 w-full max-w-[23rem] ">
//         <ReactQuill
//           placeholder="Enter your professional summary or use Smart Assistto generate one"
//           value={resumeData.summary || ""}
//           onChange={handleQuillChange}
//           className="w-full other-input h-80 border-black border rounded"
//           theme="snow"
//           modules={{
//             toolbar: [
//               // [{ header: [1, 2, false] }],
//               ["bold", "italic", "underline"],
//               // [{ list: "ordered" }, { list: "bullet" }],
//               ["clean"],
//             ],
//           }}
//         />
//         <div className="text-sm text-gray-500 mt-1 text-right">
//           {resumeData.summary?.length || 0}/500
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Summary;




import React, { useContext, useState } from "react";
import { ResumeContext } from "../../pages/builder";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS for styling

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Summary = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaries, setSummaries] = useState([]); // Store all summaries
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const [selectedSummaryIndex, setSelectedSummaryIndex] = useState(null); // Track selected summary index

  const handleAIAssist = async () => {
    setLoading(true);
    setError(null);
    setSelectedSummaryIndex(null); // Reset selected summary index to ensure checkboxes are blank

    try {
      const token = localStorage.getItem("token");
      const location = localStorage.getItem("location");

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-summery-data",
        {
          key: "resumesummery",
          keyword: `professional summary in manner of description - ${Date.now()}`, // Adding a timestamp to ensure uniqueness
          content: resumeData.position,
          file_location: location,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Log the full response to check the structure
      console.log("API Response:", response);

      if (
        response.data.status === "success" &&
        response.data.data?.resume_analysis?.professional_summaries
      ) {
        setSummaries(response.data.data.resume_analysis.professional_summaries); // Store new summaries
        setShowPopup(true); // Show the popup/modal
      } else {
        // If no professional summaries are found in the response
        setError("Unable to fetch summaries. Please try again.");
      }
    } catch (error) {
      console.error("Error getting AI summaries:", error);
      setError("An error occurred while fetching summaries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarySelect = (index) => {
    setSelectedSummaryIndex(index);
  };

  const handleAddSummary = () => {
    if (selectedSummaryIndex !== null) {
      setResumeData({
        ...resumeData,
        summary: summaries[selectedSummaryIndex], // Set the selected summary in Quill editor
      });
      setShowPopup(false); // Close the popup
    }
  };

  // Handle Quill editor content change
  const handleQuillChange = (content) => {
    setResumeData({
      ...resumeData,
      summary: content,
    });
  };

  return (
    <div className="flex-col gap-3 w-full mt-10 px-10">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between mb-2">
          <h2 className="input-title text-white text-3xl">Summary</h2>
          <button
            type="button"
            className={`border px-4 py-2 rounded-3xl transition-colors ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onClick={handleAIAssist}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "+ Smart Assist"
            )}
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      </div>

      {/* ReactQuill Editor */}
      <div className="grid-1 w-full ">
        <ReactQuill
          placeholder="Enter your professional summary or use Smart Assistto generate one"
          value={resumeData.summary || ""}
          onChange={handleQuillChange}
          className="w-full other-input h-100 border-black border rounded"
          theme="snow"
          modules={{
            toolbar: [["bold", "italic", "underline"], ["clean"]],
          }}
        />
        <div className="text-sm text-gray-500 mt-1 text-right">
          {resumeData.summary?.length || 0}/500
        </div>
      </div>

      {/* Popup/Modal for AI Summaries */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-4xl">
            <h3 className="text-xl font-bold mb-4">Select a Summary</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {summaries.map((summary, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="summary"
                    checked={selectedSummaryIndex === index}
                    onChange={() => handleSummarySelect(index)}
                    className="mt-1"
                  />
                  <p className="text-gray-800">{summary}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleAddSummary}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                disabled={selectedSummaryIndex === null} // Disable if no summary is selected
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
