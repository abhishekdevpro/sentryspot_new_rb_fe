import React, { useState, useRef, useEffect, useContext } from "react";
import Language from "../components/form/Language";
import axios from "axios";
import Meta from "../components/meta/Meta";

import dynamic from "next/dynamic";

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


import { useRouter } from "next/router";
import Sidebar from "./dashboard/Sidebar";
import { toast } from "react-toastify";
import LoaderButton from "../components/utility/LoaderButton";
import useLoader from "../hooks/useLoader";

import { Menu, X } from 'lucide-react';
import Image from "next/image";
import { ResumeContext } from "../components/context/ResumeContext";
// import resumeImg from "./builderImages/GraphicDesignerResume.jpg";
// import poweredbypaypal from "./builderImages/poweredbypaypal.png";
// import paypal from "./builderImages/paypal.png";
// import logo from "./builderImages/logo.jpg";
// import applepay from "./builderImages/apple-pay.png";


const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function MobileBuilder() {
  
 
  const [currentSection, setCurrentSection] = useState(0);
  
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isFinished, setIsFinished] = useState(false);

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
  const {resumeData ,setResumeData, setHeaderColor,setBgColor,setSelectedFont,selectedFont,backgroundColorss,headerColor} = useContext(ResumeContext)
 const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

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
      // const storedBgColor = localStorage.getItem("backgroundColor");
      const storedCurrentSection = localStorage.getItem("currentSection");
      // const storedResumeData = localStorage.getItem("resumeData");

      if (storedIsFinished) setIsFinished(JSON.parse(storedIsFinished));
      if (storedTemplate && !selectedTemplate) setSelectedTemplate(storedTemplate);
      if (storedFont) setSelectedFont(storedFont);
      // if (storedBgColor && !backgroundColorss) setBgColor(storedBgColor);
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
      // localStorage.setItem("backgroundColor", backgroundColorss);
      // localStorage.setItem("currentSection", currentSection.toString());
      // localStorage.setItem("resumeData", JSON.stringify(resumeData));
    }
  }, [
    isFinished,
    selectedTemplate,
    selectedFont,
    headerColor,
    // backgroundColorss,
    // currentSection,
    resumeData,
  ]);

  useEffect(() => {
    const savedState = localStorage.getItem("isSaved");
    if (savedState === "true") {
      setIsSaved(true);
    }
  }, []);

  useEffect(() => {
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

  

  

  const handleNext = () => {
    if (currentSection === sections.length - 1) {
      localStorage.setItem("tempResumeData", JSON.stringify(resumeData));
      localStorage.setItem("tempHeaderColor", headerColor);
      localStorage.setItem("tempBgColor", backgroundColorss);
      localStorage.setItem("tempFont", selectedFont);
      setIsFinished(true);
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

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

  useEffect(() => {
    return () => {
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

 
 
  const downloadAsPDF = async () => {
    const amount = 49; // Fixed price

    try {
      // Make the payment API call
      const payload = {
        amount,
        ResumeId: resumeId, // Make sure resumeId is defined in your component
        Token: token || '' // Make sure token is defined in your component
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
      console.error('Payment Error:', error);
      // Handle error (show error message to user)
    }
  };
 
  // const downloadAsPDF = async () => {
  //   if (!templateRef.current) {
  //     toast.error("Template reference not found");
  //     return;
  //   }
  
  //   try {
  //     // Get the HTML content from the template
  //     const htmlContent = templateRef.current.innerHTML;
  
  //     // Generate the full HTML for the PDF
  //     const fullContent = `
  //       <style>
  //         @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
  //       </style>
  //       ${htmlContent}
  //     `;
  
  //     // API call to generate the PDF
  //     const response = await axios.post(
  //       'https://api.sentryspot.co.uk/api/jobseeker/generate-pdf1',
  //       { html: fullContent },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: token,
  //         },
  //       }
  //     );
  
  //     // Check if the file path was returned
  //     const filePath = response.data.data?.file_path;
  //     if (!filePath) {
  //       throw new Error('PDF file path not received');
  //     }
  
  //     // Construct the URL
  //     const downloadUrl = `https://api.resumeintellect.com${filePath}`;
  
  //     // Open the URL in a new tab
  //     window.open(downloadUrl, '_blank');
  
  //     toast.success('PDF generated and opened in a new tab!');
  //   } catch (error) {
  //     console.error('PDF generation error:', error);
  //     toast.error(
  //       error.response?.data?.message || 'Failed to generate and open PDF'
  //     );
  //   }
  // };
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
        templateDetails: {
          templateId: selectedTemplate,
          backgroundColor: backgroundColorss || "",
          font: selectedFont || "Ubuntu",
        },
      },
    };

    await handleAction(async () => {
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
    });
  };

  const MobileNavigation = () => (
    <div className="fixed px-2 bottom-0 left-0 right-0 bg-white shadow-lg py-4 ">
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="px-4 py-2 bg-blue-950 text-white rounded-lg disabled:opacity-50"
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
    <div className="">
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
    // localStorage.setItem("tempResumeData", JSON.stringify(resumeData));
    localStorage.setItem("tempHeaderColor", headerColor);
    localStorage.setItem("tempBgColor", backgroundColorss);
    localStorage.setItem("tempFont", selectedFont);
    setIsFinished(false);
    setCurrentSection(0);
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
  // console.log(resumeData,"");

  return (
    <>
      <Meta
        title="Resume Intellect - AI Resume Builder"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
        keywords="ATS-friendly, Resume optimization..."
      />

      <div className=" w-full bg-gray-50">
      

        {!isFinished ? (
          <div className=" bg-gray-50 flex flex-col">
            

            <div className="flex flex-col md:flex-row flex-grow ">
              <button
                onClick={toggleMobileSidebar}
                className="fixed z-10 bottom-20 right-4  bg-blue-950 text-white p-3 rounded-full shadow-lg"
              >
                {isMobileSidebarOpen ? (
                  <X className="h-6 w-6 stroke-2" />
                ) : (
                  <Menu className="h-6 w-6 stroke-2" />
                )}
              </button>

              {isMobileSidebarOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 "
                  onClick={toggleMobileSidebar}
                />
              )}

              <aside
                className={`fixed md:static left-0 top-0 h-full z-10 transform 
                                ${
                                  isMobileSidebarOpen
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                                } 
                                md:translate-x-0 transition-transform duration-300 ease-in-out 
                                w-64 bg-gray-100 border-r`}
              >
                <div 
                  
                className="sticky top-20 p-4 overflow-y-auto h-full">
                  <div className="mt-12 md:mt-0">
                    <Sidebar />
                  </div>
                </div>
              </aside>
               <div className="flex justify-start"
                 style={{ backgroundColor: "#323159f5" }}
               >
              <main className="flex-1 max-w-2xl h-full mx-auto md:p-4">
                <form>{sections[currentSection].component}</form>
              </main>
               </div>

            </div>

            <MobileNavigation />
          </div>
        ) : (
          <>
              {/* <div className="flex items-center absolute justify-center gap-1 top-24 left-0 right-0 bg-white shadow-lg ">
              <ColorPickers
                      selectmultiplecolor={backgroundColorss}
                      onChange={setBgColor}
                    />
          <select
                    value={selectedFont}
                    onChange={handleFontChange}
                    className="rounded-lg border-2 border-blue-800 px-5 py-2 font-bold  bg-white text-blue-800"
                  >
                    <option value="Ubuntu">Ubuntu</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Poppins">Poppins</option>
                  </select>
         
<TemplateSelector   selectedTemplate={selectedTemplate}
                      setSelectedTemplate={setSelectedTemplate}/>

          </div> */}
           <div className=" ">
          <Preview ref={templateRef} selectedTemplate={selectedTemplate} />
          </div>
         
          <div className="flex items-center justify-center gap-4 p-2 fixed bottom-0 left-0 right-0 bg-white shadow-lg ">
         
          
              <LoaderButton
                isLoading={isLoading}
                onClick={handleFinish}
                className=" text-white px-4 py-2 rounded-lg bottom-btns"
              >
              
              Save
              </LoaderButton>

              <button
                onClick={downloadAsPDF}
                className=" bg-yellow-500 text-black px-4 py-2 rounded-lg bottom-btns"
              >
             Pay & Download
              </button>
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="w-full max-w-[90%] sm:max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden max-h-screen overflow-y-auto">
                    <div className="flex justify-between items-center p-4 border-b">
                      <Image src={logo} alt="logo" className="h-8 w-auto" />
                      <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={handleCloseModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/2 p-4 flex justify-center">
                        <div className=" sm:w-80 sm:h-80">
                          <Image
                            src={resumeImg}
                            alt="resumeimg"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 p-4">
                        <div className="text-center mb-6">
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            $49
                          </h2>
                          <p className="text-sm text-gray-500">Total Amount</p>
                        </div>

                        <form>
                          <div className="mb-4">
                            <label className="block text-gray-800 mb-2">
                              👨🏻‍💼 Name
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                              value={`${formData.first_name} ${formData.last_name}`.trim()}
                              name="full name"
                              required
                              disabled
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-800 mb-2">
                              📧 Email
                            </label>
                            <input
                              type="email"
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                              value={formData.email}
                              name="email"
                              required
                              disabled
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-800 mb-2">
                              ☎️ Phone
                            </label>
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                              name="phone"
                              value={formData.phone}
                              required
                              disabled
                            />
                          </div>

                          <div className="flex justify-center mt-6">
                            <button
                              onClick={handleDownload}
                              type="submit"
                              className="w-full bg-yellow-400 text-blue-800 font-bold  rounded-[50px] hover:bg-yellow-500 transition duration-200 flex items-center justify-center"
                            >
                              <Image
                                src={paypal}
                                alt="paypal"
                                className="h-10 w-auto m-auto "
                              />
                            </button>
                          </div>
                          <div className="flex justify-center mt-6">
                            <button className="w-full bg-black text-white font-bold  rounded-[50px] transition duration-200  ">
                              <Image
                                src={applepay}
                                alt="apple pay"
                                className=" w-auto m-auto h-10"
                              />
                            </button>
                          </div>
                          <div className="flex justify-center mt-6">
                            <Image
                              src={poweredbypaypal}
                              alt="poweredbypaypal"
                              className="h-8 w-auto"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={handleBackToEditor}
                className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors bottom-btns"
              >
             Back
              </button>
            </div>
          </>
          
          
        )}
      </div>
    </>
  );
}



