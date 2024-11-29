// import React, { useContext, useState } from "react";
// import FormButton from "./FormButton";
// import { ResumeContext } from "../../pages/builder";

// const WorkExperience = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   const [searchValue, setSearchValue] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleWorkExperience = (e, index) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index][e.target.name] = e.target.value;
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const addWorkExperience = () => {
//     setResumeData({
//       ...resumeData,
//       workExperience: [
//         ...resumeData.workExperience,
//         {
//           company: "",
//           position: "",
//           description: "",
//           keyAchievements: "",
//           startYear: "",
//           endYear: "",
//         },
//       ],
//     });
//   };

//   const removeWorkExperience = (index) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index] = newWorkExperience[newWorkExperience.length - 1];
//     newWorkExperience.pop();
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const handleSearchChange = async (e) => {
//     const value = e.target.value;
//     setSearchValue(value);
//     if (e.key === 'Enter' && value.length > 2) {
//       setIsLoading(true);
//       try {
//         const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GENAI_API_KEY);
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//         const result = await model.generateContent(value);
//         const response = result.response;
//         const responsibilities = response.text().split('\n').filter(line => line.trim() !== '');
//         setSearchResults(responsibilities);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleDescriptionChange = (value, index) => {
//     handleWorkExperience({ target: { name: 'description', value } }, index);
//   };

//   const handleSearchResultSelect = (result, index) => {
//     const currentDescription = resumeData.workExperience[index].description || '';
//     const newDescription = currentDescription ? `${currentDescription}\n${result}` : result;
//     handleDescriptionChange(newDescription, index);
//     setSearchValue('');
//     setSearchResults([]);
//   };

//   const handleAssistClick = (e, index) => {
//     e.preventDefault();
//     handleSearchChange({ target: { value: searchValue }, key: 'Enter' });
//   };

//   return (
//     <div className="flex-col-gap-2">
//       <h2 className="input-title text-black text-3xl">Work Experience</h2>
//       {resumeData.workExperience.map((workExperience, index) => (
//         <div key={index} className="f-col">
//           <label className="mt-2">Company</label>
//           <input
//             type="text"
//             placeholder="Company"
//             name="company"
//             className="w-full other-input border-black border"
//             value={workExperience.company}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           <label className="mt-2">Job Title</label>
//           <input
//             type="text"
//             placeholder="Job Title"
//             name="position"
//             className="w-full other-input border-black border"
//             value={workExperience.position}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           <div className="flex-wrap-gap-2">
//             <input
//               type="date"
//               placeholder="Start Year"
//               name="startYear"
//               className="other-input border-black border"
//               value={workExperience.startYear}
//               onChange={(e) => handleWorkExperience(e, index)}
//             />
//             <input
//               type="date"
//               placeholder="End Year"
//               name="endYear"
//               className="other-input border-black border"
//               value={workExperience.endYear}
//               onChange={(e) => handleWorkExperience(e, index)}
//             />
//           </div>
//           <div className="flex justify-between mb-2">
//             <label className="mt-2">Description</label>
//             <button
//               type="button"
//               className="border bg-black text-white px-3 rounded-3xl"
//               onClick={(e) => handleAssistClick(e, index)}
//             >
//               + AI Assist
//             </button>
//           </div>
//           <textarea
//             type="text"
//             placeholder="Description"
//             name="description"
//             className="w-full other-input border-black border h-32"
//             value={workExperience.description}
//             maxLength="250"
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           <label className="mt-2">Key Achievements</label>
//           <textarea
//             type="text"
//             placeholder="Key Achievements"
//             name="keyAchievements"
//             className="w-full other-input border-black border h-40"
//             value={workExperience.keyAchievements}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           {searchResults.length > 0 && (
//             <ul className="search-results-list">
//               {searchResults.map((result, idx) => (
//                 <li key={idx} onClick={() => handleSearchResultSelect(result, index)}>
//                   {result}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       ))}
//       <FormButton
//         size={resumeData.workExperience.length}
//         add={addWorkExperience}
//         remove={removeWorkExperience}
//       />
//     </div>
//   );
// };

// export default WorkExperience;

// import React, { useContext, useState } from "react";
// import FormButton from "./FormButton";
// import { ResumeContext } from "../../pages/builder";
// import axios from 'axios';

// const WorkExperience = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   const [searchValue, setSearchValue] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const token = localStorage.getItem("token")

//   const handleWorkExperience = (e, index) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index][e.target.name] = e.target.value;
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const addWorkExperience = () => {
//     setResumeData({
//       ...resumeData,
//       workExperience: [
//         ...resumeData.workExperience,
//         {
//           company: "",
//           position: "",
//           description: "",
//           keyAchievements: "",
//           startYear: "",
//           endYear: "",
//           location: "",
//         },
//       ],
//     });
//   };

//   const removeWorkExperience = (index) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index] = newWorkExperience[newWorkExperience.length - 1];
//     newWorkExperience.pop();
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const handleAIAssist = async (index) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-profexp-data",
//         {
//           key: "professional_experience",
//           keyword:
//             "Genrate professional summary and Checklist of professional experience in manner of content and information",
//           content: resumeData.workExperience[index].position,
//           company_name: resumeData.workExperience[index].company, // Added 'company_name'
//           job_title: resumeData.workExperience[index].position, // Added 'job_title'
//           location: resumeData.workExperience[index].location, // Added 'location'
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       handleDescriptionChange(
//         response.data.data.resume_analysis.professional_summary,
//         index
//       );
//       handleResponsibilitiesChange(
//         response.data.data.resume_analysis.responsibilities,
//         index
//       );
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDescriptionChange = (value, index) => {
//     handleWorkExperience({ target: { name: "description", value } }, index);
//   };

//   const handleResponsibilitiesChange = (responsibilities, index) => {
//     handleWorkExperience(
//       {
//         target: { name: "keyAchievements", value: responsibilities.join("\n") },
//       },
//       index
//     );
//   };

//   return (
//     <div className="flex-col-gap-2">
//       <h2 className="input-title text-black text-3xl">Work Experience</h2>
//       {resumeData.workExperience.map((workExperience, index) => (
//         <div key={index} className="f-col">
//           <label className="mt-2">Company</label>
//           <input
//             type="text"
//             placeholder="Company"
//             name="company"
//             className="w-full other-input border-black border"
//             value={workExperience.company}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           <label className="mt-2">Job Title</label>
//           <input
//             type="text"
//             placeholder="Job Title"
//             name="position"
//             className="w-full other-input border-black border"
//             value={workExperience.position}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           <div className="flex-wrap-gap-2">
//             <input
//               type="date"
//               placeholder="Start Year"
//               name="startYear"
//               className="other-input border-black border"
//               value={workExperience.startYear}
//               onChange={(e) => handleWorkExperience(e, index)}
//             />
//             <input
//               type="date"
//               placeholder="End Year"
//               name="endYear"
//               className="other-input border-black border"
//               value={workExperience.endYear}
//               onChange={(e) => handleWorkExperience(e, index)}
//             />
//           </div>
//           <label className="mt-2">Location</label>
//           <input
//             type="text"
//             placeholder="Location"
//             name="location"
//             className="w-full other-input border-black border"
//             value={workExperience.location}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />

//           <div className="flex justify-between mb-2">
//             <label className="mt-2">Description</label>
//             <button
//               type="button"
//               className="border bg-black text-white px-3 rounded-3xl"
//               onClick={() => handleAIAssist(index)}
//               disabled={isLoading}
//             >
//               {isLoading ? "Loading..." : "+ AI Assist"}
//             </button>
//           </div>
//           <textarea
//             type="text"
//             placeholder="Description"
//             name="description"
//             className="w-full other-input border-black border h-32"
//             value={workExperience.description}
//             maxLength="250"
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           <label className="mt-2">Key Achievements</label>
//           <textarea
//             type="text"
//             placeholder="Key Achievements"
//             name="keyAchievements"
//             className="w-full other-input border-black border h-40"
//             value={workExperience.keyAchievements}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//         </div>
//       ))}
//       <FormButton
//         size={resumeData.workExperience.length}
//         add={addWorkExperience}
//         remove={removeWorkExperience}
//       />
//     </div>
//   );
// };

// export default WorkExperience;

import React, { useContext, useState } from "react";
import FormButton from "./FormButton";
import { ResumeContext } from "../../pages/builder";
import axios from 'axios';

const WorkExperience = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [summaries, setSummaries] = useState([]); // Store key achievements
  const [selectedSummaries, setSelectedSummaries] = useState([]); // Store selected key achievements
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state
  const [popupIndex, setPopupIndex] = useState(null); // Store index of the work experience entry being edited
  const token = localStorage.getItem("token");

  const handleWorkExperience = (e, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
          location: "",
        },
      ],
    });
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index] = newWorkExperience[newWorkExperience.length - 1];
    newWorkExperience.pop();
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleAIAssist = async (index) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-profexp-data",
        {
          key: "professional_experience",
          keyword:
            "Generate professional summary and Checklist of professional experience in manner of content and information",
          content: resumeData.workExperience[index].position,
          company_name: resumeData.workExperience[index].company,
          job_title: resumeData.workExperience[index].position,
          location: resumeData.workExperience[index].location,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setSummaries(response.data.data.resume_analysis.responsibilities); // Save key achievements
      setPopupIndex(index); // Store the index of the work experience entry being edited
      setShowPopup(true); // Show the popup for key achievements selection
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyAchievementSelect = (achievement) => {
    const isSelected = selectedSummaries.includes(achievement);
    if (isSelected) {
      // Deselect the achievement
      setSelectedSummaries(selectedSummaries.filter(item => item !== achievement));
    } else {
      // Add to selected achievements
      setSelectedSummaries([...selectedSummaries, achievement]);
    }
  };

  const handleSaveSelectedAchievements = (index, e) => {
    e.preventDefault(); // Prevent page refresh

    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].keyAchievements = selectedSummaries.join("\n"); // Save selected achievements
    setResumeData({
      ...resumeData,
      workExperience: newWorkExperience,
    });

    setShowPopup(false); // Close the popup
  };

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title text-black text-3xl">Work Experience</h2>
      {resumeData.workExperience.map((workExperience, index) => (
        <div key={index} className="f-col">
          <label className="mt-2">Company</label>
          <input
            type="text"
            placeholder="Company"
            name="company"
            className="w-full other-input border-black border"
            value={workExperience.company}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <label className="mt-2">Job Title</label>
          <input
            type="text"
            placeholder="Job Title"
            name="position"
            className="w-full other-input border-black border"
            value={workExperience.position}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <div className="flex-wrap-gap-2">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="other-input border-black border"
              value={workExperience.startYear}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="other-input border-black border"
              value={workExperience.endYear}
              onChange={(e) => handleWorkExperience(e, index)}
            />
          </div>
          <label className="mt-2">Location</label>
          <input
            type="text"
            placeholder="Location"
            name="location"
            className="w-full other-input border-black border"
            value={workExperience.location}
            onChange={(e) => handleWorkExperience(e, index)}
          />

          <div className="flex justify-between mb-2">
            <label className="mt-2">Description</label>
            <button
              type="button"
              className="border bg-black text-white px-3 rounded-3xl"
              onClick={() => handleAIAssist(index)}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "+ AI Assist"}
            </button>
          </div>
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            className="w-full other-input border-black border h-32"
            value={workExperience.description}
            maxLength="250"
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <label className="mt-2">Key Achievements</label>
          <textarea
            type="text"
            placeholder="Key Achievements"
            name="keyAchievements"
            className="w-full other-input border-black border h-40"
            value={workExperience.keyAchievements}
            onChange={(e) => handleWorkExperience(e, index)}
          />
        </div>
      ))}
      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />

      {/* Popup for Key Achievements */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">Select Key Achievements</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {summaries.map((summary, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedSummaries.includes(summary)}
                    onChange={() => handleKeyAchievementSelect(summary)}
                    className="mt-1"
                  />
                  <p className="text-gray-800">{summary}</p>
                </div>
              ))}
            </div>
            <button
              onClick={(e) => handleSaveSelectedAchievements(popupIndex, e)} // Pass the index of the work experience
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Save Selected Achievements
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
