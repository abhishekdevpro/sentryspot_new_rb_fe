



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
              {lang.language || "English"} ({lang.proficiency || "Native Speaker"})
            </li>
          ))}
          
        </ul>
      </div>
    )
  );
};

export default Language;
