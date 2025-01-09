// import FormButton from "./FormButton";
// import React, { useContext } from "react";
// import { ResumeContext } from "../../pages/builder";

// const SocialMedia = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   // social media
//   const handleSocialMedia = (e, index) => {
//     const newSocialMedia = [...resumeData.socialMedia];
//     newSocialMedia[index][e.target.name] = e.target.value.replace(
//       "https://",
//       ""
//     );
//     setResumeData({ ...resumeData, socialMedia: newSocialMedia });
//   };

//   const addSocialMedia = () => {
//     setResumeData({
//       ...resumeData,
//       socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
//     });
//   };

//   const removeSocialMedia = (index) => {
//     const newSocialMedia = [...resumeData.socialMedia];
//     newSocialMedia[index] = newSocialMedia[newSocialMedia.length - 1];
//     newSocialMedia.pop();
//     setResumeData({ ...resumeData, socialMedia: newSocialMedia });
//   };

//   return (
//     <div className="flex-col flex items-center gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-white text-3xl">Social Media</h2>
//       <h2 className="input-title text-white ">
//         Please metion platform and there link
//       </h2>
//       {resumeData.socialMedia.map((socialMedia, index) => (
//         <div key={index} className="flex-wrap-gap-2">
//           <input
//             type="text"
//             placeholder="Social Media"
//             name="socialMedia"
//             className="other-input border-black bo font-semibold bg-gray-200 text-center w-full"
//             value={socialMedia.socialMedia}
//             onChange={(e) => handleSocialMedia(e, index)}
//           />
//           <input
//             type="text"
//             placeholder="Link"
//             name="link"
//             className="other-input border-black border w-full"
//             value={socialMedia.link}
//             onChange={(e) => handleSocialMedia(e, index)}
//           />
//         </div>
//       ))}
//       <FormButton
//         size={resumeData.socialMedia.length}
//         add={addSocialMedia}
//         remove={removeSocialMedia}
//       />
//     </div>
//   );
// };

// export default SocialMedia;

import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import React, { useContext } from "react";

// Social Media Platforms and Icons
const SOCIAL_MEDIA_OPTIONS = [
  { name: "GitHub", baseUrl: "https://github.com/" },
  { name: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
  { name: "Twitter", baseUrl: "https://twitter.com/" },
  { name: "Facebook", baseUrl: "https://facebook.com/" },
  { name: "Instagram", baseUrl: "https://instagram.com/" },
  { name: "Website", baseUrl: "https://" },
];

const SocialMedia = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Handle the changes in social media dropdown and URL input
  const handleSocialMedia = (e, index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index][e.target.name] = e.target.value.replace(
      "https://",
      ""
    );
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  // Handle platform selection change and set default link
  const handlePlatformChange = (index, platform) => {
    const newSocialMedia = [...resumeData.socialMedia];

    // Find the selected platform in the SOCIAL_MEDIA_OPTIONS array
    const selectedPlatform = SOCIAL_MEDIA_OPTIONS.find(
      (option) => option.name === platform
    );

    // Check if the selectedPlatform exists before trying to access baseUrl
    if (selectedPlatform) {
      newSocialMedia[index].socialMedia = platform;
      newSocialMedia[index].link = selectedPlatform.baseUrl; // Set the default link for selected platform
      setResumeData({ ...resumeData, socialMedia: newSocialMedia });
    } else {
      console.error(
        `Platform "${platform}" not found in SOCIAL_MEDIA_OPTIONS.`
      );
    }
  };

  // Add a new social media entry
  const addSocialMedia = () => {
    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
    });
  };

  // Remove a social media entry
  const removeSocialMedia = (index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia.splice(index, 1); // Remove the entry at the given index
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  return (
    <div className="flex-col flex gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl">Social Media</h2>
      <h2 className="input-title text-white">
        Please mention the platform and their link
      </h2>
      {resumeData.socialMedia.map((socialMedia, index) => (
        <div key={index} className="flex-wrap-gap-2 flex items-center gap-3">
          {/* Dropdown for selecting social media platform */}
          <select
            className="other-input border-black bg-gray-200 font-semibold text-center w-1/3"
            value={socialMedia.socialMedia || ""}
            onChange={(e) => handlePlatformChange(index, e.target.value)}
          >
            <option value="">Select </option>
            {SOCIAL_MEDIA_OPTIONS.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>

          {/* Input for the username or link */}
          <input
            type="text"
            placeholder="Username"
            name="link"
            className="other-input border-black border w-2/3"
            value={socialMedia.link.replace("https://", "")}
            onChange={(e) => handleSocialMedia(e, index)}
          />
        </div>
      ))}
      <FormButton
        size={resumeData.socialMedia.length}
        add={addSocialMedia}
        remove={removeSocialMedia}
      />
    </div>
  );
};

export default SocialMedia;
