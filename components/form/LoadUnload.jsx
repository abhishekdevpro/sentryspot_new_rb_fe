// import { FaCloudUploadAlt } from "react-icons/fa";
// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { ResumeContext } from "../../pages/builder";
// import { toast } from "react-toastify";

// const LoadUnload = () => {
//   const { setResumeData } = useContext(ResumeContext);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isUploaded, setIsUploaded] = useState(false);
//   const [showOverlay, setShowOverlay] = useState(true);
//   const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
//   const [token, setToken] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (router.query.id) {
//       return;
//     }
//     if (typeof window !== "undefined") {
//       const storedToken = localStorage.getItem("token");
//       setToken(storedToken);
//     }
//   }, [router.query.id]);

//   if (router.query.id) {
//     return null; // Hide component if 'id' is present in query parameters
//   }

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       toast.error("Please select a file to upload");
//       return;
//     }

//     if (file.type !== "application/pdf") {
//       toast.error("Please upload a PDF file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("files", file);

//     setLoading(true);
//     setShowLoadingAnimation(true);
//     try {
//       const response = await axios.post("https://api.resumeintellect.com/api/user/resume-upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: token,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           toast.info(`Upload progress: ${percentCompleted}%`);
//         },
//       });

//       const resumeData = response.data.data[0];
//       if (!resumeData || !resumeData.resume_parse_data) {
//         toast.error("Resume data not found in API response");
//         setLoading(false);
//         setShowLoadingAnimation(false);
//         return;
//       }

//       const parsedData = JSON.parse(resumeData.resume_parse_data);
//       setResumeData(parsedData.templateData);
//       localStorage.setItem("resumeData", JSON.stringify(parsedData.templateData));
//       localStorage.setItem("resumeId", resumeData.id);
//       localStorage.setItem("location", resumeData.file_path);

//       toast.success("File uploaded successfully");
//       setIsUploaded(true);
//       setLoading(false);
//       setShowLoadingAnimation(false);
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("File upload failed");
//       setLoading(false);
//       setShowLoadingAnimation(false);
//     }
//   };

//   const handleStartFromScratch = async () => {
//     setShowLoadingAnimation(true);
//     try {
//       const response = await axios.post(
//         "https://api.resumeintellect.com/api/user/resume-create",
//         {},
//         { headers: { Authorization: token } }
//       );
  
//       if (response.data && response.data.data) {
//         const { id, file_path, ai_resume_parse_data } = response.data.data;
        
//         const parsedData = JSON.parse(ai_resume_parse_data).templateData;
  
//         setResumeData(parsedData);
//         localStorage.setItem("resumeData", JSON.stringify(parsedData));
//         localStorage.setItem("resumeId", id);
//         localStorage.setItem("location", file_path);
  
//         router.push(`/dashboard/aibuilder/${id}`);
//         setShowLoadingAnimation(false);
//         toast.success("Started from scratch successfully!");
//       } else {
//         throw new Error("Invalid response data format");
//       }
//     } catch (error) {
//       console.error("Error creating resume from scratch:", error);
//       toast.error("Failed to start from scratch");
//       setShowLoadingAnimation(false);
//     }
//   };
  
//   return (
//     <>
//       {showLoadingAnimation && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
//           <div className="loader"></div>
//           <div className="ms-5 text-white text-center text-lg md:text-2xl">
//             ☑ Resume information reading <br />
//             ☑ Analyzing and improving resume content as per industry standards
//           </div>
//         </div>
//       )}

//       {showOverlay && !isUploaded && !showLoadingAnimation && (
//         <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-75">
//           <div className="bg-white p-5 md:p-10 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 text-center">
//             <h1 className="text-xl md:text-2xl font-bold mb-4 mt-8 md:mt-16">Are you uploading an existing resume?</h1>
//             <p className="text-gray-600 mb-5">Just review, edit, and update it with new information</p>

//             <div className="flex flex-col md:flex-row items-center justify-center gap-5">
//               <div className="h-80 md:h-auto p-6 md:p-10 border-2 rounded-lg shadow-lg shadow-blue-100 w-full md:w-1/2">
//                 <div className="mb-4">
//                   <svg className="mx-auto h-8 w-8 md:h-12 md:w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16" />
//                   </svg>
//                 </div>
//                 <h2 className="text-lg font-semibold mb-2">Yes, upload from my resume</h2>
//                 <p className="text-gray-500 mb-5 text-sm md:text-base">
//                   We’ll give you expert guidance to fill out your info and enhance your resume, from start to finish
//                 </p>

//                 <label className="p-2 text-white bg-gray-500 rounded cursor-pointer hover:bg-blue-600 transition">
//                   <FaCloudUploadAlt className="inline-block mr-2" />
//                   <span>Select Resume (PDF)</span>
//                   <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
//                 </label>

//                 <button
//                   className={`p-2 mt-4 w-full text-white bg-blue-800 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600 transition"}`}
//                   onClick={handleUpload}
//                   disabled={loading}
//                 >
//                   {loading ? "Uploading..." : "Upload"}
//                 </button>
//               </div>

