import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";

const PersonalInformation = ({}) => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  // Default dummy image URL (can be replaced with any placeholder image)
  const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s"; // URL to the dummy image

  return (
    <div className="flex-col-gap-2 justify-center">
      <h2 className="input-title text-black text-3xl">Detail Information</h2>
      <div className="">

        {/* Display either the uploaded image or a dummy image */}
        <div className="  profile-picture-container  gap-10 px-10  ">
          <img
            src={resumeData.profilePicture || dummyImage} // Display dummy image if no profile picture
            alt="Profile"
            className="profile-picture bg-gray-300 rounded-lg"
            style={{ width: "110px", height: "110px", objectFit: "cover" }}
          />
       
        {/* Upload input for profile picture */}
        <div className="mt-10">
      
        </div>
 </div>
 
 
<div className="flex-col  justify-center">
<input
          type="file"
          name="profileImage"
          accept="image/*"
          className="profileInput bg-gray-300 text-white border-black border"
          onChange={handleProfilePicture}
          placeholder="Profile Picture"
        />
<input
          type="text"
          placeholder="Full Name"
          name="name"
          className="pi m-2 border-black border"
          value={resumeData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Job Title"
          name="position"
          className="pi m-2 border-black border "
          value={resumeData.position}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Contact Information"
          name="contactInformation"
          className="pi m-2 border-black border"
          value={resumeData.contactInformation}
          onChange={handleChange}
          minLength="10"
          maxLength="15"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="pi m-2 border-black border"
          value={resumeData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          className="pi m-2 border-black border"
          value={resumeData.address}
          onChange={handleChange}
        />
        
</div>
      </div>
    </div>
  );
};

export default PersonalInformation;
