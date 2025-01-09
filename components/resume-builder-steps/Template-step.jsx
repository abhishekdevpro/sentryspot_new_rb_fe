

'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

// Import all templates
import template1 from '../preview/template/template1.png';
import template2 from '../preview/template/template2.png';
import template3 from '../preview/template/template3.png';
import template4 from '../preview/template/template4.png';
import template5 from '../preview/template/template5.png';
import template6 from '../preview/template/template6.png';
import template7 from '../preview/template/template7.png';
import template8 from '../preview/template/template8.png';
import template9 from '../preview/template/template9.png';
import template10 from '../preview/template/template10.png';
import template11 from '../preview/template/template11.png';
import template12 from '../preview/template/template12.png';
import template13 from '../preview/template/template13.png';
import template14 from '../preview/template/template14.png';
import template15 from '../preview/template/template15.png';
import template16 from '../preview/template/template16.png';
import template17 from '../preview/template/template17.png';
import template18 from '../preview/template/template18.png';
import template19 from '../preview/template/template19.png';
import template20 from '../preview/template/template20.png';

const TemplateStep = ({ onNext, onBack, onChange, value }) => {
  const router = useRouter();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedHexCode, setSelectedHexCode] = useState('#2563EB'); // Default blue hex code
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const colors = [
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400', hexCode: '#6D7278' },
    { name: 'Blue', class: 'bg-blue-600', selectedClass: 'ring-blue-400', hexCode: '#2563EB' },
    { name: 'Purple', class: 'bg-purple-600', selectedClass: 'ring-purple-400', hexCode: '#9333EA' },
    { name: 'Green', class: 'bg-green-600', selectedClass: 'ring-green-400', hexCode: '#16A34A' },
    { name: 'Red', class: 'bg-red-600', selectedClass: 'ring-red-400', hexCode: '#DC2626' },
    { name: 'Yellow', class: 'bg-yellow-500', selectedClass: 'ring-yellow-400', hexCode: '#EAB308' }
  ];

  const templates = [
    { key: 'template1', imageUrl: template1, name: 'Modern Clean' },
    // { key: 'template2', imageUrl: template2, name: 'Professional' },
    { key: 'template3', imageUrl: template3, name: 'Creative' },
    { key: 'template4', imageUrl: template4, name: 'Executive' },
    { key: 'template5', imageUrl: template5, name: 'Minimal' },
    { key: 'template6', imageUrl: template6, name: 'Classic' },
    { key: 'template7', imageUrl: template7, name: 'Contemporary' },
    // { key: 'template8', imageUrl: template8, name: 'Simple' },
    // { key: 'template9', imageUrl: template9, name: 'Elegant' },
    // { key: 'template10', imageUrl: template10, name: 'Modern Plus' },
    // { key: 'template11', imageUrl: template11, name: 'Bold' },
    // { key: 'template12', imageUrl: template12, name: 'Premium' },
    // { key: 'template13', imageUrl: template13, name: 'Advanced' },
    // { key: 'template14', imageUrl: template14, name: 'Pro' },
    // { key: 'template15', imageUrl: template15, name: 'Clean' },
    // { key: 'template16', imageUrl: template16, name: 'Sleek' },
    // { key: 'template17', imageUrl: template17, name: 'Dynamic' },
    // { key: 'template18', imageUrl: template18, name: 'Premium Plus' },
    // { key: 'template19', imageUrl: template19, name: 'Executive Pro' },
    // { key: 'template20', imageUrl: template20, name: 'Modern Elite' }
  ];

  // Set default color hex code if none selected
  useEffect(() => {
    if (!value.hexCode) {
      const defaultColor = colors.find(c => c.name === 'Blue');
      handleColorChange(defaultColor.hexCode, defaultColor.name);
    }
  }, []);

  // Handle color selection with hex code
  const handleColorChange = (hexCode, colorName) => {
    console.log('Selected color:', colorName, 'Hex:', hexCode);
    setSelectedHexCode(hexCode);
    onChange({ 
      ...value, 
      color: colorName,
      hexCode: hexCode
    });
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeId = router.query.id || localStorage.getItem('resumeId');
        if (!resumeId || !token) {
          toast.error('Resume ID or token not found');
          return;
        }

        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/resume-list/${resumeId}`,
          {
            headers: {
              Authorization: token
            }
          }
        );
          console.log(typeof response.data.data.ai_resume_parse_data,"parsedAIData");
        if (response.data.code == 200 || response.data.status == "success") {
          const parsedAIData = (response.data.data.ai_resume_parse_data);
          console.log(parsedAIData,"parsedAIData");
          setResumeData(parsedAIData.templateData);
          
          if (parsedAIData.templateData.templateDetails) {
            const backgroundColor = parsedAIData.templateData.templateDetails.backgroundColor;
            const colorObj = colors.find(c => c.hexCode === backgroundColor) || colors.find(c => c.name === 'Blue');
            handleColorChange(colorObj.hexCode, colorObj.name);
          }
        } else {
          toast.error(response.data.message || 'Failed to fetch resume data');
        }
      } catch (error) {
        toast.error(error?.message || 'Error fetching resume data');
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [router.query.id, token]);

  const formatResumeData = (data) => {
    return {
      name: data.name || "",
      position: data.position || "",
      contactInformation: data.contactInformation || "",
      email: data.email || "",
      address: data.address || "",
      profilePicture: data.profilePicture || "",
      socialMedia: data.socialMedia?.map((media) => ({
        socialMedia: media.socialMedia || "",
        link: media.link || "",
      })) || [],
      summary: data.summary || "",
      education: data.education?.map((edu) => ({
        school: edu.school || "",
        degree: edu.degree || "",
        startYear: edu.startYear || "",
        endYear: edu.endYear || "",
      })) || [],
      workExperience: data.workExperience?.map((exp) => ({
        company: exp.company || "",
        position: exp.position || "",
        description: exp.description || "",
        KeyAchievements: Array.isArray(exp.keyAchievements)
          ? exp.keyAchievements
          : [exp.keyAchievements || ""],
        startYear: exp.startYear || "",
        endYear: exp.endYear || "",
      })) || [],
      projects: data.projects?.map((project) => ({
        title: project.title || "",
        link: project.link || "",
        description: project.description || "",
        keyAchievements: Array.isArray(project.keyAchievements)
          ? project.keyAchievements
          : [project.keyAchievements || ""],
        startYear: project.startYear || "",
        endYear: project.endYear || "",
        name: project.name || "",
      })) || [],
      skills: Array.isArray(data.skills)
        ? data.skills.map((skill) => ({
            title: skill.title || "",
            skills: skill.skills || [],
          }))
        : [],
      languages: data.languages || [],
      certifications: data.certifications || [],
      templateDetails: {
        templateId: value.template,
        backgroundColor: selectedHexCode || '#2563EB',
        font: "Ubuntu",
      },
    };
  };

  const handleSaveTemplate = async () => {
    if (!resumeData) return;

    const templateData = {
      templateData: formatResumeData(resumeData)
    };

    try {
      const resumeId = router.query.id || localStorage.getItem('resumeId');
      if (!resumeId) {
        toast.error('Resume ID not found');
        return;
      }

      const response = await axios.put(
        `https://api.sentryspot.co.uk/api/jobseeker/resume-update/${resumeId}`,
        templateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setIsSaved(true);
        localStorage.setItem("isSaved", "true");
        toast.success(response.data.message || "Resume saved Successfully");
        onNext();
      } else {
        toast.error(response.data.error || "Error while saving the Resume");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  // Get current selected color for hover effect
  const getHoverStyle = (templateKey) => {
    if (value.template === templateKey) {
      return {
        borderWidth: '4px',
        borderColor: selectedHexCode,
        boxShadow: `0 0 0 4px ${selectedHexCode}33`
      };
    }
    return {
      borderWidth: '0px',
      borderColor: 'transparent',
      boxShadow: 'none',
      ':hover': {
        boxShadow: `0 0 0 2px ${selectedHexCode}33`
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-8xl mx-auto px-2">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-xl text-gray-600">
            Select a design that best represents your professional style
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-4 h-fit sticky top-8">
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Color Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                {/* {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full ${color.class} 
                      transform hover:scale-110 transition-all duration-200
                      ${value.hexCode === color.hexCode ? 'ring-4 ring-offset-2 ' + color.selectedClass : ''}
                    `}
                    onClick={() => handleColorChange(color.hexCode, color.name)}
                    title={color.name}
                  />
                ))} */}
                {colors.map((color) => (
                  <div
                    key={color.name}
                    className="flex items-center justify-center"
                  >
                    <button
                      className={`
                        w-8 h-8 rounded-full ${color.class}
                        transform hover:scale-110 transition-all duration-200
                        ${selectedHexCode === color.hexCode ? 
                          `ring-2 ring-offset-2 ${color.selectedClass} outline-none focus:outline-none` : 
                          'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                        }
                      `}
                      onClick={() => handleColorChange(color.hexCode, color.name)}
                      title={color.name}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Photo Style</h3>
              <div className="space-y-4">
                {['With Photo', 'Without Photo'].map((option) => (
                  <label key={option} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="photo"
                      checked={value.hasPhoto === (option === 'With Photo')}
                      onChange={() => onChange({ ...value, hasPhoto: option === 'With Photo' })}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {templates.map((template) => (
                <button
                  key={template.key}
                  onClick={() => onChange({ ...value, template: template.key })}
                  className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300"
                  style={getHoverStyle(template.key)}
                >
                  <div className="w-full">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={template.imageUrl}
                        alt={template.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                        priority={templates.indexOf(template) < 6}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      {/* <p className="text-white font-medium text-lg">{template.name}</p> */}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-12">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 
              font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSaveTemplate}
            style={{ backgroundColor: selectedHexCode }}
            className="px-8 py-3 text-white rounded-xl font-medium
              hover:opacity-90 transition-colors shadow-lg hover:shadow-xl"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateStep;