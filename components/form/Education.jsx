import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";

const Education = () => {
    const { resumeData, setResumeData} = useContext(ResumeContext);

    const handleEducation = (e, index) => {
      const newEducation = [...resumeData.education];
      newEducation[index][e.target.name] = e.target.value;
      setResumeData({ ...resumeData, education: newEducation });
    };
  
    const addEducation = () => {
      setResumeData({
        ...resumeData,
        education: [
          ...resumeData.education,
          { school: "", degree: "", startYear: "", endYear: "", location: "" },
        ],
      });
    };

    const removeEducation = (index) => {
      const newEducation = [...resumeData.education];
      newEducation[index] = newEducation[newEducation.length - 1];
      newEducation.pop();
      setResumeData({ ...resumeData, education: newEducation });
    };

    return (
      <div className="flex-col gap-3 w-full mt-10 px-10">
        <h2 className="input-title text-white  text-3xl">Education</h2>
        {resumeData.education.map((education, index) => (
          <div key={index} className="f-col">
            <input
              type="text"
              placeholder="School"
              name="school"
              className="w-full other-input border-black border"
              value={education.school}
              onChange={(e) => handleEducation(e, index)}
            />
            <input
              type="text"
              placeholder="Degree"
              name="degree"
              className="w-full other-input border-black border"
              value={education.degree}
              onChange={(e) => handleEducation(e, index)}
            />
            <div className="flex-wrap-gap-2">
              <input
                type="date"
                placeholder="Start Year"
                name="startYear"
                className="other-input border-black border flex-1"
                value={education.startYear}
                onChange={(e) => handleEducation(e, index)}
              />
              <input
                type="date"
                placeholder="End Year"
                name="endYear"
                className="other-input border-black border flex-1"
                value={education.endYear}
                onChange={(e) => handleEducation(e, index)}
              />
            </div>
            <label className="mt-2 text-white">Location</label>
            <input
              type="text"
              placeholder="Location"
              name="location"
              className="w-full other-input border-black border"
              value={education.location}
              onChange={(e) => handleEducation(e, index)}
            />
          </div>
        ))}
        <FormButton
          size={resumeData.education.length}
          add={addEducation}
          remove={removeEducation}
        />
      </div>
    );
  }

export default Education;