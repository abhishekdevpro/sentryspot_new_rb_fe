
import React, { useContext, useState, useEffect } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { AlertCircle, X, Loader2 } from "lucide-react";
import { useRouter } from "next/router";

const PersonalInformation = () => {
  const {
    resumeData,
    setResumeData,
    handleProfilePicture,
    handleChange,
    resumeStrength,
  } = useContext(ResumeContext);
  const router = useRouter();
  const { improve } = router.query;

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState({
    jobTitle: false,
    location: false
  });

  const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

  const fetchJobTitles = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setJobTitleSuggestions([]);
      return;
    }
    
    setIsLoading((prev) => ({ ...prev, jobTitle: true }));
    try {
      const response = await fetch(
        `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(keyword)}`
      );
      if (response.ok) {
        const data = await response.json();
        const jobTitles = data.data.map((item) => item.name);
        setJobTitleSuggestions(jobTitles);
        setShowJobTitleDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching job titles:", error);
    }
    setIsLoading((prev) => ({ ...prev, jobTitle: false }));
  };

  const fetchLocations = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setLocationSuggestions([]);
      return;
    }
    
    setIsLoading((prev) => ({ ...prev, location: true }));
    try {
      const response = await fetch(
        `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${encodeURIComponent(keyword)}`
      );
      if (response.ok) {
        const data = await response.json();
        const locations = data.data.location_names.map((item) => item);
        setLocationSuggestions(locations);
        setShowLocationDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
    setIsLoading((prev) => ({ ...prev, location: false }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);
    
    if (name === 'position') {
      fetchJobTitles(value);
    } else if (name === 'address') {
      fetchLocations(value);
    }
  };

  const selectSuggestion = (field, value) => {
    const event = {
      target: { name: field, value }
    };
    handleChange(event);
    if (field === 'position') {
      setShowJobTitleDropdown(false);
    } else {
      setShowLocationDropdown(false);
    }
  };

  const hasErrors = (field) => {
    const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
    return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  };

  const getSuggestions = (field) => {
    return resumeStrength?.personal_info_strenght?.[field] || [];
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowJobTitleDropdown(false);
      setShowLocationDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const formFields = [
    { field: "name", placeholder: "Full Name", type: "text" },
    { field: "position", placeholder: "Job Title", type: "text", hasSuggestions: true },
    { field: "contactInformation", placeholder: "Contact Information", type: "text" },
    { field: "email", placeholder: "Email", type: "email" },
    { field: "address", placeholder: "Address", type: "text", hasSuggestions: true },
  ];

  return (
    <div className="flex flex-col gap-3 w-full items-center md:mt-10 p-4 md:px-10">
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
          {formFields.map(({ field, placeholder, type, hasSuggestions }) => (
            <div key={field} className="relative group" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center relative">
                <input
                  type={type}
                  placeholder={placeholder}
                  name={field}
                  className={`w-full p-2 border rounded-md outline-none transition-colors
                    ${improve && hasErrors(field) 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-300 focus:border-blue-500'
                    }`}
                  value={resumeData[field] || ''}
                  onChange={handleInputChange}
                  onFocus={() => {
                    if (field === 'position') setShowJobTitleDropdown(true);
                    if (field === 'address') setShowLocationDropdown(true);
                  }}
                />
                {improve && hasErrors(field) && (
                  <button
                    type="button"
                    className="absolute right-2 text-red-500 hover:text-red-600 transition-colors"
                    onClick={() => setActiveTooltip(activeTooltip === field ? null : field)}
                    aria-label="Show suggestions"
                  >
                    <AlertCircle className="w-5 h-5" />
                  </button>
                )}
                {hasSuggestions && isLoading[field === 'position' ? 'jobTitle' : 'location'] && (
                  <div className="absolute right-2">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Suggestions Dropdown */}
              {hasSuggestions && (
                (field === 'position' ? showJobTitleDropdown && jobTitleSuggestions.length > 0 
                  : showLocationDropdown && locationSuggestions.length > 0) && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {(field === 'position' ? jobTitleSuggestions : locationSuggestions).map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                        onClick={() => selectSuggestion(field, suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Error Tooltip */}
              {activeTooltip === field && hasErrors(field) && (
                <div className="absolute z-50 left-8 mt-10 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="font-medium text-black">Contact Suggestions</span>
                      </div>
                      <button
                        onClick={() => setActiveTooltip(null)}
                        className="text-black transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    {getSuggestions(field).map((msg, i) => (
                      <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                        <p className="text-black text-sm">{msg}</p>
                      </div>
                    ))}
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