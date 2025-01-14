// import React, { useState, useRef, useEffect, useContext } from "react";
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
// // import ColorPicker from "./ColorPicker";
// import ColorPickers from "./ColorPickers";
// import Preview from "../components/preview/Preview";
// import TemplateSelector from "../components/preview/TemplateSelector";
// import { PDFExport } from "@progress/kendo-react-pdf";
// import LoadUnload from "../components/form/LoadUnload";
// import MyResume from "./dashboard/MyResume";
// import { useRouter } from "next/router";
// import Sidebar from "./dashboard/Sidebar";
// import { toast } from "react-toastify";
// import LoaderButton from "../components/utility/LoaderButton";
// import useLoader from "../hooks/useLoader";
// import Modal from "./adminlogin/Modal";
// import { Menu, X } from 'lucide-react';
// import Image from "next/image";
// import { ResumeContext } from "../components/context/ResumeContext";
// // import resumeImg from "./builderImages/GraphicDesignerResume.jpg";
// // import poweredbypaypal from "./builderImages/poweredbypaypal.png";
// // import paypal from "./builderImages/paypal.png";
// // import logo from "./builderImages/logo.jpg";
// // import applepay from "./builderImages/apple-pay.png";

// const Print = dynamic(() => import("../components/utility/WinPrint"), {
//   ssr: false,
// });

// export default function WebBuilder() {
//   // const [resumeData, setResumeData] = useState(DefaultResumeData);
//   const [formClose, setFormClose] = useState(false);
//   const [currentSection, setCurrentSection] = useState(0);
//   // const [selectedFont, setSelectedFont] = useState("Ubuntu");
//   // const [headerColor, setHeaderColor] = useState("");
//   // const [backgroundColorss, setBgColor] = useState("");
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [isFinished, setIsFinished] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [token, setToken] = useState(null);
//   const [resumeId, setResumeId] = useState(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const router = useRouter();
//   const pdfExportComponent = useRef(null);
//   const [isLoading, handleAction] = useLoader();
//   const { PayerID } = router.query;
//   const [isSaved, setIsSaved] = useState(false);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
//   const [userId, setUserId] = useState(0);
//   const templateRef = useRef(null);
//   const {resumeData ,setResumeData, setHeaderColor,setBgColor,setSelectedFont,selectedFont,backgroundColorss,headerColor} = useContext(ResumeContext)

//   useEffect(() => {
//     setUserId(localStorage.getItem("user_id"));
//   }, []);

//   const toggleMobileSidebar = () => {
//     setIsMobileSidebarOpen(!isMobileSidebarOpen);
//   };

//   useEffect(() => {
//     const fetchResumeData = async () => {
//       const { id } = router.query;
//       const token = localStorage.getItem('token');

//       if (id && token) {
//         try {
//           const response = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/resume-list/${id}`, {
//             headers: {
//               Authorization: token,
//             },
//           });

//           if (response.data.status === 'success') {
//             const { data } = response.data;
//             // const parsedData = JSON.parse(data.ai_resume_parse_data);
//             const parsedData = (data.ai_resume_parse_data);
            
//             // Update state with fetched data
//             setResumeData(parsedData.templateData);
            
//             // Set background color and template
//             if (parsedData.templateData.templateDetails) {
//               setBgColor(parsedData.templateData.templateDetails.backgroundColor || '');
//               setHeaderColor(parsedData.templateData.templateDetails.backgroundColor || '' );
//               setSelectedTemplate(parsedData.templateData.templateDetails.templateId || 'template1');
//             }
//           }
//         } catch (error) {
//           console.error('Error fetching resume data:', error);
//           toast.error('Failed to fetch resume data');
//         }
//       }
//     };

//     fetchResumeData();
//   }, [router.query]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedToken = localStorage.getItem("token");
//       setToken(storedToken);

//       const storedIsFinished = localStorage.getItem("isFinished");
//       const storedTemplate = localStorage.getItem("selectedTemplate");
//       const storedFont = localStorage.getItem("selectedFont");
//       // const storedBgColor = localStorage.getItem("backgroundColor");
//       const storedCurrentSection = localStorage.getItem("currentSection");
//       // const storedResumeData = localStorage.getItem("resumeData");

