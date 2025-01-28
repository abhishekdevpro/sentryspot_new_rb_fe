// import FormButton from "./FormButton";
// import React, { useContext } from "react";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css"; // Import Quill CSS for styling
// import { ResumeContext } from "../context/ResumeContext";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const Projects = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   // Month and Year Dropdown options
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const years = Array.from({ length: 40 }, (_, index) => 1980 + index); // Adjust the range as needed

//   const handleProjects = (e, index) => {
//     const newProjects = [...resumeData.projects];
//     newProjects[index][e.target.name] = e.target.value;
//     setResumeData({ ...resumeData, projects: newProjects });
//   };

//   const addProjects = () => {
//     setResumeData({
//       ...resumeData,
//       projects: [
//         ...(resumeData.projects || []),
//         {
//           title: "",
//           link: "",
//           description: "",
//           keyAchievements: [],
//           startYear: "",
//           startMonth: "",
//           endYear: "",
//           endMonth: "",
//         },
//       ],
//     });
//   };

//   const removeProjects = (index) => {
//     const newProjects = [...(resumeData.projects || [])];
//     newProjects[index] = newProjects[newProjects.length - 1];
//     newProjects.pop();
//     setResumeData({ ...resumeData, projects: newProjects });
//   };
//   console.log(resumeData.projects,"lll");

//   return (
//     <div className="flex-col-gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-white text-3xl">Projects</h2>
//       {resumeData.projects && resumeData.projects.length > 0 ? (
//         resumeData.projects.map((project, index) => (
//           <div key={index} className="f-col">
//             <input
//               type="text"
//               placeholder="Project Name"
//               name="name"
//               className="w-full other-input border-black border"
//               value={project.name}
//               onChange={(e) => handleProjects(e, index)}
//             />
//             <input
//               type="text"
//               placeholder="Link"
//               name="link"
//               className="w-full other-input border-black border"
//               value={project.link}
//               onChange={(e) => handleProjects(e, index)}
//             />
//             {/* <ReactQuill
//               placeholder="Describe your project in 2-3 sentences. Include details like the project's purpose, your role, and the technologies/tools used. "
//               className="w-full other-input border-black border h-100 max-w-[33rem]"
//               value={project.description}
//               onChange={(value) =>
//                 handleProjects(
//                   { target: { name: "description", value } },
//                   index
//                 )
//               }
//               theme="snow"
//               modules={{
//                 toolbar: [["bold", "italic", "underline"], ["clean"]],
//               }}
//             /> */}
//             <textarea
//   placeholder="Describe your project in 2-3 sentences. Include details like the project's purpose, your role, and the technologies/tools used."
//   className="w-full other-input border-black border h-100 max-w-[33rem] p-2"
//   value={project.description}
//   onChange={(e) =>
//     handleProjects(
//       { target: { name: "description", value: e.target.value } },
//       index
//     )
//   }
// />

//             <textarea
//               type="text"
//               placeholder="Key Achievement or KRA (Key Result Area)"
//               name="keyAchievements"
//               className="w-full other-input border-black border h-40"
//               value={project.keyAchievements}
//               onChange={(e) => handleProjects(e, index)}
//             />
//             <div className="">
//               {/* Start Month and Year */}
//               <label className="mt-2 text-white">Start Date</label>
//               <div className="flex-wrap-gap-2">
//                 <select
//                   name="startMonth"
//                   className="other-input border-black border flex-1"
//                   value={project.startMonth}
//                   onChange={(e) => handleProjects(e, index)}
//                 >
//                   {months.map((month, idx) => (
//                     <option key={idx} value={month}>
//                       {month}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   name="startYear"
//                   className="other-input border-black border flex-1"
//                   value={project.startYear}
//                   onChange={(e) => handleProjects(e, index)}
//                 >
//                   {years.map((year, idx) => (
//                     <option key={idx} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {/* End Month and Year */}
//               <label className="mt-2 text-white">End Date</label>
//               <div className="flex-wrap-gap-2">
//                 <select
//                   name="endMonth"
//                   className="other-input border-black border flex-1"
//                   value={project.endMonth}
//                   onChange={(e) => handleProjects(e, index)}
//                 >
//                   {months.map((month, idx) => (
//                     <option key={idx} value={month}>
//                       {month}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   name="endYear"
//                   className="other-input border-black border flex-1"
//                   value={project.endYear}
//                   onChange={(e) => handleProjects(e, index)}
//                 >
//                   {years.map((year, idx) => (
//                     <option key={idx} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-white">
//           No projects available. Add a new project to get started.
//         </p>
//       )}
//       <FormButton
//         size={resumeData.projects ? resumeData.projects.length : 0}
//         add={addProjects}
//         remove={removeProjects}
//       />
//     </div>
//   );
// };

// export default Projects;


