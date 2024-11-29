// import React, { useState, useRef, createContext ,useEffect} from "react";
// import Language from "../components/form/Language";
// import axios from "axios";
// import Meta from "../components/meta/Meta";
// import FormCP from "../components/form/FormCP";
// import dynamic from "next/dynamic";
// import DefaultResumeData from "../components/utility/DefaultResumeData";
// import SocialMedia from "../components/form/SocialMedia";
// import WorkExperience from "../components/form/WorkExperience";
// import Skill from "../components/form/Skill";
// import PersonalInformation from "../components/form/PersonalInformation";
// import Summary from "../components/form/Summary";
// import Projects from "../components/form/Projects";
// import Education from "../components/form/Education";
// import Certification from "../components/form/certification";
// import ColorPicker from './ColorPicker';
// import ColorPickers from "./ColorPickers";
// import Preview from "../components/preview/Preview";
// import TemplateSelector from "../components/preview/TemplateSelector";
// import { PDFExport } from '@progress/kendo-react-pdf';
// import LoadUnload from "../components/form/LoadUnload";
// import MyResume from "./dashboard/MyResume";
// import Modal from "../components/Modal"; // Import the modal
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { toast } from "react-toastify";
// const ResumeContext = createContext(DefaultResumeData);

// const Print = dynamic(() => import("../components/utility/WinPrint"), {
//   ssr: false,
// });

// export default function Builder({ onClose }) {
//   const [resumeData, setResumeData] = useState(DefaultResumeData);
//   const [formClose, setFormClose] = useState(false);
//   const [currentSection, setCurrentSection] = useState(0);
//   const [selectedFont, setSelectedFont] = useState("Ubuntu");
//   const [headerColor, setHeaderColor] = useState('');
//   const [backgroundColorss, setBgColor] = useState('');
//   const [selectedTemplate, setSelectedTemplate] = useState('template1');
//   const [isFinished, setIsFinished] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
//   const [token, setToken] = useState(null);
//   const [resumeId, setResumeId] = useState(null);

//   // Function to navigate back
//   const handleBack = () => {
//     router.back(); // Navigate to the previous page
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedToken = localStorage.getItem("token");
//       setToken(storedToken);
//     }
//   }, []);

//   useEffect(() => {
//     // Extract resumeId from URL
//     const path = window.location.pathname;
//     const id = path.split('/').pop(); // Get the last part of the URL
//     setResumeId(id);
//   }, []);

//    const handleDownloadResume = () => {
//     const amount = 49; // Fixed price

//     // Ensure the resumeId is valid
//     if (!resumeId) {
//       console.error('Resume ID is not available');
//       return;
//     }

//     // Create the download payload
//     const payload = {
//       amount,
//       ResumeId: resumeId, // Ensure the field name matches the API expectation
//       Token: token || '' // Ensure the field name matches the API expectation
//     };

//     // Make the API call to initiate download
//     axios.post('https://api.sentryspot.co.uk/api/user/paypal/create-payment', payload, {
//       headers: { 'Content-Type': 'application/json' }, // Use JSON content type
//     })

