// import React, { useContext } from "react";
// import { ResumeContext } from "../../pages/builder";
// import FormButton from "./FormButton";

// const Language = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);
//   const skillType = "languages";
//   const title = "Languages";
//   const placeholder = "Language";

//   const handleSkills = (e, index, skillType) => {
//     const newSkills = [...resumeData[skillType]];
//     newSkills[index] = e.target.value;
//     setResumeData({ ...resumeData, [skillType]: newSkills });
//   };

//   const addSkill = () => {
//     setResumeData({ ...resumeData, [skillType]: [...resumeData[skillType], ""] });
//   };

//   const removeSkill = (index) => {
//     const newSkills = [...resumeData[skillType]];
//     newSkills.splice(-1, 1);
//     setResumeData({ ...resumeData, [skillType]: newSkills });
//   };

//   return (
//     <div className="flex-col-gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-white  text-3xl">
//         {title || "Language"}
//       </h2>
//       {resumeData[skillType].map((skill, index) => (
//         <div key={index} className="f-col">
//           <input
//             type="text"
//             placeholder={placeholder}
//             name="skill"
//             className="w-full other-input border border-black"
//             value={skill}
//             onChange={(e) => handleSkills(e, index, skillType)}
//           />
//         </div>
//       ))}
//       <FormButton
//         size={resumeData[skillType].length}
//         add={addSkill}
//         remove={removeSkill}
//       />
//     </div>
//   );
// };

// export default Language;

// import React, { useContext } from "react";
// import { ResumeContext } from "../../pages/builder";
// import FormButton from "./FormButton";

// const Language = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);
//   const skillType = "languages";
//   const title = "Languages";

//   const languageOptions = [
//     "English",
//     "Spanish",
//     "French",
//     "German",
//     "Mandarin Chinese",
//     "Japanese",
//     "Hindi",
//     "Arabic",
//     "Portuguese",
//     "Russian",
//     "Italian",
//     "Korean",
//     "Other",
//   ];

//   const proficiencyOptions = [
//     "Native",
//     "Beginner (A1)",
//     "Elementary (A2)",
//     "Intermediate (B1)",
//     "Upper Intermediate (B2)",
//     "Advanced (C1)",
//     "Proficient (C2)",
//   ];

//   const handleSkills = (e, index, field) => {
//     const newSkills = [...resumeData[skillType]];
//     newSkills[index] = { ...newSkills[index], [field]: e.target.value };
//     setResumeData({ ...resumeData, [skillType]: newSkills });
//   };

//   const addSkill = () => {
//     setResumeData({
//       ...resumeData,
//       [skillType]: [
//         ...(resumeData[skillType] || []),
//         { language: "", proficiency: "" },
//       ],
//     });
//   };

//   const removeSkill = () => {
//     const newSkills = [...(resumeData[skillType] || [])];
//     newSkills.pop();
//     setResumeData({ ...resumeData, [skillType]: newSkills });
//   };

//   return (
//     <div className="flex-col-gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-white text-3xl">{title}</h2>
//       <p className="text-gray-400 text-sm mb-4">
//         If you are proficient in one or more languages, mention them in this
//         section.
//       </p>
//       {resumeData[skillType]?.length > 0 ? (
//         resumeData[skillType].map((skill, index) => (
//           <div key={index} className="flex d-flex justify-between mb-4">
//             <div>
//               <label className="block text-sm font-medium text-white">
//                 {index === 0 ? "First Language" : "Language"}
//               </label>
//               <select
//                 className="w-full other-input border border-black mb-2"
//                 value={skill.language}
//                 onChange={(e) => handleSkills(e, index, "language")}
//               >
//                 <option value="" disabled>
//                   Select Language
//                 </option>
//                 {languageOptions.map((lang, i) => (
//                   <option key={i} value={lang}>
//                     {lang}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-white">
//                 Proficiency
//               </label>
//               <select
//                 className="w-full other-input border border-black"
//                 value={skill.proficiency}
//                 onChange={(e) => handleSkills(e, index, "proficiency")}
//               >
//                 <option value="" disabled>
//                   Select Proficiency
//                 </option>
//                 {proficiencyOptions.map((level, i) => (
//                   <option key={i} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-white">
//           No languages added. Add a new language to get started.
//         </p>
//       )}
//       <FormButton
//         size={resumeData[skillType]?.length || 0}
//         add={addSkill}
//         remove={removeSkill}
//       />
//     </div>
//   );
// };

// export default Language;

import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import FormButton from "./FormButton";

const Language = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const skillType = "languages";
  const title = "Languages";

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin Chinese",
    "Japanese",
    "Hindi",
    "Arabic",
    "Portuguese",
    "Russian",
    "Italian",
    "Korean",
    "Other",
  ];

  const proficiencyOptions = [
    "Native",
    "Beginner (A1)",
    "Elementary (A2)",
    "Intermediate (B1)",
    "Upper Intermediate (B2)",
    "Advanced (C1)",
    "Proficient (C2)",
  ];

  const handleSkills = (e, index, field) => {
    const newSkills = [...resumeData[skillType]];
    newSkills[index] = { ...newSkills[index], [field]: e.target.value };
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      [skillType]: [
        ...(resumeData[skillType] || []),
        { language: "", proficiency: "" },
      ],
    });
  };

  const removeSkill = () => {
    const newSkills = [...(resumeData[skillType] || [])];
    newSkills.pop();
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  return (
    <div className="flex-col-gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl">{title}</h2>
      <p className="text-gray-400 text-sm mb-4">
        If you are proficient in one or more languages, mention them in this
        section.
      </p>
      {resumeData[skillType]?.length > 0 ? (
        resumeData[skillType].map((skill, index) => (
          <div key={index} className="flex justify-between mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-white">
                {index === 0 ? "First Language" : "Language"}
              </label>
              <select
                className="w-full other-input border border-black mb-2"
                value={skill.language}
                onChange={(e) => handleSkills(e, index, "language")}
              >
                <option value="" disabled>
                  Select Language
                </option>
                {languageOptions.map((lang, i) => (
                  <option key={i} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-white">
                Proficiency
              </label>
              <select
                className="w-full other-input border border-black"
                value={skill.proficiency}
                onChange={(e) => handleSkills(e, index, "proficiency")}
              >
                <option value="" disabled>
                  Select Proficiency
                </option>
                {index === 0 ? (
                  <option value="Native">Native</option>
                ) : (
                  proficiencyOptions.map((level, i) => (
                    <option key={i} value={level}>
                      {level}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">
          No languages added. Add a new language to get started.
        </p>
      )}
      <FormButton
        size={resumeData[skillType]?.length || 0}
        add={addSkill}
        remove={removeSkill}
      />
    </div>
  );
};

export default Language;