//       if (storedIsFinished) setIsFinished(JSON.parse(storedIsFinished));
//       if (storedTemplate && !selectedTemplate) setSelectedTemplate(storedTemplate);
//       if (storedFont) setSelectedFont(storedFont);
//       // if (storedBgColor && !backgroundColorss) setBgColor(storedBgColor);
//       if (storedCurrentSection !== null)
//         setCurrentSection(parseInt(storedCurrentSection));
//       // if (storedResumeData && !resumeData) setResumeData(JSON.parse(storedResumeData));
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("isFinished", JSON.stringify(isFinished));
//       localStorage.setItem("selectedTemplate", selectedTemplate);
//       localStorage.setItem("selectedFont", selectedFont);
//       localStorage.setItem("headerColor", headerColor);
//       // localStorage.setItem("backgroundColor", backgroundColorss);
//       // localStorage.setItem("currentSection", currentSection.toString());
//       // localStorage.setItem("resumeData", JSON.stringify(resumeData));
//     }
//   }, [
//     isFinished,
//     selectedTemplate,
//     selectedFont,
//     headerColor,
//     // backgroundColorss,
//     // currentSection,
//     // resumeData,
//   ]);

//   useEffect(() => {
//     const savedState = localStorage.getItem("isSaved");
//     if (savedState === "true") {
//       setIsSaved(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (isSaved) {
//       setIsSaved(false);
//       localStorage.setItem("isSaved", "false");
//     }
//   }, [resumeData]);

//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (!isSaved) {
//         e.preventDefault();
//         e.returnValue =
//           "You have unsaved changes. Are you sure you want to leave?";
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [isSaved]);

//   useEffect(() => {
//     const path = window.location.pathname;
//     const id = path.split("/").pop();
//     setResumeId(id);
//   }, []);

//   const sections = [
//     { label: "Personal Details", component: <PersonalInformation /> },
//     { label: "Social Links", component: <SocialMedia /> },
//     { label: "Summary", component: <Summary /> },
//     { label: "Education", component: <Education /> },
//     { label: "Experience", component: <WorkExperience /> },
//     { label: "Projects", component: <Projects /> },
//     {
//       label: "Skills",
//       component: Array.isArray(resumeData?.skills) ? (
//         resumeData.skills.map((skill, index) => (
//           <Skill title={skill.title} key={index} />
//         ))
//       ) : (
//         <p>No skills available</p>
//       ),
//     },
//     { label: "Languages", component: <Language /> },
//     { label: "Certifications", component: <Certification /> },
//   ];