//     .then(response => {
//       const data = response.data;
//       if (data && data.data) {
//         // Redirect to the PayPal URL provided in the response
//         window.location.href = data.data;
//       }
//       if (data && data.order_id) {
//         localStorage.setItem("orderid", data.order_id);
//       }
//       console.log(data.order_id)
//     })
//     .catch(error => console.error('Payment Error:', error));
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleProfilePicture = (e) => {
//     const file = e.target.files[0];
//     if (file instanceof Blob) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setResumeData({ ...resumeData, profilePicture: event.target.result });
//       };
//       reader.readAsDataURL(file);
//     } else {
//       console.error("Invalid file type");
//     }
//   };

//   const handleChange = (e) => {
//     setResumeData({ ...resumeData, [e.target.name]: e.target.value });
//   };

//   const sections = [
//     { label: "Details", component: <PersonalInformation /> },
//     { label: "Social", component: <SocialMedia /> },
//     { label: "Summary", component: <Summary /> },
//     { label: "Education", component: <Education /> },
//     { label: "Experience", component: <WorkExperience /> },
//     { label: "Projects", component: <Projects /> },
//     { label: "Skills", component: Array.isArray(resumeData?.skills) ? resumeData.skills.map((skill, index) => <Skill title={skill.title} key={index} />) : <p>No skills available</p> },
//     { label: "Language", component: <Language /> },
//     { label: "Certification", component: <Certification /> },
//   ];

//   const handleNext = () => {
//     if (currentSection === sections.length - 1) {
//       setIsFinished(true);
//     } else {
//       setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
//     }
//   };

//   const handlePrevious = () => {
//     setCurrentSection((prev) => Math.max(prev - 1, 0));
//   };

//   const handleSectionClick = (index) => {
//     setCurrentSection(index);
//   };

//   const handleFontChange = (e) => {
//     setSelectedFont(e.target.value);
//   };

//    const pdfExportComponent = useRef(null);
//   const downloadAsPDF = () => {
//     if (pdfExportComponent.current) {
//       pdfExportComponent.current.save();
//       // router.push('/dashboard/page')
//     }
//   };

//   const pdfExportOptions = {
//     paperSize: "A4",
//     fileName: "resume.pdf",
//     author: resumeData.firstName + " " + resumeData.lastName,
//     creator: "ATSResume Builder",
//     date: new Date(),
//     scale: 0.7,
//     forcePageBreak: ".page-break"
//   };

//   const router = useRouter();
//   const { id } = router.query;
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Clear the token
//     setIsLoggedIn(false); // Update login state
//   };
//   const getLinkClassName = (path) => {
//     return router.pathname === path
//       ? "flex items-center p-2 bg-violet-900 border-b-2 rounded font-semibold text-white"
//       : "flex items-center p-2 hover:bg-violet-900  border-b-2 rounded font-semibold  ";
//   };

//   const handleFinish = async () => {
//     if (!resumeData) return;

//     // Map resumeData into the required templateData format
//     const templateData = {
//       templateData: {
//         name: resumeData.name || "",
//         position: resumeData.position || "",
//         contactInformation: resumeData.contact || "",
//         email: resumeData.email || "",
//         address: resumeData.address || "",
//         profilePicture: resumeData.profilePicture || "",
//         socialMedia: resumeData.socialMedia?.map((media) => ({
//           socialMedia: media.platform || "",
//           link: media.link || ""
//         })) || [],
//         summary: resumeData.summary || "",
//         education: resumeData.education?.map((edu) => ({
//           school: edu.school || "",
//           degree: edu.degree || "",
//           startYear: edu.startYear || "",
//           endYear: edu.endYear || ""
//         })) || [],
//         workExperience: resumeData.workExperience?.map((exp) => ({
//           company: exp.company || "",
//           position: exp.position || "",
//           description: exp.description || "",
//           KeyAchievements: Array.isArray(exp.keyAchievements) ? exp.keyAchievements : [exp.keyAchievements || ""], // Ensure it's an array
//           startYear: exp.startYear || "",
//           endYear: exp.endYear || ""
//         })) || [],
//         projects: resumeData.projects?.map((project) => ({
//           title: project.title || "",
//           link: project.link || "",
//           description: project.description || "",
//           keyAchievements: Array.isArray(project.keyAchievements) ? project.keyAchievements : [project.keyAchievements || ""], // Ensure it's an array
//           startYear: project.startYear || "",
//           endYear: project.endYear || "",
//           name: project.name || ""
//         })) || [],
//         skills: Array.isArray(resumeData.skills)
//         ? resumeData.skills.map((skill) => ({
//             title: skill.title || "",
//             skills: skill.skills || []
//           }))
//         : [],
//         languages: resumeData.languages || [],
//         certifications: resumeData.certifications || []
//       }
//     };

//     try {
//       // Check if `id` is available, otherwise get it from local storage
//       const id = router.query.id || localStorage.getItem("resumeId");
//       if (!id) {
//         console.error("Resume ID not found.");
//         return;
//       }

//       const url = `https://api.sentryspot.co.uk/api/jobseeker/resume-update/${id}`;
//       const response = await axios.put(url, templateData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//       });

//       console.log('Resume updated successfully:', response.data);
//       if(response.data.code === 200 || response.data.status === "success"){
//         toast.success(response.data.message)
//       }
//       // Uncomment below if you need to redirect after updating
//       // if (response.data) {
//       //   router.push('/dashboard/ai-resume-builder');
//       // }
//     } catch (error) {
//       console.error('Error updating resume:', error);
//     }
//   };

//   return (
//     <>
//       <ResumeContext.Provider
//         value={{
//           resumeData,
//           setResumeData,
//           handleProfilePicture,
//           handleChange,
//           headerColor,
//           backgroundColorss,
//           selectedFont,
//         }}
//       >
//         <Meta
//           title="ATSResume | Get hired with an ATS-optimized resume"
//           description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
//           keywords="ATS-friendly, Resume optimization..."
//         />

//         {!isFinished && (
//           <div className="flex min-h-screen flex flex-col items-center bg-gray-100">
//             <LoadUnload />
//             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//               <MyResume />
//             </Modal>

//             <div>
//               <div className="lg:flex justify-between bg-gray-200 p-2 px-5">
//                 {/* <button
//                 type="button"
//                 onClick={toggleSidebar}
//                 className="p-2 bg-blue-900 text-white rounded-lg"
//               >
//                 {isSidebarOpen ? "☰" : "☰"}
//               </button> */}
//                 <button
//                   type="button"
//                   onClick={handlePrevious}
//                   disabled={currentSection === 0}
//                   className="rounded-lg border-2 bg-blue-950  w-full lg:w-40 text-white px-10 py-1"
//                 >
//                   Previous
//                 </button>

//                 <div className="lg:flex gap- content-center  justify-between bg-gray-200 p-1 px-5 hidden">
//                   <select
//                     value={selectedFont}
//                     onChange={handleFontChange}
//                     className="rounded-lg border-2 border-blue-800 px-8 p- font-bold text-blue-800 lg:block hidden"
//                   >
//                     <option value="Ubuntu">Ubuntu</option>
//                     <option value="Calibri">Calibri</option>
//                     <option value="Georgia">Georgia</option>
//                     <option value="Roboto">Roboto</option>
//                     <option value="Poppins">Poppins</option>
//                   </select>
//                   <ColorPicker
//                     selectedColor={headerColor}
//                     onChange={setHeaderColor}
//                   />
//                   <ColorPickers
//                     selectmultiplecolor={backgroundColorss}
//                     onChange={setBgColor}
//                   />
//                   <TemplateSelector
//                     selectedTemplate={selectedTemplate}
//                     setSelectedTemplate={setSelectedTemplate}
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   className="rounded-lg px-10 font-bold bg-yellow-500 w-full lg:w-40 text-black p-1"
//                 >
//                   {currentSection === sections.length - 1 ? "Finish" : "Next"}
//                 </button>
//               </div>

//               <div
//                 className="flex   md:mx-auto md:h-screen overflow-y-auto"
//                 style={{ fontFamily: selectedFont }}
//               >
//                 <div className="md:flex lg:block hidden">
//                   <aside
//                     className={` h-full bg-gray-100 p-4   transform ${
//                       isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//                     } transition-transform duration-300 ease-in-out`}
//                   >
//                     <ul className="space-y-6 text-center">
//                       {sections.map((section, index) => (
//                         <li
//                           key={index}
//                           className={`p-2 cursor-pointer ${
//                             currentSection === index
//                               ? "rounded-3xl border-y-2 border-blue-800 font-bold bg-blue-950 text-white"
//                               : "border-2 bg-white border-blue-800 rounded-3xl text-blue-800"
//                           }`}
//                           onClick={() => handleSectionClick(index)}
//                         >
//                           {section.label}
//                         </li>
//                       ))}
//                     </ul>
//                   </aside>
//                 </div>

//                 <form className=" p-">
//                   {sections[currentSection].component}
//                 </form>

//                 <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
//                   <div
//                     id="preview-section"
//                     className="bg-white lg:block hidden"
//                   >
//                     <Preview selectedTemplate={selectedTemplate} />
//                   </div>
//                 </PDFExport>
//               </div>
//             </div>
//           </div>
//         )}
//         {isFinished && (
//           <div className="p-">
//             <div className="lg:flex lg:justify-between  bg-gray-200 p-2 px-5">
//               <div className="lg:flex flex-row gap-4 justify-center bg-gray-200">
//                 <select
//                   value={selectedFont}
//                   onChange={handleFontChange}
//                   className="px-4 py-2 border rounded-lg"
//                 >
//                   <option value="Ubuntu">Ubuntu</option>
//                   <option value="Calibri">Calibri</option>
//                   <option value="Georgia">Georgia</option>
//                   <option value="Roboto">Roboto</option>
//                   <option value="Poppins">Poppins</option>
//                 </select>
//                 <ColorPicker
//                   selectedColor={headerColor}
//                   onChange={setHeaderColor}
//                 />
//                 <ColorPickers
//                   selectmultiplecolor={backgroundColorss}
//                   onChange={setBgColor}
//                 />
//                 <TemplateSelector
//                   selectedTemplate={selectedTemplate}
//                   setSelectedTemplate={setSelectedTemplate}
//                 />
//               </div>
//               <button
//                 type="button"
//                 onClick={handleFinish}
//                 // disabled={isFinished} // Optional, disable if already finished
//                 className="bg-blue-950 text-white px-5 py-2 rounded-lg"
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 className="rounded-lg px-10 lg:ms-2 font-bold bg-blue-950 text-white p-1"
//                 onClick={downloadAsPDF}
//               >
//                 Pay & Download
//               </button>
//               <button
//                 href="https://abroadium-arbuild-fe.vercel.app/resume"
//                 type="button"
//                 className="rounded-lg px-10 lg:ms-2 font-bold bg-blue-950 text-white p-1"
//               >
//                 Resume List
//               </button>
//               <button
//                 type="button"
//                 className="rounded-lg px-10 lg:ms-2 font-bold bg-blue-950 text-white p-1"
//                 onClick={handleBack}
//               >
//                 Back
//               </button>
//             </div>

//             <div className="overflow-y-auto md:h-screen mx-auto">
//               <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
//                 <div id="preview-section" className="bg-white">
//                   <Preview selectedTemplate={selectedTemplate} />
//                 </div>
//               </PDFExport>
//             </div>
//           </div>
//         )}
//       </ResumeContext.Provider>
//     </>
//   );
// }

// export { ResumeContext };

import React, { useState, useRef, createContext, useEffect } from "react";
import Language from "../components/form/Language";
import axios from "axios";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import dynamic from "next/dynamic";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import Certification from "../components/form/certification";
import ColorPicker from "./ColorPicker";
import ColorPickers from "./ColorPickers";
import Preview from "../components/preview/Preview";
import TemplateSelector from "../components/preview/TemplateSelector";
import { PDFExport } from "@progress/kendo-react-pdf";
import LoadUnload from "../components/form/LoadUnload";
import MyResume from "./dashboard/MyResume";
import { useRouter } from "next/router";
import Sidebar from "./dashboard/Sidebar";
import { toast } from "react-toastify";
// import LoaderButton from "../components/utility/LoaderButton";
// import useLoader from "../hooks/useLoader";
import Modal from "./adminlogin/Modal";
import { Menu, X } from "lucide-react";
import Link from "next/link";
const ResumeContext = createContext(DefaultResumeData);

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder({ onClose }) {
  const [resumeData, setResumeData] = useState(DefaultResumeData);
  const [formClose, setFormClose] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedFont, setSelectedFont] = useState("Ubuntu");
  const [headerColor, setHeaderColor] = useState("");
  const [backgroundColorss, setBgColor] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isFinished, setIsFinished] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pdfExportComponent = useRef(null);
  // const [isLoading, handleAction] = useLoader();
  const { PayerID } = router.query;
  const [isSaved, setIsSaved] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, []);
  console.log(userId, "userid");
  // Add toggle function
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Load saved state from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load token
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      // Load other persisted states
      const storedIsFinished = localStorage.getItem("isFinished");
      const storedTemplate = localStorage.getItem("selectedTemplate");
      const storedFont = localStorage.getItem("selectedFont");
      const storedBgColor = localStorage.getItem("backgroundColor");
      const storedCurrentSection = localStorage.getItem("currentSection");
      const storedResumeData = localStorage.getItem("resumeData");

      if (storedIsFinished) setIsFinished(JSON.parse(storedIsFinished));
      if (storedTemplate) setSelectedTemplate(storedTemplate);
      if (storedFont) setSelectedFont(storedFont);
      if (storedBgColor) setBgColor(storedBgColor);
      if (storedCurrentSection)
        setCurrentSection(parseInt(storedCurrentSection));
      if (storedResumeData) setResumeData(JSON.parse(storedResumeData));
    }
  }, []);

  // Save states to localStorage whenever they change
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

  // Prevent state reset on page refresh
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = '';
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  useEffect(() => {
    const savedState = localStorage.getItem("isSaved");
    if (savedState === "true") {
      setIsSaved(true);
    }
  }, []);
  useEffect(() => {
    // When resumeData changes, set isSaved to false
    if (isSaved) {
      setIsSaved(false);
      localStorage.setItem("isSaved", "false");
    }
  }, [resumeData]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isSaved) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSaved]);

  // Rest of the code remains the same...
  // (Keep all the existing code below this point unchanged)

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setResumeId(id);
  }, []);

  const sections = [
    { label: "Personal Details", component: <PersonalInformation /> },
    { label: "Social Links", component: <SocialMedia /> },
    { label: "Summary", component: <Summary /> },
    { label: "Education", component: <Education /> },
    { label: "Experience", component: <WorkExperience /> },
    { label: "Projects", component: <Projects /> },
    {
      label: "Skills",
      component: Array.isArray(resumeData?.skills) ? (
        resumeData.skills.map((skill, index) => (
          <Skill title={skill.title} key={index} />
        ))
      ) : (
        <p>No skills available</p>
      ),
    },
    { label: "Languages", component: <Language /> },
    { label: "Certifications", component: <Certification /> },
  ];

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  // const handleNext = () => {
  //   if (currentSection === sections.length - 1) {
  //     setIsFinished(true);
  //   } else {
  //     setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  //   }
  // };
  // Modify the handleNext function to preserve state
  const handleNext = () => {
    if (currentSection === sections.length - 1) {
      // Save current state before switching to finished mode
      localStorage.setItem("tempResumeData", JSON.stringify(resumeData));
      localStorage.setItem("tempHeaderColor", headerColor);
      localStorage.setItem("tempBgColor", backgroundColorss);
      localStorage.setItem("tempFont", selectedFont);
      setIsFinished(true);
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  // Add effect to restore state when entering finished mode
  useEffect(() => {
    if (isFinished) {
      const tempResumeData = localStorage.getItem("tempResumeData");
      const tempHeaderColor = localStorage.getItem("tempHeaderColor");
      const tempBgColor = localStorage.getItem("tempBgColor");
      const tempFont = localStorage.getItem("tempFont");

      if (tempResumeData) setResumeData(JSON.parse(tempResumeData));
      if (tempHeaderColor) setHeaderColor(tempHeaderColor);
      if (tempBgColor) setBgColor(tempBgColor);
      if (tempFont) setSelectedFont(tempFont);
    }
  }, [isFinished]);

  // Add cleanup when component unmounts
  useEffect(() => {
    return () => {
      // Clean up temporary storage
      localStorage.removeItem("tempResumeData");
      localStorage.removeItem("tempHeaderColor");
      localStorage.removeItem("tempBgColor");
      localStorage.removeItem("tempFont");
    };
  }, []);
  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionClick = (index) => {
    setCurrentSection(index);
    setIsMobileMenuOpen(false);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      handleSectionClick(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      handleSectionClick(currentSection - 1);
    }
  };

  const pdfExportOptions = {
    paperSize: "A4",
    fileName: "resume.pdf",
    author: resumeData.firstName + " " + resumeData.lastName,
    creator: "ATSResume Builder",
    date: new Date(),
    scale: 0.7,
    forcePageBreak: ".page-break",
  };

  const downloadAsPDF = async () => {
    let amount;

    if (userId == 121 || userId == 1) {
      amount = 1;
    } else {
      amount = 49;
    }

    // Fixed price

    try {
      // Make the payment API call
      const payload = {
        amount,
        ResumeId: resumeId, // Make sure resumeId is defined in your component
        Token: token || "", // Make sure token is defined in your component
      };

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/paypal/create-payment",
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data, "data");
      if (data && data.data) {
        // Store the order ID for later verification if needed
        const orderId = data.order_id;
        localStorage.setItem("orderid", orderId);

        // Redirect the user to PayPal URL to complete payment
        if (data.data) {
          window.location.href = data.data; // Redirect to PayPal
        } else {
          console.error("Payment URL not found");
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
      // Handle error (show error message to user)
    }
  };

  useEffect(() => {
    if (PayerID) {
      verifyPayment();
    }
  });
  const verifyPayment = async () => {
    try {
      const orderId = localStorage.getItem("orderid");
      const token = localStorage.getItem("token");

      if (orderId && token && PayerID) {
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/paypal/verify-order?orderid=${orderId}`,
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

          // If verification is successful, trigger PDF download
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

  const handleFinish = async () => {
    if (!resumeData) return;

    const templateData = {
      templateData: {
        name: resumeData.name || "",
        position: resumeData.position || "",
        contactInformation: resumeData.contact || "",
        email: resumeData.email || "",
        address: resumeData.address || "",
        profilePicture: resumeData.profilePicture || "",
        socialMedia:
          resumeData.socialMedia?.map((media) => ({
            socialMedia: media.platform || "",
            link: media.link || "",
          })) || [],
        summary: resumeData.summary || "",
        education:
          resumeData.education?.map((edu) => ({
            school: edu.school || "",
            degree: edu.degree || "",
            startYear: edu.startYear || "",
            endYear: edu.endYear || "",
          })) || [],
        workExperience:
          resumeData.workExperience?.map((exp) => ({
            company: exp.company || "",
            position: exp.position || "",
            description: exp.description || "",
            KeyAchievements: Array.isArray(exp.keyAchievements)
              ? exp.keyAchievements
              : [exp.keyAchievements || ""],
            startYear: exp.startYear || "",
            endYear: exp.endYear || "",
          })) || [],
        projects:
          resumeData.projects?.map((project) => ({
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
        skills: Array.isArray(resumeData.skills)
          ? resumeData.skills.map((skill) => ({
              title: skill.title || "",
              skills: skill.skills || [],
            }))
          : [],
        languages: resumeData.languages || [],
        certifications: resumeData.certifications || [],
        // Add template information
        templateDetails: {
          templateId: selectedTemplate,
          backgroundColor: backgroundColorss || "",
          font: selectedFont || "Ubuntu",
        },
      },
    };
    console.log(templateData, "templateData");

    try {
      const id = router.query.id || localStorage.getItem("resumeId");
      if (!id) {
        console.error("Resume ID not found.");
        return;
      }

      const url = `https://api.sentryspot.co.uk/api/jobseeker/resume-update/${id}`;
      const response = await axios.put(url, templateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log("Resume updated successfully:", response.data);
      if (response.data.code === 200 || response.data.status === "success") {
        setIsSaved(true);
        localStorage.setItem("isSaved", "true");
        toast.success(response.data.message || "Resume saved Successfully");
      } else {
        toast.error(response.data.error || "Error while saving the Resume");
      }
    } catch (error) {
      toast.error(error?.message || "Error !!");
      console.error("Error updating resume:", error);
    }
  };

  console.log(resumeData, "Resumedata");

  const MobileNavigation = () => (
    <div className="fixed px-2 bottom-0 left-0 right-0 bg-white shadow-lg py-4 md:hidden">
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          {sections[currentSection].label}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
        >
          {currentSection === sections.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );

  const MobileMenu = () => (
    <div className="md:hidden">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 p-4 pt-16">
          <div className="overflow-y-auto h-full">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => handleSectionClick(index)}
                className={`w-full p-3 mb-2 rounded-lg text-left ${
                  currentSection === index
                    ? "bg-blue-950 text-white"
                    : "bg-gray-100 text-blue-950"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  const handleBackToEditor = () => {
    // Save current state before switching back
    localStorage.setItem("tempResumeData", JSON.stringify(resumeData));
    localStorage.setItem("tempHeaderColor", headerColor);
    localStorage.setItem("tempBgColor", backgroundColorss);
    localStorage.setItem("tempFont", selectedFont);
    setIsFinished(false);
    setCurrentSection(0); // Optionally reset to first section
  };

  // Return your existing JSX
  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        handleProfilePicture,
        handleChange,
        headerColor,
        backgroundColorss,
        selectedFont,
      }}
    >
      <Meta
        title="ATSResume | Get hired with an ATS-optimized resume"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
        keywords="ATS-friendly, Resume optimization..."
      />

      <div className="w-screen bg-gray-50">
        {/* Mobile Components */}
        <MobileMenu />

        {!isFinished ? (
          <div className="w-screen bg-gray-50 flex flex-col">
            <LoadUnload />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <MyResume />
            </Modal>
            {/* Form Navigation Bar */}
            <div
              className="w-full bg-gray-200 p-4 shadow-sm"
              style={{ backgroundColor: "#323159f5" }}
            >
              <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Navigation Buttons */}
                <div className="flex w-full lg:w-auto gap-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentSection === 0}
                    className="w-40 h-10 rounded-lg  bg-gray-600 text-white font-medium transition hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-40 h-10 rounded-lg bg-yellow-500 text-black font-medium transition hover:bg-yellow-400"
                  >
                    {currentSection === sections.length - 1 ? "Finish" : "Next"}
                  </button>
                </div>

                {/* Controls Group */}
                <div className="hidden lg:flex items-center gap-4">
                  <select
                    value={selectedFont}
                    onChange={handleFontChange}
                    className="w-40 h-10 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 bg-white focus:ring-2 focus:ring-blue-800"
                  >
                    <option value="Ubuntu">Ubuntu</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Poppins">Poppins</option>
                  </select>

                  <div className="flex items-center gap-4">
                    <ColorPicker
                      selectedColor={headerColor}
                      onChange={setHeaderColor}
                    />
                    <ColorPickers
                      selectmultiplecolor={backgroundColorss}
                      onChange={setBgColor}
                    />
                    <TemplateSelector
                      selectedTemplate={selectedTemplate}
                      setSelectedTemplate={setSelectedTemplate}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Top Navigation */}
            <div className="sticky top-0 z-10 w-full bg-white shadow-sm">
              <div className="hidden md:flex justify-center items-center p-4">
                <nav className="bg-gray-100 rounded-lg p-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => prevSection()}
                      className="p-2 hover:bg-gray-200 rounded-lg hidden md:block"
                      disabled={currentSection === 0}
                    >
                      {/* Chevron Left Icon Here */}
                    </button>

                    <div className="flex-1 overflow-x-auto scrollbar-hide ">
                      <ul className="flex flex-row gap-3 items-center py-2 px-4  ">
                        {sections.map((section, index) => (
                          <li
                            key={index}
                            className={`px-4 py-2 cursor-pointer transition rounded-lg border-2 ${
                              currentSection === index
                                ? "border-blue-800 font-semibold bg-blue-950 text-white"
                                : "border-blue-800 bg-white text-blue-800 hover:bg-blue-50"
                            }`}
                            onClick={() => handleSectionClick(index)}
                          >
                            {section.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => nextSection()}
                      className="p-2 hover:bg-gray-200 rounded-lg hidden md:block"
                      disabled={currentSection === sections.length - 1}
                    >
                      {/* Chevron Right Icon Here */}
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div
              className="flex flex-col md:flex-row flex-grow "
              style={{ backgroundColor: "#323159f5" }}
            >
              <div className="ml-2">
                <Link href="https://abroadium-arbuild-fe.vercel.app/dashboard">
                  <button
                    type="button"
                    className="w-40 h-10 rounded-lg bg-yellow-500 text-black font-medium transition hover:bg-yellow-400"
                  >
                    Back to Dashboard
                  </button>
                </Link>
              </div>
              {/* Sidebar */}
              {/* <aside className="hidden md:block w-64 min-h-screen border-r bg-gray-100">
                    <div className="sticky top-20 p-4">
                      <Sidebar />
                    </div>
                  </aside> */}
              <button
                onClick={toggleMobileSidebar}
                className="fixed z-40 bottom-20 right-4 md:hidden bg-blue-950 text-white p-3 rounded-full shadow-lg"
              >
                {isMobileSidebarOpen ? (
                  <X className="h-6 w-6 stroke-2" />
                ) : (
                  <Menu className="h-6 w-6 stroke-2" />
                )}
              </button>

              {/* Mobile Sidebar Overlay */}
              {isMobileSidebarOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                  onClick={toggleMobileSidebar}
                />
              )}

              {/* Updated Sidebar */}
              {/* <aside
                className={`fixed md:static left-0 top-0 h-full z-10 transform 
                                ${
                                  isMobileSidebarOpen
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                                } 
                                md:translate-x-0 transition-transform duration-300 ease-in-out 
                                w-64 bg-gray-100 border-r`}
              >
                <div className="sticky top-20 p-4 overflow-y-auto h-full">
                

                
                </div>
              </aside> */}

              {/* Form Content */}
              <main className=" max-w-2xl mx-auto md:p-4">
                <form>{sections[currentSection].component}</form>
              </main>

              {/* Preview Panel */}
              <aside className="hidden md:block w-3/2 min-h-screen border-l bg-gray-50">
                <div className="sticky top-20 p-4">
                  <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
                    <Preview selectedTemplate={selectedTemplate} />
                  </PDFExport>
                </div>
              </aside>
            </div>

            {/* Mobile Navigation */}
            <MobileNavigation />
          </div>
        ) : (
          // Finished State
          <div className=" flex flex-col">
            {/* Mobile Finished Controls */}
            <div className="flex flex-col gap-4 p-2 md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
              {/* <LoaderButton
                isLoading={isLoading}
                onClick={handleFinish}
                className="bg-blue-950 text-white px-4 py-2 rounded-lg"
              >
                Save Resume
              </LoaderButton> */}
              <button
                onClick={handleFinish}
                className="bg-blue-950 text-white px-6 py-2 rounded-lg"
              >
                Save Resume
              </button>
              <button
                onClick={downloadAsPDF}
                className=" bg-yellow-500 text-black px-4 py-2 rounded-lg"
              >
                Pay & Download
              </button>
              <button
                onClick={handleBackToEditor}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>

            {/* Desktop Controls - Hidden on Mobile */}
            <div className="hidden md:flex w-screen px-8 py-4 justify-between items-center bg-white shadow">
              <div className="flex gap-4">
                <select
                  value={selectedFont}
                  onChange={handleFontChange}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
                <ColorPicker
                  selectedColor={headerColor}
                  onChange={setHeaderColor}
                />
                <ColorPickers
                  selectmultiplecolor={backgroundColorss}
                  onChange={setBgColor}
                />
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleFinish}
                  className="bg-blue-950 text-white px-6 py-2 rounded-lg"
                >
                  Save Resume
                </button>
                <button
                  onClick={downloadAsPDF}
                  className="bg-yellow-500 text-black px-6 py-2 rounded-lg"
                >
                  Pay & Download
                </button>
                <button
                  onClick={handleBackToEditor}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="pb-28">
              <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
                <Preview selectedTemplate={selectedTemplate} />
              </PDFExport>
            </div>
          </div>
        )}
      </div>
    </ResumeContext.Provider>
  );
}

export { ResumeContext };
