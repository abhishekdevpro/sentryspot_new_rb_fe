

import React, { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import { AlertCircle, X } from "lucide-react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WorkExperience = () => {
  const { resumeData, setResumeData, resumeStrength } = useContext(ResumeContext);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isLoading, setIsLoading] = useState({ location: false });
  const [error, setError] = useState("");
  const [summaries, setSummaries] = useState([]);
  const [selectedSummaries, setSelectedSummaries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const token = localStorage.getItem("token");
  const router = useRouter();
  const { improve } = router.query;

  const handleWorkExperience = (e, index) => {
    const { name, value } = e.target;
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index][name] = value;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });

    // If the field is location, fetch location suggestions
    if (name === "location") {
      fetchLocations(value);
    }
  };

  const fetchLocations = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setLocationSuggestions([]);
      return;
    }

    setIsLoading(prev => ({ ...prev, location: true }));
    try {
      const response = await fetch(
        `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${encodeURIComponent(keyword)}`
      );
      if (response.ok) {
        const data = await response.json();
        const locations = data.data.countries.map((item) => item.name);
        setLocationSuggestions(locations);
        setShowLocationDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
    setIsLoading(prev => ({ ...prev, location: false }));
  };

  const handleLocationSelect = (location, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].location = location;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
    setLocationSuggestions([]);
    setShowLocationDropdown(false);
  };

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleMonthChange = (e, index, field) => {
    const newWorkExperience = [...resumeData.workExperience];
    const currentDate = newWorkExperience[index][field] || "Jan,2024";
    const [_, year] = currentDate.split(",");
    newWorkExperience[index][field] = `${e.target.value},${year || ""}`;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleYearChange = (e, index, field) => {
    const newWorkExperience = [...resumeData.workExperience];
    const currentDate = newWorkExperience[index][field] || "Jan,2024";
    const [month, _] = currentDate.split(",");
    newWorkExperience[index][field] = `${month || ""},${e.target.value}`;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleDescriptionChange = (value, index) => {
    handleWorkExperience(
      { target: { name: "description", value } },
      index
    );
  };

  const handleAIAssist = async (index) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-profexp-data",
        {
          key: "professional_experience",
          keyword: "Generate professional summary and Checklist of professional experience in manner of content and information",
          content: resumeData.workExperience[index].position,
          company_name: resumeData.workExperience[index].company,
          job_title: resumeData.workExperience[index].position,
          location: resumeData.workExperience[index].location,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      handleWorkExperience(
        {
          target: {
            name: "description",
            value: response.data.data.resume_analysis.professional_summary,
          },
        },
        index
      );

      setSummaries(response.data.data.resume_analysis.responsibilities);
      setPopupIndex(index);
      setShowPopup(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyAchievementSelect = (achievement) => {
    const isSelected = selectedSummaries.includes(achievement);
    if (isSelected) {
      setSelectedSummaries(selectedSummaries.filter((item) => item !== achievement));
    } else {
      setSelectedSummaries([...selectedSummaries, achievement]);
    }
  };

  const handleSaveSelectedAchievements = (index, e) => {
    e.preventDefault();
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].keyAchievements = selectedSummaries.join("\n");
    setResumeData({
      ...resumeData,
      workExperience: newWorkExperience,
    });
    setShowPopup(false);
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          startYear: "Jan,2024",
          endYear: "Dec,2024",
          location: "",
          description: "",
          descriptionDetails: "",
          keyAchievements: "",
        },
      ],
    });
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience.splice(index, 1);
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.work_experience_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field]) && workStrength[field].length > 0;
  };

  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.work_experience_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field]) ? workStrength[field] : [];
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (e.key === 'Enter' && value.length > 2) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-profexp-data",
          {
            key: "professional_experience",
            keyword: value,
            content: value,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSearchResults(response.data.data.resume_analysis.responsibilities || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearchResultSelect = (result, index) => {
    const currentDescription = resumeData.workExperience[index].description || '';
    const newDescription = currentDescription ? `${currentDescription}\n${result}` : result;
    handleDescriptionChange(newDescription, index);
    setSearchValue('');
    setSearchResults([]);
  };

  return (
    <div className="flex-col gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl">Work Experience</h2>
      
      {resumeData.workExperience.map((experience, index) => (
        <div key={index} className="f-col">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Company"
              name="company"
              className={`w-full other-input border ${
                improve &&  hasErrors(index, 'company') ? 'border-red-500' : 'border-black'
              }`}
              value={experience.company}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            {improve && hasErrors(index, 'company') && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() => setActiveTooltip(activeTooltip === `company-${index}` ? null : `company-${index}`)}
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `company-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">Company Suggestions</span>
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
                  {getErrorMessages(index, 'company').map((msg, i) => (
                    <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Position"
              name="position"
              className={`w-full other-input border ${
                improve && hasErrors(index, 'position') ? 'border-red-500' : 'border-black'
              }`}
              value={experience.position}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            {/* Position error tooltip */}
            {improve && hasErrors(index, 'position') && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() => setActiveTooltip(activeTooltip === `position-${index}` ? null : `position-${index}`)}
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `position-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                {/* Position error content */}
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">Position Suggestions</span>
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
                  {getErrorMessages(index, 'position').map((msg, i) => (
                    <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="">
            <label className="text-white">Start Date</label>
            <div className="flex-wrap-gap-2">
              <select
                className={`other-input border flex-1 ${
                  improve && hasErrors(index, 'startYear') ? 'border-red-500' : 'border-black'
                }`}
                value={(experience.startYear || "Jan,2024").split(",")[0]}
                onChange={(e) => handleMonthChange(e, index, "startYear")}
              >
                {months.map((month, idx) => (
                  <option key={idx} value={month}>{month}</option>
                ))}
              </select>
              <select
                className={`other-input border flex-1 ${
                  improve && hasErrors(index, 'startYear') ? 'border-red-500' : 'border-black'
                }`}
                value={(experience.startYear || "Jan,2024").split(",")[1]}
                onChange={(e) => handleYearChange(e, index, "startYear")}
              >
                {years.map((year, idx) => (
                  <option key={idx} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <label className="text-white">End Date</label>
            <div className="flex-wrap-gap-2">
              <select
                className={`other-input border flex-1 ${
                  improve &&  hasErrors(index, 'endYear') ? 'border-red-500' : 'border-black'
                }`}
                value={(experience.endYear || "Dec,2024").split(",")[0]}
                onChange={(e) => handleMonthChange(e, index, "endYear")}
              >
                {months.map((month, idx) => (
                  <option key={idx} value={month}>{month}</option>
                ))}
              </select>
              <select
                className={`other-input border flex-1 ${
                  improve && hasErrors(index, 'endYear') ? 'border-red-500' : 'border-black'
                }`}
                value={(experience.endYear || "Dec,2024").split(",")[1]}
                onChange={(e) => handleYearChange(e, index, "endYear")}
              >
                {years.map((year, idx) => (
                  <option key={idx} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* <div className="relative mb-4">
            <label className="mt-2 text-white">Location</label>
            <input
              type="text"
              placeholder="Location"
              name="location"
              className={`w-full other-input border ${improve && hasErrors(index, 'location') ? 'border-red-500' : 'border-black'
              }`}
              value={experience.location}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            {improve && hasErrors(index, 'location') && (
              <button
                type="button"
                className="absolute right-2 top-1/2 translate-y-1 text-red-500 hover:text-red-600 transition-colors"
                onClick={() => setActiveTooltip(activeTooltip === `location-${index}` ? null : `location-${index}`)}
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `location-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">Location Suggestions</span>
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
                  {getErrorMessages(index, 'location').map((msg, i) => (
                    <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div> */}
          <div className="relative mb-4">
            <label className="mt-2 text-white">Location</label>
            <input
              type="text"
              placeholder="Location"
              name="location"
              className={`w-full other-input border ${
                improve && hasErrors(index, 'location') ? 'border-red-500' : 'border-black'
              }`}
              value={experience.location}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            {isLoading.location && (
              <div className="absolute right-3 top-1/2 transform translate-y-1">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              </div>
            )}
            {showLocationDropdown && locationSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {locationSuggestions.map((location, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationSelect(location, index)}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
            {improve && hasErrors(index, 'location') && (
              <button
                type="button"
                className="absolute right-2 top-1/2 translate-y-1 text-red-500 hover:text-red-600 transition-colors"
                onClick={() => setActiveTooltip(activeTooltip === `location-${index}` ? null : `location-${index}`)}
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `location-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">Location Suggestions</span>
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
                  {getErrorMessages(index, 'location').map((msg, i) => (
                    <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative mb-4">
            <div className="flex justify-between mb-2">
              <label className="text-white">Description</label>
              <button
                type="button"
                className="border bg-black text-white px-3 rounded-3xl"
                onClick={() => handleAIAssist(index)}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "+ Smart Assist"}
              </button>
            </div>
            <ReactQuill
              placeholder="Description"
              value={experience.description}
              onChange={(value) => handleDescriptionChange(value, index)}
              className={`bg-white rounded-md ${
                improve &&  hasErrors(index, 'descriptionDetails') ? 'border-red-500' : 'border-black'
              }`}
              theme="snow"
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline'],
                  ['clean']
                ]
              }}
            />
            {improve && hasErrors(index, 'descriptionDetails') && (
              <button
                type="button"
                className="absolute right-2 top-8 text-red-500 hover:text-red-600 transition-colors"
                onClick={() => setActiveTooltip(activeTooltip === `description-${index}` ? null : `description-${index}`)}
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `description-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">Description Suggestions</span>
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
                  {getErrorMessages(index, 'descriptionDetails').map((msg, i) => (
                    <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative mb-4">
            <label className="text-white">Key Achievements</label>
            <textarea
              placeholder="Key Achievements"
              name="keyAchievements"
              className={`w-full other-input border ${
                improve &&  hasErrors(index, 'keyAchievements') ? 'border-red-500' : 'border-black'
              }`}
              value={experience.keyAchievements}
              onChange={(e) => handleWorkExperience(e, index)}
              rows={4}
            />
            {improve && hasErrors(index, 'keyAchievements') && (
              <button
                type="button"
                className="absolute right-2 top-8 text-red-500 hover:text-red-600 transition-colors"
                onClick={() => setActiveTooltip(activeTooltip === `achievements-${index}` ? null : `achievements-${index}`)}
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `achievements-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">Achievement Suggestions</span>
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
                  {getErrorMessages(index, 'keyAchievements').map((msg, i) => (
                    <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />

      {/* Smart Assist Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">Select Key Achievements</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {summaries.map((summary, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedSummaries.includes(summary)}
                    onChange={() => handleKeyAchievementSelect(summary)}
                    className="mt-1"
                  />
                  <p className="text-gray-800">{summary}</p>
                </div>
              ))}
            </div>
            <button
              onClick={(e) => handleSaveSelectedAchievements(popupIndex, e)}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Save Selected Achievements
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 bg-white rounded-lg shadow-xl mt-2">
          {searchResults.map((result, idx) => (
            <div
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSearchResultSelect(result, popupIndex)}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperience;