import FormButton from "./FormButton";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ResumeContext } from "../context/ResumeContext";
import { Trash } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const years = Array.from({ length: 40 }, (_, index) => 1980 + index);

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const handleKeyAchievement = (e, projectIndex, achievementIndex) => {
    const newProjects = [...resumeData.projects];
    if (!Array.isArray(newProjects[projectIndex].keyAchievements)) {
      newProjects[projectIndex].keyAchievements = [];
    }
    newProjects[projectIndex].keyAchievements[achievementIndex] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addKeyAchievement = (projectIndex) => {
    const newProjects = [...resumeData.projects];
    if (!Array.isArray(newProjects[projectIndex].keyAchievements)) {
      newProjects[projectIndex].keyAchievements = [];
    }
    newProjects[projectIndex].keyAchievements.push("");
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const removeKeyAchievement = (projectIndex, achievementIndex) => {
    const newProjects = [...resumeData.projects];
    newProjects[projectIndex].keyAchievements.splice(achievementIndex, 1);
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...(resumeData.projects || []),
        {
          title: "",
          link: "",
          description: "",
          keyAchievements: [""], // Initialize with one empty achievement
          startYear: "",
          startMonth: "",
          endYear: "",
          endMonth: "",
          name: "",
        },
      ],
    });
  };

  const removeProjects = (index) => {
    const newProjects = [...(resumeData.projects || [])];
    newProjects.splice(index, 1);
    setResumeData({ ...resumeData, projects: newProjects });
  };

  return (
    <div className="flex-col-gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl">Projects</h2>
      {resumeData.projects && resumeData.projects.length > 0 ? (
        resumeData.projects.map((project, projectIndex) => (
          <div key={projectIndex} className="f-col">
            <input
              type="text"
              placeholder="Project Name"
              name="name"
              className="w-full other-input border-black border"
              value={project.name}
              onChange={(e) => handleProjects(e, projectIndex)}
            />
            <input
              type="text"
              placeholder="Link"
              name="link"
              className="w-full other-input border-black border"
              value={project.link}
              onChange={(e) => handleProjects(e, projectIndex)}
            />
            <textarea
              placeholder="Describe your project in 2-3 sentences. Include details like the project's purpose, your role, and the technologies/tools used."
              className="w-full other-input border-black border h-100 max-w-[33rem] p-2"
              value={project.description}
              onChange={(e) =>
                handleProjects(
                  { target: { name: "description", value: e.target.value } },
                  projectIndex
                )
              }
            />

            {/* Key Achievements Section */}
            <div className="mt-4">
              <label className="text-white mb-2 block">Key Achievements</label>
              {Array.isArray(project.keyAchievements) && project.keyAchievements.map((achievement, achievementIndex) => (
                <div key={achievementIndex} className="flex gap-2 mb-2">
                  <textarea
                    placeholder="Enter key achievement"
                    className="w-full other-input border-black border p-2"
                    value={achievement}
                    onChange={(e) => handleKeyAchievement(e, projectIndex, achievementIndex)}
                  />
                  <button
                    onClick={() => removeKeyAchievement(projectIndex, achievementIndex)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    type="button"
                  >
                   <Trash />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addKeyAchievement(projectIndex)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                type="button"
              >
                Add Achievement
              </button>
            </div>

            <div className="">
              <label className="mt-2 text-white">Start Date</label>
              <div className="flex-wrap-gap-2">
                <select
                  name="startMonth"
                  className="other-input border-black border flex-1"
                  value={project.startMonth}
                  onChange={(e) => handleProjects(e, projectIndex)}
                >
                  <option value="">Select Month</option>
                  {months.map((month, idx) => (
                    <option key={idx} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="startYear"
                  className="other-input border-black border flex-1"
                  value={project.startYear}
                  onChange={(e) => handleProjects(e, projectIndex)}
                >
                  <option value="">Select Year</option>
                  {years.map((year, idx) => (
                    <option key={idx} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              
              <label className="mt-2 text-white">End Date</label>
              <div className="flex-wrap-gap-2">
                <select
                  name="endMonth"
                  className="other-input border-black border flex-1"
                  value={project.endMonth}
                  onChange={(e) => handleProjects(e, projectIndex)}
                >
                  <option value="">Select Month</option>
                  {months.map((month, idx) => (
                    <option key={idx} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="endYear"
                  className="other-input border-black border flex-1"
                  value={project.endYear}
                  onChange={(e) => handleProjects(e, projectIndex)}
                >
                  <option value="">Select Year</option>
                  {years.map((year, idx) => (
                    <option key={idx} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">
          No projects available. Add a new project to get started.
        </p>
      )}
      <FormButton
        size={resumeData.projects ? resumeData.projects.length : 0}
        add={addProjects}
        remove={removeProjects}
      />
    </div>
  );
};

export default Projects;