// import FormButton from "./FormButton";
// import React, { useContext } from "react";
// import { ResumeContext } from "../../pages/builder";

// const Education = () => {
//     const { resumeData, setResumeData} = useContext(ResumeContext);

//     const handleEducation = (e, index) => {
//       const newEducation = [...resumeData.education];
//       newEducation[index][e.target.name] = e.target.value;
//       setResumeData({ ...resumeData, education: newEducation });
//     };

//     const addEducation = () => {
//       setResumeData({
//         ...resumeData,
//         education: [
//           ...resumeData.education,
//           { school: "", degree: "", startYear: "", endYear: "", location: "" },
//         ],
//       });
//     };

//     const removeEducation = (index) => {
//       const newEducation = [...resumeData.education];
//       newEducation[index] = newEducation[newEducation.length - 1];
//       newEducation.pop();
//       setResumeData({ ...resumeData, education: newEducation });
//     };

//     return (
//       <div className="flex-col gap-3 w-full mt-10 px-10">
//         <h2 className="input-title text-white  text-3xl">Education</h2>
//         {resumeData.education.map((education, index) => (
//           <div key={index} className="f-col">
//             <input
//               type="text"
//               placeholder="School"
//               name="school"
//               className="w-full other-input border-black border"
//               value={education.school}
//               onChange={(e) => handleEducation(e, index)}
//             />
//             <input
//               type="text"
//               placeholder="Degree"
//               name="degree"
//               className="w-full other-input border-black border"
//               value={education.degree}
//               onChange={(e) => handleEducation(e, index)}
//             />
//             <div className="flex-wrap-gap-2">
//               <input
//                 type="date"
//                 placeholder="Start Year"
//                 name="startYear"
//                 className="other-input border-black border flex-1"
//                 value={education.startYear}
//                 onChange={(e) => handleEducation(e, index)}
//               />
//               <input
//                 type="date"
//                 placeholder="End Year"
//                 name="endYear"
//                 className="other-input border-black border flex-1"
//                 value={education.endYear}
//                 onChange={(e) => handleEducation(e, index)}
//               />
//             </div>
//             <label className="mt-2 text-white">Location</label>
//             <input
//               type="text"
//               placeholder="Location"
//               name="location"
//               className="w-full other-input border-black border"
//               value={education.location}
//               onChange={(e) => handleEducation(e, index)}
//             />
//           </div>
//         ))}
//         <FormButton
//           size={resumeData.education.length}
//           add={addEducation}
//           remove={removeEducation}
//         />
//       </div>
//     );
//   }

// export default Education;

import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import React, { useContext } from "react";

const Education = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const handleEducation = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...resumeData.education];
    newEducation[index][name] = value;
    setResumeData({ ...resumeData, education: newEducation });
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleMonthChange = (e, index, field) => {
    const newEducation = [...resumeData.education];
    const currentDate = newEducation[index][field] || "Aug,2020";
    const [_, year] = currentDate.split(",");
    const newMonth = e.target.value;
    newEducation[index][field] = `${newMonth},${year || ""}`;
    setResumeData({ ...resumeData, education: newEducation });
  };

  const handleYearChange = (e, index, field) => {
    const newEducation = [...resumeData.education];
    const currentDate = newEducation[index][field] || "Aug,2020";
    const [month, _] = currentDate.split(",");
    const newYear = e.target.value;
    newEducation[index][field] = `${month || ""},${newYear}`;
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          school: "",
          degree: "",
          startYear: "Aug,2020",
          endYear: "Jul,2024",
          location: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...resumeData.education];
    newEducation.splice(index, 1);
    setResumeData({ ...resumeData, education: newEducation });
  };

  return (
    <div className="flex-col gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl">Education</h2>
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
          <div className="">
            <label className="text-white">Start Date</label>
            <div className="flex-wrap-gap-2">
              <select
                className="border-black border other-input  flex-1"
                value={(education.startYear || "Aug,2020").split(",")[0]}
                onChange={(e) => handleMonthChange(e, index, "startYear")}
              >
                <option value="">Month</option>
                {months.map((month, idx) => (
                  <option key={idx} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className="other-input border-black border flex-1"
                value={(education.startYear || "Aug,2020").split(",")[1]}
                onChange={(e) => handleYearChange(e, index, "startYear")}
              >
                <option value="">Year</option>
                {years.map((year, idx) => (
                  <option key={idx} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <label className="text-white">End Date</label>
            <div className="flex-wrap-gap-2">
              <select
                className="other-input border-black border flex-1"
                value={(education.endYear || "Jul,2024").split(",")[0]}
                onChange={(e) => handleMonthChange(e, index, "endYear")}
              >
                <option value="">Month</option>
                {months.map((month, idx) => (
                  <option key={idx} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className="other-input border-black border flex-1"
                value={(education.endYear || "Jul,2024").split(",")[1]}
                onChange={(e) => handleYearChange(e, index, "endYear")}
              >
                <option value="">Year</option>
                {years.map((year, idx) => (
                  <option key={idx} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
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
};

export default Education;
