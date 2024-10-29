// import React, { useContext } from "react";
// import { ResumeContext } from "../../pages/builder";
// import FormButton from "./FormButton";

// const Skill = ({ title }) => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   // skills
//   const handleSkill = (e, index, title) => {
//     const newSkills = [
//       ...resumeData.skills.find((skillType) => skillType.title === title)
//         ?.skills,
//     ];
//     newSkills[index] = e.target.value;
//     setResumeData((prevData) => ({
//       ...prevData,
//       skills: prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: newSkills } : skill
//       ),
//     }));
//   };

//   const addSkill = (title) => {
//     setResumeData((prevData) => {
//       const skillType = prevData.skills.find(
//         (skillType) => skillType.title === title
//       );
//       if (!skillType) return prevData;

//       const newSkills = [...skillType.skills, ""];
//       const updatedSkills = prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: newSkills } : skill
//       );
//       return {
//         ...prevData,
//         skills: updatedSkills,
//       };
//     });
//   };

//   const removeSkill = (title, index) => {
//     setResumeData((prevData) => {
//       const skillType = prevData.skills.find(
//         (skillType) => skillType.title === title
//       );
//       if (!skillType) return prevData;

//       const newSkills = [...skillType.skills];
//       newSkills.pop();
//       const updatedSkills = prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: newSkills } : skill
//       );
//       return {
//         ...prevData,
//         skills: updatedSkills,
//       };
//     });
//   };

//   const skillType = resumeData.skills.find(
//     (skillType) => skillType.title === title
//   );

//   if (!skillType || skillType.skills.length === 0) {
//     return null; // Render nothing if skillType is not found or has no skills
//   }

//   return (
//     <div className="flex-col-gap-2 mt-10">
//       <h2 className="input-title text-black text-3xl">{title}</h2>
//       {skillType.skills.map((skill, index) => (
//         <div key={index} className="f-col">
//           <input
//             type="text"
//             placeholder={title}
//             name={title}
//             className="w-full other-input border-black border"
//             value={skill}
//             onChange={(e) => handleSkill(e, index, title)}
//           />
//         </div>
//       ))}
//       <FormButton
//         size={skillType.skills.length}
//         add={() => addSkill(title)}
//         remove={() => removeSkill(title)}
//       />
//     </div>
//   );
// };

// export default Skill;
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import FormButton from "./FormButton";

const Skill = ({ title }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Handle skill change
  const handleSkill = (e, index, title) => {
    const newSkills = [
      ...resumeData.skills.find((skillType) => skillType.title === title)
        ?.skills,
    ];
    newSkills[index] = e.target.value;
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      ),
    }));
  };

  // Add new skill
  const addSkill = (title) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;

      const newSkills = [...skillType.skills, ""];
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  // Remove individual skill
  const removeSkill = (title, index) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;

      const newSkills = [...skillType.skills];
      newSkills.splice(index, 1); // Remove the skill at the specific index
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  // Remove all skills
  const removeAllSkills = (title) => {
    setResumeData((prevData) => {
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: [] } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  if (!skillType || skillType.skills.length === 0) {
    return null; // Render nothing if skillType is not found or has no skills
  }

  return (
    <div className="flex-col-gap-2 mt-10">
      <h2 className="input-title text-black text-3xl">{title}</h2>
      {skillType.skills.map((skill, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={title}
            name={title}
            className="w-full other-input border-black border"
            value={skill}
            onChange={(e) => handleSkill(e, index, title)}
          />
          <button
            type="button"
            onClick={() => removeSkill(title, index)}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete skill"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
      <div className="flex space-x-4">
        <FormButton
          size={skillType.skills.length}
          add={() => addSkill(title)}
        />
        <button
          type="button"
          onClick={() => removeAllSkills(title)}
          className="text-red-600 hover:text-red-800"
          aria-label="Delete all skills"
        >
          Delete All Skills
        </button>
      </div>
    </div>
  );
};

export default Skill;
