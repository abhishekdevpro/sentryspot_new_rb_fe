// // const Language = ({ title, languages }) => {
// //   return (
// //     Array.isArray(languages) && languages.length > 0 && (
// //       <div>
// //         <h2 className="text-lg font-bold mb-1 ">
// //           {title}
// //         </h2>
// //         {/* <p className="">{languages.join(", ")}</p> */}
// //         <p className="sub-content">
// //           {languages
// //             .map((lang) =>
// //               typeof lang === "object"
// //                 ? `${lang.language} - (${lang.proficiency})`
// //                 : lang
// //             )
// //             .join(", ")}
// //         </p>
// //       </div>
// //     )
// //   );
// // };

// // export default Language;





// import React from "react";

// const Language = ({ title, languages, className = "",
//   style = {},
//   itemClassNames = {},headerColor  }) => {
//   return (
//     languages?.length > 0 && (
//       <div className={` ${className}`} style={style}>
//         <h2 
//           style={{ color: headerColor }}
//         className={`${itemClassNames.title || ""}`}>{title}</h2>
//         <p 
//           style={{ color: headerColor }}
//         className={` ${itemClassNames.language || ""}`}>
//           {languages
//             .map(
//               (lang) =>
//                 `${lang.language || "English" || "Hindi"} (${lang.proficiency || "N/A"})`
             
//             )
//             .join(", ")}
//         </p>

//       </div>
//     )
//   );
// };

// export default Language;
// import React from "react";

// const Language = ({
//   title,
//   languages,
//   className = "",
//   style = {},
//   itemClassNames = {},
//   headerColor,
// }) => {
//   return (
//     languages?.length > 0 && (
//       <div className={` ${className}`}  style={{ color: headerColor }}>
//         <h2
//           style={{ color: headerColor }}
//           className={` text-xl font-bold ${itemClassNames.title || ""}`}
//         >
//           {title}
//         </h2>
//         <ul className={`list-disc ml-6 ${itemClassNames.language || ""}`}>
//           {languages.map((lang, index) => (
//             <li key={index}>
//               {lang.language || "English"} ({lang.proficiency || "N/A"})
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   );
// };

// export default Language;
import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const Language = ({ title, languages, headerColor }) => {

  const {backgroundColorss} = useContext(ResumeContext)
  return (
    languages?.length > 0 && (
      <div>
        {/* Title */}
        {title && (
          <h2 style={{
            color: `${headerColor == "black" ? `${backgroundColorss}` : headerColor}`,
            borderBottom: `2px solid ${headerColor == "black" ? `${backgroundColorss}` : headerColor}`,
          }}
           className="text-xl font-bold mb-2">
            {title}
          </h2>
        )}
        {/* Languages List */}
        <ul 
         style={{color: headerColor}}
        className="list-disc ml-6">
          {languages.map((lang, index) => (
            <li key={index}>
              {lang.language || "English"} ({lang.proficiency || "N/A"})
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Language;
