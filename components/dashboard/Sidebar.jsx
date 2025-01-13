
  
import { Download, Edit } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useRef, useEffect, useContext } from "react";
import { ResumeContext } from "../../components/context/ResumeContext";
import DashboardPreview from "../preview/DashboardPreview";
import axios from "axios";
const Sidebar = ({ score, resumeId }) => {
  const templateRef = useRef(null);
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/dashboard/aibuilder/${resumeId}`);
  };

  const handleCreate = () => {
    router.push('/');
  };

  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isFinished, setIsFinished] = useState(false);
  const [resumeData, setResumeData] = useState(null);  // To store the fetched resume data
  const [token, setToken] = useState(null);

  const {  setResumeData:setResumeContext,setHeaderColor, setBgColor, setSelectedFont, selectedFont, backgroundColorss, headerColor } = useContext(ResumeContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsFinished = localStorage.getItem("isFinished");
      const storedTemplate = localStorage.getItem("selectedTemplate");
      const storedFont = localStorage.getItem("selectedFont");
  
      // Only set from localStorage if not already set by API
      if (!resumeData?.templateData) {
        if (storedIsFinished) setIsFinished(JSON.parse(storedIsFinished));
        if (storedTemplate && !selectedTemplate) setSelectedTemplate(storedTemplate);
        if (storedFont) setSelectedFont(storedFont);
      }
    }
  }, [resumeData]);
  
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isFinished", JSON.stringify(isFinished));
      localStorage.setItem("selectedTemplate", selectedTemplate);
      localStorage.setItem("selectedFont", selectedFont);
      localStorage.setItem("headerColor", headerColor);
      // localStorage.setItem("backgroundColor", backgroundColorss);
      // localStorage.setItem("currentSection", currentSection.toString());
    }
  }, [isFinished, selectedTemplate, selectedFont, headerColor]);

  // Fetch resume data based on resumeId
  const fetchResumeData = async () => {
      
  
    try {
      const token = localStorage.getItem('token');
      const apiUrl = "https://api.sentryspot.co.uk/api/jobseeker/resume-list/0";
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.code === 'success' || response.data.status === "success") {
      
        const { data } = response.data;
        const parsedData = data.ai_resume_parse_data;
      
        // Update state with fetched data
        setResumeData(parsedData);

        // Optionally set template details (background color, template ID, etc.)
        if (parsedData.templateData.templateDetails) {
          setBgColor(parsedData.templateData.templateDetails.backgroundColor || '');
          setHeaderColor(parsedData.templateData.templateDetails.backgroundColor || '');
          setSelectedTemplate(parsedData.templateData.templateDetails.templateId || 'template1');
        }
      }
    } catch (error) {

      console.error("Error fetching resume data:", error);
    }
  };
  useEffect(() => {
    if (resumeId) {
      fetchResumeData();
    }
  }, [resumeId]); // Add resumeId as a dependency
  
  
  

  const handleDownload = async () => {
    const apiUrl = `https://api.sentryspot.co.uk/api/jobseeker/download-resume/${resumeId}`;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${resumeId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download the file. Please try again later.");
    }
  };

  return (
    <div className="w-full md:w-[400px] p-4 border-r border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Resume_1</h2>
        <Link href="/dashboard/resumelist" className="text-blue-600 hover:text-blue-700">View All</Link>
      </div>

      {/* Resume Preview */}
      <div className="border border-gray-200 rounded-lg shadow-sm p-2 mb-4 relative h-[500px]">
        <DashboardPreview ref={templateRef} selectedTemplate={selectedTemplate}  resumeData={resumeData}/>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleEdit}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Edit />
          Edit
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Download />
          Download
        </button>
      </div>

      {/* Resume Strength */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Resume Strength:</span>
          <div className="flex items-center gap-2">
            <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm">{score}</span>
            <button className="text-blue-600 hover:text-blue-700 text-sm">Improve</button>
          </div>
        </div>
      </div>

      {/* Create New Resume Button */}
      <button
        onClick={handleCreate}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Create New Resume
      </button>
    </div>
  );
};

export default Sidebar;
