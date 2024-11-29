import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

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
          endYear: "",
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

  // Ensure resumeData.projects is defined before mapping over it
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
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              className="w-full other-input border-black border h-32"
              value={project.description}
              maxLength="250"
              onChange={(e) => handleProjects(e, index)}
            />
            <textarea
              type="text"
              placeholder="Key Achievements"
              name="keyAchievements"
              className="w-full other-input border-black border h-40"
              value={project.keyAchievements}
              onChange={(e) => handleProjects(e, index)}
            />
            <div className="flex-wrap-gap-2">
              <input
                type="date"
                placeholder="Start Year"
                name="startYear"
                className="other-input"
                value={project.startYear}
                onChange={(e) => handleProjects(e, index)}
              />
              <input
                type="date"
                placeholder="End Year"
                name="endYear"
                className="other-input"
                value={project.endYear}
                onChange={(e) => handleProjects(e, index)}
              />
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
