import { FaCloudUploadAlt } from "react-icons/fa";
import React, { useContext, useState } from "react";
import axios from 'axios';
import { ResumeContext } from "../../pages/builder";
import { toast } from 'react-toastify';

const LoadUnload = () => {
  const { setResumeData } = useContext(ResumeContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false); // To control overlay visibility
  const [showOverlay, setShowOverlay] = useState(true); // To control the visibility of the popup
  const token = "YOUR_TOKEN_HERE"; // Replace with your actual token

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (file.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append('files', file);

    setLoading(true);
    try {
      const response = await axios.post('https://api.novajobs.us/resume-builder/resume-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          toast.info(`Upload progress: ${percentCompleted}%`);
        }
      });

      const resumeData = response.data.data[0];
      if (!resumeData || !resumeData.resume_parse_data) {
        toast.error("Resume data not found in API response");
        setLoading(false);
        return;
      }

      const parsedData = JSON.parse(resumeData.resume_parse_data);
      setResumeData(parsedData.templateData);
      localStorage.setItem('resumeData', JSON.stringify(parsedData.templateData));
      localStorage.setItem('resumeId', resumeData.id);
      localStorage.setItem('location', resumeData.file_path);

      toast.success("File uploaded successfully");
      setIsUploaded(true); // Hide overlay after successful upload
      setLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
      setLoading(false);
    }
  };

  const handleStartFromScratch = () => {
    setShowOverlay(false); // Close the popup when starting from scratch
  };

  // Overlay will only disappear after the file is successfully uploaded or if user chooses to start from scratch
  return (
    <>
      {showOverlay && !isUploaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
          

          <div className="bg-white   justify-center p-1   rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold mb-4 mt-20">Are you uploading an existing resume?</h1>
      <p className="text-gray-600 mb-5">Just review, edit, and update it with new information</p>

            <div className="flex justify-center  gap-5  pt-5">

            <div className="h-80 p-10 border-2 rounded-lg shadow-lg shadow-blue-100">
           
           <div className="mb-4 ">
         <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16" />
         </svg>
       </div>
       <h2 className="text-lg font-semibold mb-2">Yes, upload from my resume</h2>
       <p className="text-gray-500 mb-5">We’ll give you expert guidance to fill out your info and enhance your resume,<br/> from start to finish</p>
    

             <label className="p-2  text-white bg-gray-500 rounded cursor-pointer hover:bg-blue-600 transition">
               <FaCloudUploadAlt className="inline-block mr-2" />
               <span>Select Resume (PDF)</span>
               <input
                 type="file"
                 className="hidden"
                 onChange={handleFileChange}
                 accept=".pdf"
               />
             </label>

             <button
               className={`p-2 mt-4 w-full text-white bg-blue-800 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 transition'}`}
               onClick={handleUpload}
               disabled={loading}
             >
               {loading ? 'Uploading...' : 'Upload'}
             </button>
        
         </div>

         <div className="h-80 p-10 border-2 rounded-lg  shadow-lg shadow-blue-100">

           <div>
           <div className="mb-4">
         <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
         </svg>
       </div>
       <h2 className="text-lg font-semibold mb-2">No, start from scratch</h2>
       <p className="text-gray-500">We’ll guide you through the whole process so your skills can shine</p>
             <button
               className="p-2 w-full mt-20 text-white bg-yellow-500 rounded hover:bg-red-600 transition"
               onClick={handleStartFromScratch}
             >
               Start From Scratch
             </button>
           </div>
         </div>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
};

export default LoadUnload;
