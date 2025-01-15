// // const Certification = ({ title, certifications }) => {
// //   return (
// //     Array.isArray(certifications) && certifications.length > 0 && (
// //       <div>
// //         <h2 className="text-lg font-bold mb-1 ">{title}</h2>
// //         <ul className="list-disc pl-6 p-2 ">
// //           {certifications.map((certification, index) => (
// //             <li key={index}>{certification}</li>
// //           ))}
// //         </ul>
// //       </div>
// //     )
// //   );
// // };

// // export default Certification;
// const Certification = ({ title, certifications, hasBullet = true ,headerColor}) => {
//   return (
//     Array.isArray(certifications) && certifications.length > 0 && (
//       <div
//       style={{ color: headerColor }}
//       >
//         <h2 className="text-lg font-bold mb-1">{title}</h2>
//         <ul className={`pl-2 p-1  ${hasBullet ? "list-disc pl-6 p-2" : ""}`}>
//           {certifications.map((certification, index) => (
//             <li key={index}>{certification}</li>
//           ))}
//         </ul>
//       </div>
//     )
//   );
// };

// export default Certification;
import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const Certification = ({
  title,
  certifications,
  hasBullet = true,
  headerColor,
  className = "",
  itemClassNames = {},
}) =>
  {
    const {backgroundColorss} = useContext(ResumeContext)
  return (
    Array.isArray(certifications) &&
    certifications.length > 0 && (
      <div
        className={className}
      >
        <h2
          style={{
            color: `${headerColor == "black" ? `${backgroundColorss}` : headerColor}`,
            borderBottom: `2px solid ${headerColor == "black" ? `${backgroundColorss}` : headerColor}`,
          }}
          className={`text-xl font-bold mb-2 `}
        >
          {title}
        </h2>
        <ul
        style={{color: headerColor}}
          className={`pl-2 p-1 ${
            hasBullet ? "list-disc pl-6 p-2" : ""
          }`}
        >
          {certifications.map((certification, index) => (
            <li key={index} className={""}>
              {certification}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Certification;