//               <div className="h-80 md:h-auto p-6 md:p-10 border-2 rounded-lg shadow-lg shadow-blue-100 w-full md:w-1/2">
//                 <div className="mb-4">
//                   <svg className="mx-auto h-8 w-8 md:h-12 md:w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                 </div>
//                 <h2 className="text-lg font-semibold mb-2">No, start from scratch</h2>
//                 <p className="text-gray-500 text-sm md:text-base">
//                   We’ll guide you through the whole process so your skills can shine
//                 </p>
//                 <button
//                   className="p-2 w-full mt-8 md:mt-20 text-white bg-yellow-500 rounded hover:bg-red-600 transition"
//                   onClick={handleStartFromScratch}
//                 >
//                   Start From Scratch
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LoadUnload;
import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ResumeContext } from "../../pages/builder";
import { toast } from "react-toastify";

const LoadUnload = () => {
  const { setResumeData } = useContext(ResumeContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      return;
    }
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, [router.query.id]);

  if (router.query.id) {
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    setLoading(true);
    setShowLoadingAnimation(true);
    try {
      const response = await axios.post("https://api.resumeintellect.com/api/user/resume-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          toast.info(`Upload progress: ${percentCompleted}%`);
        },
      });

      const resumeData = response.data.data[0];
      if (!resumeData || !resumeData.resume_parse_data) {
        toast.error("Resume data not found in API response");
        setLoading(false);
        setShowLoadingAnimation(false);
        return;
      }

      const parsedData = JSON.parse(resumeData.resume_parse_data);
      setResumeData(parsedData.templateData);
      localStorage.setItem("resumeData", JSON.stringify(parsedData.templateData));
      localStorage.setItem("resumeId", resumeData.id);
      localStorage.setItem("location", resumeData.file_path);

      toast.success("File uploaded successfully");
      setIsUploaded(true);
      setLoading(false);
      setShowLoadingAnimation(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
      setLoading(false);
      setShowLoadingAnimation(false);
    }
  };

  const handleStartFromScratch = async () => {
    setShowLoadingAnimation(true);
    try {
      const response = await axios.post(
        "https://api.resumeintellect.com/api/user/resume-create",
        {},
        { headers: { Authorization: token } }
      );
  
      if (response.data && response.data.data) {
        const { id, file_path, ai_resume_parse_data } = response.data.data;
        
        const parsedData = JSON.parse(ai_resume_parse_data).templateData;
  
        setResumeData(parsedData);
        localStorage.setItem("resumeData", JSON.stringify(parsedData));
        localStorage.setItem("resumeId", id);
        localStorage.setItem("location", file_path);
  
        router.push(`/dashboard/aibuilder/${id}`);
        setShowLoadingAnimation(false);
        toast.success("Started from scratch successfully!");
      } else {
        throw new Error("Invalid response data format");
      }
    } catch (error) {
      console.error("Error creating resume from scratch:", error);
      toast.error("Failed to start from scratch");
      setShowLoadingAnimation(false);
    }
  };
  
  return (
    <>
      {showLoadingAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="loader"></div>
          <div className="ms-5 text-white text-center text-lg md:text-2xl">
            ☑ Resume information reading <br />
            ☑ Analyzing and improving resume content as per industry standards
          </div>
        </div>
      )}

      {showOverlay && !isUploaded && !showLoadingAnimation && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-5 md:p-10 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 text-center relative">
            <button
              onClick={handleBack}
              className="absolute top-4 left-4 text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <FaArrowLeft className="text-xl" />
              <span>Back</span>
            </button>
            
            <h1 className="text-xl md:text-2xl font-bold mb-4 mt-8 md:mt-16">Are you uploading an existing resume?</h1>
            <p className="text-gray-600 mb-5">Just review, edit, and update it with new information</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
              <div className="h-80 md:h-auto p-6 md:p-10 border-2 rounded-lg shadow-lg shadow-blue-100 w-full md:w-1/2">
                <div className="mb-4">
                  <svg className="mx-auto h-8 w-8 md:h-12 md:w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold mb-2">Yes, upload from my resume</h2>
                <p className="text-gray-500 mb-5 text-sm md:text-base">
                  We'll give you expert guidance to fill out your info and enhance your resume, from start to finish
                </p>

                <label className="p-2 text-white bg-gray-500 rounded cursor-pointer hover:bg-blue-600 transition">
                  <FaCloudUploadAlt className="inline-block mr-2" />
                  <span>Select Resume (PDF)</span>
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
                </label>

                <button
                  className={`p-2 mt-4 w-full text-white bg-blue-800 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600 transition"}`}
                  onClick={handleUpload}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>

              <div className="h-80 md:h-auto p-6 md:p-10 border-2 rounded-lg shadow-lg shadow-blue-100 w-full md:w-1/2">
                <div className="mb-4">
                  <svg className="mx-auto h-8 w-8 md:h-12 md:w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold mb-2">No, start from scratch</h2>
                <p className="text-gray-500 text-sm md:text-base">
                  We'll guide you through the whole process so your skills can shine
                </p>
                <button
                  className="p-2 w-full mt-8 md:mt-20 text-white bg-yellow-500 rounded hover:bg-red-600 transition"
                  onClick={handleStartFromScratch}
                >
                  Start From Scratch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadUnload;