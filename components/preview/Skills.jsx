// // import React, { useContext } from "react";
// // import { ResumeContext } from "../context/ResumeContext";
// // // import { ResumeContext } from "../../pages/builder";

// // const Skills = ({ title, skills, color }) => {
// //   const { resumeData, setResumeData} = useContext(ResumeContext);

// //   const handleTitleChange = (e) => {
// //     const newSkills = [...resumeData.skills];
// //     newSkills.find((skillType) => skillType.title === title).title = e.target.innerText;
// //     setResumeData({ ...resumeData, skills: newSkills });
// //   };
// // // console.log(color,"llll");
// //   return (
// //     skills.length > 0 && (
// //       <>
// //         <h2
// //          style={{ color: color }}
// //         className="text-md font-semibold mb-1  editable " contentEditable suppressContentEditableWarning onBlur={handleTitleChange}>
// //           {title}
// //         </h2>
// //         <p
// //          style={{ color: color }}
// //         className="" >{skills.join(", ")}</p>
// //       </>
// //     )
// //   );
// // };

// // export default Skills;

// // // import React, { useContext } from "react";
// // // import { ResumeContext } from "../context/ResumeContext";

// // // const Skills = ({ title, skills }) => {
// // //   const { resumeData, setResumeData } = useContext(ResumeContext);

// // //   const handleTitleChange = (e) => {
// // //     const newSkills = [...resumeData.skills];
// // //     const skillType = newSkills.find((skillType) => skillType.title === title);
// // //     if (skillType) {
// // //       skillType.title = e.target.innerText;
// // //     }
// // //     setResumeData({ ...resumeData, skills: newSkills });
// // //   };

// // //   return (
// // //     skills.length > 0 && (
// // //       <div className="skills-section">
// // //         <h2
// // //           className="text-md font-semibold mb-2 editable"
// // //           contentEditable
// // //           suppressContentEditableWarning
// // //           onBlur={handleTitleChange}
// // //         >
// // //           {title}
// // //         </h2>
// // //         <ul className="list-disc ml-6">
// // //           {skills.map((skill, index) => (
// // //             <li key={index} className="text-sm">
// // //               {skill}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       </div>
// // //     )
// // //   );
// // // };

// // // export default Skills;


// import React, { useContext } from "react";
// import { ResumeContext } from "../context/ResumeContext";

// const Skills = ({ title, skills, color="black", layout }) => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   const handleTitleChange = (e) => {
//     const newSkills = [...resumeData.skills];
//     const skillType = newSkills.find((skillType) => skillType.title === title);
//     if (skillType) {
//       skillType.title = e.target.innerText;
//     }
//     setResumeData({ ...resumeData, skills: newSkills });
//   };
// console.log(color,"jhhj");

//   // const newColor = color === "black" ? "white" : "black";

//   return (
//     skills.length > 0 && (
//       <div className="">
//         <h2
//           style={{ color: color }}
//           className="text-md font-semibold mb-2 editable"
//           contentEditable
//           suppressContentEditableWarning
//           onBlur={handleTitleChange}
//         >
//           {title}
//         </h2>
//         {layout === "row" ? (
//           <div
//             style={{ color: color }}
//             className=""
//           >
//             {skills.join(", ")}
//           </div>
//         ) : (
//           <ul
//             style={{ color: color }}
//             className="list-disc ml-6"
//           >
//             {skills.map((skill, index) => (
//               <li key={index} className="">
//                 {skill}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     )
//   );
// };

// // export default Skills;

import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const Skills = ({ title, skills, color = "black", layout }) => {
  const { resumeData, setResumeData, backgroundColorss } = useContext(ResumeContext);
   console.log(backgroundColorss,"backgroundColorss");
  const handleTitleChange = (e) => {
    const newSkills = [...resumeData.skills];
    const skillType = newSkills.find((skillType) => skillType.title === title);
    if (skillType) {
      skillType.title = e.target.innerText;
    }
    setResumeData({ ...resumeData, skills: newSkills });
  };

  return (
    skills.length > 0 && (
      <div className="">
        <h2
           style={{
            color: layout === "row" || !backgroundColorss ? "black" : color,
          }}
          className="text-md font-semibold mb-2 editable"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
        >
          {title}
        </h2>
        {layout === "row"  ? (
          <div
            style={{ color: "black" }} // Explicitly set color to black for row layout
            className=""
          >
            {skills.join(", ")}
          </div>
        ) : (
          <ul
            style={{ color: backgroundColorss? color:"black" }}
            className="list-disc ml-6"
          >
            {skills.map((skill, index) => (
              <li key={index} className="">
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  );
};

export default Skills;
