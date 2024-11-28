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
//               className="border bg-black text-[#003479] px-3 rounded-3xl"
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

import React, { useContext, useState } from "react";
import FormButton from "./FormButton";
import { ResumeContext } from "../../pages/builder";
import axios from 'axios';

const WorkExperience = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem("token")

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
    try {
      const response = await axios.post('https://api.sentryspot.co.uk/api/jobseeker/ai-resume-profexp-data', {
        key: "professional_experience",
        keyword: "Genrate professional summary and Checklist of professional experience in manner of content and information",
        content: resumeData.workExperience[index].position,
      },{
        headers:{
          Authorization:token
        }
      });
      
      handleDescriptionChange(response.data.data.resume_analysis.professional_summary, index);
      handleResponsibilitiesChange(response.data.data.resume_analysis.responsibilities, index);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDescriptionChange = (value, index) => {
    handleWorkExperience({ target: { name: 'description', value } }, index);
  };

  const handleResponsibilitiesChange = (responsibilities, index) => {
    handleWorkExperience({ target: { name: 'keyAchievements', value: responsibilities.join('\n') } }, index);
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
          <div className="flex justify-between mb-2">
            <label className="mt-2">Description</label>
            <button
              type="button"
              className="border bg-black text-[#fff] px-3 rounded-3xl"
              onClick={() => handleAIAssist(index)}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : '+ AI Assist'}
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
    </div>
  );
};

export default WorkExperience;