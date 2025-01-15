// import React, { useContext } from "react";
// import { ResumeContext } from "../context/ResumeContext";

// const PersonalInformation = () => {
//   const { resumeData, setResumeData, handleProfilePicture, handleChange,resumeStrength } =
//     useContext(ResumeContext);

//     console.log(resumeStrength,"resumeStrength")

//   const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

//   return (
//     <div className="flex-col flex gap-3 w-full items-center mt-10 px-10">
//       <h2 className="input-title text-2xl md:text-3xl font-semibold text-white">
//         Detail Information
//       </h2>

//       <div className="flex flex-col  items-center gap-6 w-full ">
//         <div className="flex flex-col items-center gap-4">
//           <img
//             src={resumeData.profilePicture || dummyImage}
//             alt="Profile"
//             className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
//           />
//           <input
//             type="file"
//             name="profileImage"
//             accept="image/*"
//             className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md"
//             onChange={handleProfilePicture}
//             placeholder="Profile Picture"
//           />
//         </div>

//         <div className="flex flex-col gap-4 w-full">
//           <input
//             type="text"
//             placeholder="Full Name"
//             name="name"
//             className="w-full p-2 border border-black rounded-md"
//             value={resumeData.name}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             placeholder="Job Title"
//             name="position"
//             className="w-full p-2 border border-black rounded-md"
//             value={resumeData.position}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             placeholder="Contact Information"
//             name="contactInformation"
//             className="w-full p-2 border border-black rounded-md"
//             value={resumeData.contactInformation}
//             onChange={handleChange}
//             minLength="10"
//             maxLength="15"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             className="w-full p-2 border border-black rounded-md"
//             value={resumeData.email}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             placeholder="Address"
//             name="address"
//             className="w-full p-2 border border-black rounded-md"
//             value={resumeData.address}
//             onChange={handleChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInformation;
import React, { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { AlertCircle } from "lucide-react";

const PersonalInformation = () => {
  const {
    resumeData,
    setResumeData,
    handleProfilePicture,
    handleChange,
    resumeStrength,
  } = useContext(ResumeContext);

  const [activeTooltip, setActiveTooltip] = useState(null);

  const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

  const hasErrors = (field) => {
    const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
    return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  };

  const getSuggestions = (field) => {
    return resumeStrength?.personal_info_strenght?.[field] || [];
  };

  const formFields = [
    { field: "name", placeholder: "Full Name" },
    { field: "position", placeholder: "Job Title" },
    { field: "contactInformation", placeholder: "Contact Information" },
    { field: "email", placeholder: "Email" },
    { field: "address", placeholder: "Address" },
  ];

  return (
    <div className="flex flex-col gap-3 w-full items-center mt-10 px-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white">
        Detail Information
      </h2>

      <div className="flex flex-col items-center gap-6 w-full">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={resumeData.profilePicture || dummyImage}
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
          />
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
            onChange={handleProfilePicture}
          />
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 w-full max-w-xl">
          {formFields.map(({ field, placeholder }) => (
            <div key={field} className="relative group">
              <div className="flex items-center relative">
                <input
                  type={field === "email" ? "email" : "text"}
                  placeholder={placeholder}
                  name={field}
                  className={`w-full p-2 border rounded-md outline-none transition-colors
                    ${hasErrors(field) 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-300 focus:border-blue-500'
                    }`}
                  value={resumeData[field] || ''}
                  onChange={handleChange}
                />
                {hasErrors(field) && (
                  <button
                    type="button"
                    className="absolute right-2 text-red-500 hover:text-red-600 transition-colors"
                    onClick={() => setActiveTooltip(activeTooltip === field ? null : field)}
                    aria-label="Show suggestions"
                  >
                    <AlertCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {/* Enhanced Suggestions Tooltip */}
              {activeTooltip === field && hasErrors(field) && (
                <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ease-in-out">
                  <div className="relative">
                    {/* Red header bar */}
                    
                    
                    {/* Suggestions content */}
                    <div className="p-4">
                      {getSuggestions(field).map((suggestion, index) => (
                        <div key={index} className="text-gray-700 text-sm mb-2 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Dismiss button */}
                    <div className="border-t border-gray-100 px-2 flex justify-end">
                      <button
                        onClick={() => setActiveTooltip(null)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;