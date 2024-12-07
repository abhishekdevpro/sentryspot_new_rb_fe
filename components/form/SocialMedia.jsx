import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";

const SocialMedia = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // social media
  const handleSocialMedia = (e, index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index][e.target.name] = e.target.value.replace(
      "https://",
      ""
    );
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  const addSocialMedia = () => {
    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
    });
  };

  const removeSocialMedia = (index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index] = newSocialMedia[newSocialMedia.length - 1];
    newSocialMedia.pop();
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  return (
    <div className="flex-col flex items-center gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl">Social Media</h2>
      <h2 className="input-title text-white ">
        Please metion platform and there link
      </h2>
      {resumeData.socialMedia.map((socialMedia, index) => (
        <div key={index} className="flex-wrap-gap-2">
          <input
            type="text"
            placeholder="Social Media"
            name="socialMedia"
            className="other-input border-black bo font-semibold bg-gray-200 text-center w-full"
            value={socialMedia.socialMedia}
            onChange={(e) => handleSocialMedia(e, index)}
          />
          <input
            type="text"
            placeholder="Link"
            name="link"
            className="other-input border-black border w-full"
            value={socialMedia.link}
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