//   // const handleProfilePicture = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file instanceof Blob) {
//   //     const reader = new FileReader();
//   //     reader.onload = (event) => {
//   //       setResumeData({ ...resumeData, profilePicture: event.target.result });
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   const handleChange = (e) => {
//     setResumeData({ ...resumeData, [e.target.name]: e.target.value });
//   };

//   const handleNext = () => {
//     handleFinish()
//     if (currentSection === sections.length - 1) {
//       localStorage.setItem("tempResumeData", JSON.stringify(resumeData));
//       localStorage.setItem("tempHeaderColor", headerColor);
//       localStorage.setItem("tempBgColor", backgroundColorss);
//       localStorage.setItem("tempFont", selectedFont);
//       setIsFinished(true);

//     } else {
//       setCurrentSection((prev) => {
//         const updatedSection = Math.min(prev + 1, sections.length - 1)
//         localStorage.setItem("currentSection", updatedSection)
//         return updatedSection;
//       });
//     }
//   };

//   useEffect(() => {
//     if (isFinished) {
//       const tempResumeData = localStorage.getItem("tempResumeData");
//       // const tempHeaderColor = localStorage.getItem("tempHeaderColor");
//       // const tempBgColor = localStorage.getItem("tempBgColor");
//       const tempFont = localStorage.getItem("tempFont");

//       if (tempResumeData) setResumeData(JSON.parse(tempResumeData));
//       // if (tempHeaderColor) setHeaderColor(tempHeaderColor);
//       // if (tempBgColor) setBgColor(tempBgColor);
//       if (tempFont) setSelectedFont(tempFont);
//     }
//   }, [isFinished]);

//   useEffect(() => {
//     return () => {
//       localStorage.removeItem("tempResumeData");
//       localStorage.removeItem("tempHeaderColor");
//       localStorage.removeItem("tempBgColor");
//       localStorage.removeItem("tempFont");
//     };
//   }, []);

//   const handlePrevious = () => {
//     setCurrentSection((prev) => {
//       const updatedSection = Math.max(prev - 1, 0);
//       localStorage.setItem("currentSection", updatedSection)
//       return updatedSection
//     });
//   };

//   const handleSectionClick = (index) => {
//     handleFinish()
//     localStorage.setItem("currentSection", index)
//     setCurrentSection(index);
//     setIsMobileMenuOpen(false);
//   };

//   const handleFontChange = (e) => {
//     setSelectedFont(e.target.value);
//   };

//   const nextSection = () => {
//     handleFinish()
//     if (currentSection < sections.length - 1) {
//       handleSectionClick(currentSection + 1);
//     }
//   };

//   const prevSection = () => {
//     handleFinish()
//     if (currentSection > 0) {
//       handleSectionClick(currentSection - 1);
//     }
//   };

//   const pdfExportOptions = {
//     paperSize: "A4",
//     fileName: "resume.pdf",
//     author: resumeData.firstName + " " + resumeData.lastName,
//     creator: "ATSResume Builder",
//     date: new Date(),
//     scale: 0.8,
//     forcePageBreak: ".page-break",
//   };

//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => setShowModal(false);
//   const handleShowModal = () => setShowModal(true);

//   const downloadAsPDF = async () => {
//     handleFinish()
//     if (!templateRef.current) {
//       toast.error("Template reference not found");
//       return;
//     }
  
//     try {
//       // Get the HTML content from the template
//       const htmlContent = templateRef.current.innerHTML;
  
//       // Generate the full HTML for the PDF
//       const fullContent = `
//         <style>
//           @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
//         </style>
//         ${htmlContent}
//       `;
  
//       // API call to generate the PDF
//       const response = await axios.post(
//         'https://api.sentryspot.co.uk/api/jobseeker/generate-pdf1',
//         { html: fullContent },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: token,
//           },
//         }
//       );
  
//       // Check if the file path was returned
//       // const filePath = response.data.data?.file_path;
//       // if (!filePath) {
//       //   throw new Error('PDF file path not received');
//       // }
  
//       // Construct the URL
//       // const downloadUrl = `https://api.resumeintellect.com${filePath}`;
  
//       // Open the URL in a new tab
//       // createPayment();
//       downloadPDF()
//       // window.open(downloadUrl, '_blank');
  
//       // toast.success('PDF generated and opened in a new tab!');
//     } catch (error) {
//       console.error('PDF generation error:', error);
//       toast.error(
//         error.response?.data?.message || 'Failed to generate and open PDF'
//       );
//     }
//   };
//   const createPayment = async () => {
//     const amount = 49; // Fixed price

//     try {
//       // Make the payment API call
//       const payload = {
//         amount,
//         ResumeId: resumeId, // Make sure resumeId is defined in your component
//         Token: token || '' // Make sure token is defined in your component
//       };

//       const response = await axios.post(
//         'https://api.sentryspot.co.uk/api/jobseeker/paypal/create-payment',
//         payload,
//         {
//           headers: {
//              Authorization:token,
//             'Content-Type': 'application/json' }
//         }
//       );

//       const data = response.data;
//       console.log(data,"data");
//       if (data && data.data) {
//         // Store the order ID for later verification if needed
//         const orderId = data.order_id;
//         localStorage.setItem("orderid", orderId);

//         // Redirect the user to PayPal URL to complete payment
//         if (data.data) {
//           window.location.href = data.data; // Redirect to PayPal
//         } else {
//           console.error("Payment URL not found");
//         }
//       }
//     } catch (error) {
//       console.error('Payment Error:', error);
//       // Handle error (show error message to user)
//     }
//   };
 
//   useEffect(() => {
//     if (PayerID) {
//       verifyPayment();
//     }
//   }, [PayerID]);

//   const verifyPayment = async () => {
//     try {
//       const orderId = localStorage.getItem("orderid");
//       const token = localStorage.getItem("token");

//       if (orderId && token && PayerID) {
//         const response = await axios.get(
//           `https://api.sentryspot.co.uk/api/jobseeker/paypal/verify-order?orderid=${orderId}`,
//           {
//             headers: {
//               Authorization: token,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data.status === "success") {
//           setPaymentVerified(true);
//           toast.success("Payment verified successfully!");

//           localStorage.removeItem("orderid");
//           await downloadPDF(orderId, resumeId, token);
//         } else {
//           toast.error("Payment verification failed. Please try again.");
//           router.push("/payment-failed");
//         }
//       }
//     } catch (error) {
//       console.error("Payment Verification Error:", error);
//       toast.error(
//         error?.response?.data?.message || "Payment verification failed"
//       );
//       router.push("/payment-failed");
//     }
//   };

//   const downloadPDF = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/download-file/11/${resumeId}`,
//         {
//           headers: {
//             Authorization: token,
//           },
//           responseType: "blob", // Important for file download
//         }
//       );
  
//       const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
//       const link = document.createElement("a");
//       link.href = url;
  
//       // Set the file name
//       link.setAttribute("download", `resume.pdf`);
//       document.body.appendChild(link);
//       link.click();
  
//       // Cleanup
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
  
//       toast.success("PDF downloaded successfully!");
//     } catch (error) {
//       console.error("PDF Download Error:", error);
//       toast.error("Failed to download the PDF. Please try again.");
//     }
//   };

//   const handleFinish = async () => {
//     if (!resumeData) return;
  
//     const templateData = {
//       templateData: {
//         name: resumeData.name || "",
//         position: resumeData.position || "",
//         contactInformation: resumeData.contactInformation || "",
//         email: resumeData.email || "",
//         address: resumeData.address || "",
//         profilePicture: resumeData.profilePicture || "",
//         socialMedia:
//           resumeData.socialMedia?.map((media) => ({
//             socialMedia: media.platform || "",
//             link: media.link || "",
//           })) || [],
//         summary: resumeData.summary || "",
//         education:
//           resumeData.education?.map((edu) => ({
//             school: edu.school || "",
//             degree: edu.degree || "",
//             startYear: edu.startYear || "",
//             endYear: edu.endYear || "",
//           })) || [],
//         workExperience:
//           resumeData.workExperience?.map((exp) => ({
//             company: exp.company || "",
//             position: exp.position || "",
//             description: exp.description || "",
//             KeyAchievements: Array.isArray(exp.keyAchievements)
//               ? exp.keyAchievements
//               : [exp.keyAchievements || ""],
//             startYear: exp.startYear || "",
//             endYear: exp.endYear || "",
//           })) || [],
//         projects:
//           resumeData.projects?.map((project) => ({
//             title: project.title || "",
//             link: project.link || "",
//             description: project.description || "",
//             keyAchievements: Array.isArray(project.keyAchievements)
//               ? project.keyAchievements
//               : [project.keyAchievements || ""],
//             startYear: project.startYear || "",
//             endYear: project.endYear || "",
//             name: project.name || "",
//           })) || [],
//         skills: Array.isArray(resumeData.skills)
//           ? resumeData.skills.map((skill) => ({
//               title: skill.title || "",
//               skills: skill.skills || [],
//             }))
//           : [],
//         languages: resumeData.languages || [],
//         certifications: resumeData.certifications || [],
//         templateDetails: {
//           templateId: selectedTemplate,
//           backgroundColor: backgroundColorss || "",
//           font: selectedFont || "Ubuntu",
//         },
//       },
//     };
  
//     // Generate HTML content for the PDF
//     const htmlContent = templateRef?.current?.innerHTML;
//     if (!htmlContent) {
//       toast.error("Error: Template content is missing.");
//       return;
//     }
  
//     const resumeHtml = `
//       <style>
//         @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
//       </style>
//       ${htmlContent}
//     `;
  
//     await handleAction(async () => {
//       try {
//         const id = router.query.id || localStorage.getItem("resumeId");
//         if (!id) {
//           console.error("Resume ID not found.");
//           toast.error("Error: Resume ID is missing.");
//           return;
//         }
  
//         const url = `https://api.sentryspot.co.uk/api/jobseeker/resume-update/${id}`;
//         const response = await axios.put(url, { ...templateData, resume_html: resumeHtml }, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//         });
  
//         if (response.data.code === 200 || response.data.status === "success") {
//           setIsSaved(true);
//           localStorage.setItem("isSaved", "true");
//           toast.success(response.data.message || "Resume saved successfully.");
//         } else {
//           toast.error(response.data.error || "Error while saving the resume.");
//         }
//       } catch (error) {
//         toast.error(error?.response?.data?.message || "An error occurred.");
//         console.error("Error updating resume:", error);
//       }
//     });
//   };
  
  

 

//   const handleBackToEditor = () => {
//     // localStorage.setItem("tempResumeData", JSON.stringify(resumeData));
//     localStorage.setItem("tempHeaderColor", headerColor);
//     localStorage.setItem("tempBgColor", backgroundColorss);
//     localStorage.setItem("tempFont", selectedFont);
//     setIsFinished(false);
//   };

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const userProfileResponse = await axios.get(
//           "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );

//         if (userProfileResponse.data.status === "success") {
//           const userData = userProfileResponse.data.data;
//           setFormData((prevData) => ({
//             ...prevData,
//             first_name: userData.first_name || "",
//             last_name: userData.last_name || "",
//             phone: userData.phone || "",
//             email: userData.email || "",
//           }));
//         }
//       } catch (error) {
//         console.error("An error occurred while fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   // console.log(resumeData,"");

//   return (
//     <>
//       <Meta
//         title="Abroadium - AI Resume Builder"
//         description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
//         keywords="ATS-friendly, Resume optimization..."
//       />

//       <div className="min-h-screen bg-gray-50">
       

//         {!isFinished ? (
//           <div className="min-h-screen bg-gray-50 flex flex-col">
//             <div className="w-full bg-gray-200 p-4 shadow-sm">
//               <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-4">
//                 <div className="flex w-full lg:w-auto gap-4">
//                   <button
//                     type="button"
//                     onClick={handlePrevious}
//                     disabled={currentSection === 0}
//                     className="w-40 h-10 rounded-lg bg-blue-950 text-white font-medium transition hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Previous
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleNext}
//                     className="w-40 h-10 rounded-lg bg-yellow-500 text-black font-medium transition hover:bg-yellow-400"
//                   >
//                     {currentSection === sections.length - 1 ? "Finish" : "Next"}
//                   </button>
//                 </div>

//                 <div className="hidden lg:flex items-center gap-4">
//                   <select
//                     value={selectedFont}
//                     onChange={handleFontChange}
//                     className="w-40 h-10 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 bg-white focus:ring-2 focus:ring-blue-800"
//                   >
//                     <option value="Ubuntu">Ubuntu</option>
//                     <option value="Calibri">Calibri</option>
//                     <option value="Georgia">Georgia</option>
//                     <option value="Roboto">Roboto</option>
//                     <option value="Poppins">Poppins</option>
//                   </select>

//                   <div className="flex items-center gap-4">
//                     {/* <ColorPicker
//                       selectedColor={headerColor}
//                       onChange={setHeaderColor}
//                     /> */}
//                     <ColorPickers
//                       selectmultiplecolor={backgroundColorss}
//                       onChange={setBgColor}
//                     />
//                     <TemplateSelector
//                       selectedTemplate={selectedTemplate}
//                       setSelectedTemplate={setSelectedTemplate}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="sticky top-0 z-10 w-full bg-white shadow-sm">
//               <div className="hidden md:flex justify-center items-center p-4">
//                 <nav className="bg-gray-100 rounded-lg p-2">
//                   <div className="flex items-center">
//                     <button
//                       onClick={() => prevSection()}
//                       className="p-2 hover:bg-gray-200 rounded-lg "
//                       disabled={currentSection === 0}
//                     >
//                       {/* Chevron Left Icon Here */}
//                     </button>

//                     <div className="flex-1 overflow-x-auto scrollbar-hide ">
//                       <ul className="flex flex-row gap-3 items-center py-2 px-4  ">
//                         {sections.map((section, index) => (
//                           <li
//                             key={index}
//                             className={`px-4 py-2 cursor-pointer transition rounded-lg border-2 ${
//                               currentSection === index
//                                 ? "border-blue-800 font-semibold bg-blue-950 text-white"
//                                 : "border-blue-800 bg-white text-blue-800 hover:bg-blue-50"
//                             }`}
//                             onClick={() => handleSectionClick(index)}
//                           >
//                             {section.label}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <button
//                       onClick={() => nextSection()}
//                       className="p-2 hover:bg-gray-200 rounded-lg "
//                       disabled={currentSection === sections.length - 1}
//                     >
//                       {/* Chevron Right Icon Here */}
//                     </button>
//                   </div>
//                 </nav>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row flex-grow p-4">
            

             

//               <div className="w-[40%] "
//                style={{ backgroundColor: "#323159f5" }}
//               >

//               <main className="w-full mx-auto md:p-4">
//                 <form>{sections[currentSection].component}</form>
//               </main>
//               </div>

//               <aside className="  w-[60%] min-h-screen border-l bg-gray-50">
//                 <div className="sticky top-20 p-4">
                 
//                     <Preview ref={templateRef} selectedTemplate={selectedTemplate} />
                 
//                 </div>
//               </aside>
//             </div>

//           </div>
//         ) : (
//           <div className=" flex flex-col">
            

//             <div className="hidden md:flex w-screen px-8 py-4 justify-between items-center bg-white shadow">
//               <div className="flex gap-4">
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
//                 {/* <ColorPicker
//                   selectedColor={headerColor}
//                   onChange={setHeaderColor}
//                 /> */}
//                 <ColorPickers
//                   selectmultiplecolor={backgroundColorss}
//                   onChange={setBgColor}
//                 />
//                 <TemplateSelector
//                   selectedTemplate={selectedTemplate}
//                   setSelectedTemplate={setSelectedTemplate}
//                 />
//               </div>
//               <div className="flex gap-4">
//                 <button
//                   onClick={handleFinish}
//                   className="bg-blue-950 text-white px-6 py-2 rounded-lg"
//                 >
//                   Save Resume
//                 </button>
//                 <button
//                   onClick={downloadAsPDF}
//                   className="bg-yellow-500 text-black px-6 py-2 rounded-lg"
//                 >
//                   Pay & Download
//                 </button>
//                 {showModal && (
//                   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//                     <div className=" w-full max-w-4xl bg-white rounded-lg shadow-lg ">
//                       <div className="flex justify-between items-center p-2">
//                         <Image src={logo} alt="logo" className="h-10 w-auto" />
//                         <button
//                           className=" text-gray-600 hover:text-gray-800 z-20"
//                           onClick={handleCloseModal}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth="2"
//                             stroke="currentColor"
//                             className="w-6 h-6"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M6 18L18 6M6 6l12 12"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                       <div className="flex flex-col md:flex-row">
//                         <div className="md:w-1/2 w-full p-4  ">
//                           <div className="w-[400px] h-[400px]">
//                             <Image
//                               src={resumeImg}
//                               alt="resumeimg"
//                               className="w- full h-full rounded-l-lg"
//                             />
//                           </div>
//                         </div>

//                         <div className="md:w-1/2 w-full p-4 ">
//                           <div className="text-center mb-6">
//                             <h2 className="text-2xl font-bold text-gray-900">
//                               $49
//                             </h2>
//                             <p className="text-sm text-gray-500">
//                               Total Amount
//                             </p>
//                           </div>

//                           <form>
//                             <div className="mb-4">
//                               <label className="block text-gray-800 mb-2">
//                                 👨🏻‍💼 Name
//                               </label>
//                               <input
//                                 type="text"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                                 value={`${formData.first_name} ${formData.last_name}`.trim()}
//                                 name="full name"
//                                 required
//                                 disabled
//                               />
//                             </div>
//                             <div className="mb-4">
//                               <label className="block text-gray-800 mb-2">
//                                 📧 Email
//                               </label>
//                               <input
//                                 type="email"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                                 value={formData.email}
//                                 required
//                                 name="email"
//                                 disabled
//                               />
//                             </div>
//                             <div className="mb-4">
//                               <label className="block text-gray-800 mb-2">
//                                 ☎️ Phone
//                               </label>
//                               <input
//                                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                                 required
//                                 disabled
//                                 type="number"
//                                 name="phone"
//                                 value={formData.phone}
//                               />
//                             </div>

//                             <div className="flex justify-center mt-6">
//                               <button
//                                 onClick={downloadAsPDF}
//                                 type="submit"
//                                 className="w-full bg-yellow-400 text-blue-800 font-bold  rounded-[50px] hover:bg-yellow-500 transition duration-200"
//                               >
//                                 <Image
//                                   src={paypal}
//                                   alt="paypal"
//                                   className="h-10 w-auto m-auto"
//                                 />
//                               </button>
//                             </div>
//                             <div className="flex justify-center mt-6">
//                               <button className="w-full bg-black text-white font-bold  rounded-[50px] transition duration-200  ">
//                                 <Image
//                                   src={applepay}
//                                   alt="apple pay"
//                                   className=" w-auto m-auto h-10"
//                                 />
//                               </button>
//                             </div>
//                             <div className="flex justify-center mt-6 ">
//                               <Image
//                                 src={poweredbypaypal}
//                                 alt="poweredbypaypal"
//                                 className="h-10 w-auto"
//                               />
//                             </div>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <button
//                   onClick={handleBackToEditor}
//                   className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
//                 >
//                   Back to Dashboard
//                 </button>
//               </div>
//             </div>

//             <div className="z-10">
            
//                 <Preview ref={templateRef} selectedTemplate={selectedTemplate} />
            
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import React, { useState, useRef, useEffect, useContext } from "react";
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
import ColorPickers from "./ColorPickers";
import Preview from "../components/preview/Preview";
import TemplateSelector from "../components/preview/TemplateSelector";
import { PDFExport } from "@progress/kendo-react-pdf";
import LoadUnload from "../components/form/LoadUnload";
import MyResume from "./dashboard/MyResume";
import { useRouter } from "next/router";
import Sidebar from "./dashboard/Sidebar";
import { toast } from "react-toastify";
import LoaderButton from "../components/utility/LoaderButton";
import useLoader from "../hooks/useLoader";
import Modal from "./adminlogin/Modal";
import { Menu, X } from 'lucide-react';
import Image from "next/image";
import { ResumeContext } from "../components/context/ResumeContext";

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function WebBuilder() {
  const [formClose, setFormClose] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isFinished, setIsFinished] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pdfExportComponent = useRef(null);
  const [isLoading, handleAction] = useLoader();
  const { PayerID } = router.query;
  const [isSaved, setIsSaved] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const templateRef = useRef(null);
  const {resumeData, setResumeData, setHeaderColor, setBgColor, setSelectedFont, selectedFont, backgroundColorss, headerColor} = useContext(ResumeContext)

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchResumeData = async () => {
      const { id } = router.query;
      const token = localStorage.getItem('token');

      if (id && token) {
        try {
          const response = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/resume-list/${id}`, {
            headers: {
              Authorization: token,
            },
          });

          if (response.data.status === 'success') {
            const { data } = response.data;
            const parsedData = (data.ai_resume_parse_data);
            
            setResumeData(parsedData.templateData);
            
            if (parsedData.templateData.templateDetails) {
              setBgColor(parsedData.templateData.templateDetails.backgroundColor || '');
              setHeaderColor(parsedData.templateData.templateDetails.backgroundColor || '');
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

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    handleFinish()
    if (currentSection === sections.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionClick = (index) => {
    handleFinish()
    setCurrentSection(index);
    setIsMobileMenuOpen(false);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const nextSection = () => {
    handleFinish()
    if (currentSection < sections.length - 1) {
      handleSectionClick(currentSection + 1);
    }
  };

  const prevSection = () => {
    handleFinish()
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
    scale: 0.8,
    forcePageBreak: ".page-break",
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const downloadAsPDF = async () => {
    handleFinish()
    if (!templateRef.current) {
      toast.error("Template reference not found");
      return;
    }
  
    try {
      const htmlContent = templateRef.current.innerHTML;
  
      const fullContent = `
        <style>
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        </style>
        ${htmlContent}
      `;
  
      const response = await axios.post(
        'https://api.sentryspot.co.uk/api/jobseeker/generate-pdf1',
        { html: fullContent },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
  
      downloadPDF()
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to generate and open PDF'
      );
    }
  };

  const createPayment = async () => {
    const amount = 49;

    try {
      const payload = {
        amount,
        ResumeId: resumeId,
        Token: token || ''
      };

      const response = await axios.post(
        'https://api.sentryspot.co.uk/api/jobseeker/paypal/create-payment',
        payload,
        {
          headers: {
             Authorization:token,
            'Content-Type': 'application/json' }
        }
      );

      const data = response.data;
      console.log(data,"data");
      if (data && data.data) {
        const orderId = data.order_id;
        localStorage.setItem("orderid", orderId);

        if (data.data) {
          window.location.href = data.data;
        } else {
          console.error("Payment URL not found");
        }
      }
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };
 
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
          await downloadPDF(orderId, resumeId, token);
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

  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/download-file/11/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
          responseType: "blob",
        }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
  
      link.setAttribute("download", `resume.pdf`);
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF Download Error:", error);
      toast.error("Failed to download the PDF. Please try again.");
    }
  };

  const handleFinish = async () => {
    if (!resumeData) return;
  
    const templateData = {
      templateData: {
        name: resumeData.name || "",
        position: resumeData.position || "",
        contactInformation: resumeData.contactInformation || "",
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
        templateDetails: {
          templateId: selectedTemplate,
          backgroundColor: backgroundColorss || "",
          font: selectedFont || "Ubuntu",
        },
      },
    };
  
    const htmlContent = templateRef?.current?.innerHTML;
    if (!htmlContent) {
      toast.error("Error: Template content is missing.");
      return;
    }
  
    const resumeHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;
  
    await handleAction(async () => {
      try {
        const id = router.query.id || resumeId;
        if (!id) {
          console.error("Resume ID not found.");
          toast.error("Error: Resume ID is missing.");
          return;
        }
  
        const url = `https://api.sentryspot.co.uk/api/jobseeker/resume-update/${id}`;
        const response = await axios.put(url, { ...templateData, resume_html: resumeHtml }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
  
        if (response.data.code === 200 || response.data.status === "success") {
          setIsSaved(true);
          toast.success(response.data.message || "Resume saved successfully.");
        } else {
          toast.error(response.data.error || "Error while saving the resume.");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred.");
        console.error("Error updating resume:", error);
      }
    });
  };

  const handleBackToEditor = () => {
    setIsFinished(false);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userProfileResponse = await axios.get(
          "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (userProfileResponse.data.status === "success") {
          const userData = userProfileResponse.data.data;
          setFormData((prevData) => ({
            ...prevData,
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            phone: userData.phone || "",
            email: userData.email || "",
          }));
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Meta
        title="Abroadium - AI Resume Builder"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
        keywords="ATS-friendly, Resume optimization..."
      />

      <div className="min-h-screen bg-gray-50">
        {!isFinished ? (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="w-full bg-gray-200 p-4 shadow-sm">
              <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex w-full lg:w-auto gap-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentSection === 0}
                    className="w-40 h-10 rounded-lg bg-blue-950 text-white font-medium transition hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
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

            <div className="sticky top-0 z-10 w-full bg-white shadow-sm">
              <div className="hidden md:flex justify-center items-center p-4">
                <nav className="bg-gray-100 rounded-lg p-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => prevSection()}
                      className="p-2 hover:bg-gray-200 rounded-lg "
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
                      className="p-2 hover:bg-gray-200 rounded-lg "
                      disabled={currentSection === sections.length - 1}
                    >
                      {/* Chevron Right Icon Here */}
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-grow p-4">
              <div className="w-[40%] "
               style={{ backgroundColor: "#323159f5" }}
              >
                <main className="w-full mx-auto md:p-4">
                  <form>{sections[currentSection].component}</form>
                </main>
              </div>

              <aside className="w-[60%] min-h-screen border-l bg-gray-50">
                <div className="sticky top-20 p-4">
                  <Preview ref={templateRef} selectedTemplate={selectedTemplate} />
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
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
                 
                  Back
                </button>
              </div>
            </div>

            <div className="z-10">
              <Preview ref={templateRef} selectedTemplate={selectedTemplate} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}




