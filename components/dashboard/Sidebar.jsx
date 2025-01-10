import { Download, Edit } from "lucide-react"

import { useRouter  } from "next/router"
import Link from "next/link";
import React, { useState, useRef, useEffect, useContext } from "react";
import { ResumeContext } from "../../components/context/ResumeContext";
import DashboardPreview from "../preview/DashboardPreview";

const Sidebar = ({ score,resumeId }) => {
  const templateRef = useRef(null);
  const router = useRouter()
  const hnadleEdit =()=>{
    router.push(`/dashboard/aibuilder/${resumeId}`)
  }
  const handleCreate=()=>{
    router.push(`/dashboard/aibuilder`)
  }
  const [currentSection, setCurrentSection] = useState(0);
  
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isFinished, setIsFinished] = useState(false);

  const [token, setToken] = useState(null);
  
  
  
  const pdfExportComponent = useRef(null);
 
  const { PayerID } = router.query;
  
 
  const {resumeData ,setResumeData, setHeaderColor,setBgColor,setSelectedFont,selectedFont,backgroundColorss,headerColor} = useContext(ResumeContext)
 

  
  const handleDownload = async () => {
   
    const apiUrl = `https://api.sentryspot.co.uk/api/jobseeker/download-resume/${resumeId}`;
  
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization:token ,
          "Content-Type": "application/json", // Adjust headers if needed
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
  
      const blob = await response.blob(); // Get the file content as a blob
      const url = window.URL.createObjectURL(blob); // Create a temporary URL for the file
  
      // Create a hidden <a> element for download
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${resumeId}.pdf`; // Set a default filename
      document.body.appendChild(link); // Append the link to the body
      link.click(); // Trigger the download
      link.remove(); // Remove the link after triggering the download
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download the file. Please try again later.");
    }
  };
  

 

  useEffect(() => {
    const fetchResumeData = async () => {
      const { id } = router.query;
      const token = localStorage.getItem('token');

      if (id && token) {
        try {
          const response = await axios.get(`https://api.sentryspot.co.uk/api/user/resume-list/${id}`, {
            headers: {
              Authorization: token,
            },
          });

          if (response.data.status === 'success') {
            const { data } = response.data;
            const parsedData = JSON.parse(data.ai_resume_parse_data);
            
            // Update state with fetched data
            setResumeData(parsedData.templateData);
            
            // Set background color and template
            if (parsedData.templateData.templateDetails) {
              setBgColor(parsedData.templateData.templateDetails.backgroundColor || '');
              setHeaderColor(parsedData.templateData.templateDetails.backgroundColor );
              setSelectedTemplate(parsedData.templateData.templateDetails.templateId || 'template1');
            }
          }
        } catch (error) {
          console.error('Error fetching resume data:', error);
          toast.error('Failed to fetch resume data');
        }
      }
    };

    fetchResumeData();
  }, [router.query]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      const storedIsFinished = localStorage.getItem("isFinished");
      const storedTemplate = localStorage.getItem("selectedTemplate");
      const storedFont = localStorage.getItem("selectedFont");
      const storedBgColor = localStorage.getItem("backgroundColor");
      const storedCurrentSection = localStorage.getItem("currentSection");
      // const storedResumeData = localStorage.getItem("resumeData");

      if (storedIsFinished) setIsFinished(JSON.parse(storedIsFinished));
      if (storedTemplate && !selectedTemplate) setSelectedTemplate(storedTemplate);
      if (storedFont) setSelectedFont(storedFont);
      if (storedBgColor && !backgroundColorss) setBgColor(storedBgColor);
      if (storedCurrentSection)
        setCurrentSection(parseInt(storedCurrentSection));
      // if (storedResumeData && !resumeData) setResumeData(JSON.parse(storedResumeData));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isFinished", JSON.stringify(isFinished));
      localStorage.setItem("selectedTemplate", selectedTemplate);
      localStorage.setItem("selectedFont", selectedFont);
      localStorage.setItem("headerColor", headerColor);
      localStorage.setItem("backgroundColor", backgroundColorss);
      localStorage.setItem("currentSection", currentSection.toString());
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    }
  }, [
    isFinished,
    selectedTemplate,
    selectedFont,
    headerColor,
    backgroundColorss,
    currentSection,
    resumeData,
  ]);

 
  
  useEffect(() => {
    if (PayerID) {
      verifyPayment();
    }
  }, [PayerID]);

  const verifyPayment = async () => {
    try {
      const orderId = localStorage.getItem("orderid");
      const token = localStorage.getItem("token");

      if (orderId && token && PayerID) {
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/user/paypal/verify-order?orderid=${orderId}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === "success") {
          setPaymentVerified(true);
          toast.success("Payment verified successfully!");

          localStorage.removeItem("orderid");

          if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
          }
        } else {
          toast.error("Payment verification failed. Please try again.");
          router.push("/payment-failed");
        }
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.error(
        error?.response?.data?.message || "Payment verification failed"
      );
      router.push("/payment-failed");
    }
  };

  



  

    return (
      <div className="w-full md:w-[400px] p-4 border-r border-gray-200 " >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Resume_1</h2>
          <Link href="/dashboard/resumelist" className="text-blue-600 hover:text-blue-700">View All</Link>
        </div>
  
        {/* Resume Preview */}
        <div className="border border-gray-200 rounded-lg shadow-sm p-2 mb-4  relative h-[500px] " >
       
          <DashboardPreview ref={templateRef} selectedTemplate={selectedTemplate} />
        </div>
  
        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={hnadleEdit}
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
    )
  }
  
  export default Sidebar
  
  