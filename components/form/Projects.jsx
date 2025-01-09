import FormButton from "./FormButton";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS for styling
import { ResumeContext } from "../context/ResumeContext";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Month and Year Dropdown options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: 40 }, (_, index) => 1980 + index); // Adjust the range as needed

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][e.target.name] = e.target.value;
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
          keyAchievements: "",
          startYear: "",
          startMonth: "",
          endYear: "",
          endMonth: "",
        },
      ],
    });
  };

  const removeProjects = (index) => {
    const newProjects = [...(resumeData.projects || [])];
    newProjects[index] = newProjects[newProjects.length - 1];
    newProjects.pop();
    setResumeData({ ...resumeData, projects: newProjects });
  };

  return (
    <div className="flex-col-gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl">Projects</h2>
      {resumeData.projects && resumeData.projects.length > 0 ? (
        resumeData.projects.map((project, index) => (
          <div key={index} className="f-col">
            <input
              type="text"
              placeholder="Project Name"
              name="name"
              className="w-full other-input border-black border"
              value={project.name}
              onChange={(e) => handleProjects(e, index)}
            />
            <input
              type="text"
              placeholder="Link"
              name="link"
              className="w-full other-input border-black border"
              value={project.link}
              onChange={(e) => handleProjects(e, index)}
            />
            <ReactQuill
              placeholder="Description"
              className="w-full other-input border-black border h-100 max-w-[23rem]"
              value={project.description}
              onChange={(value) =>
                handleProjects(
                  { target: { name: "description", value } },
                  index
                )
              }
              theme="snow"
              modules={{
                toolbar: [["bold", "italic", "underline"], ["clean"]],
              }}
            />
            <textarea
              type="text"
              placeholder="Key Achievements"
              name="keyAchievements"
              className="w-full other-input border-black border h-40"
              value={project.keyAchievements}
              onChange={(e) => handleProjects(e, index)}
            />
            <div className="">
              {/* Start Month and Year */}
              <label className="mt-2 text-white">Start Date</label>
              <div className="flex-wrap-gap-2">
                <select
                  name="startMonth"
                  className="other-input border-black border flex-1"
                  value={project.startMonth}
                  onChange={(e) => handleProjects(e, index)}
                >
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
                  onChange={(e) => handleProjects(e, index)}
                >
                  {years.map((year, idx) => (
                    <option key={idx} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              {/* End Month and Year */}
              <label className="mt-2 text-white">End Date</label>
              <div className="flex-wrap-gap-2">
                <select
                  name="endMonth"
                  className="other-input border-black border flex-1"
                  value={project.endMonth}
                  onChange={(e) => handleProjects(e, index)}
                >
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
                  onChange={(e) => handleProjects(e, index)}
                >
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
