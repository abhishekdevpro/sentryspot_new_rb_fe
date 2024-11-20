import React, { useState, useRef, createContext ,useEffect} from "react";
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
import ColorPicker from './ColorPicker';
import ColorPickers from "./ColorPickers";
import Preview from "../components/preview/Preview";
import TemplateSelector from "../components/preview/TemplateSelector";
import { PDFExport } from '@progress/kendo-react-pdf';
import LoadUnload from "../components/form/LoadUnload";
import MyResume from "./dashboard/MyResume";
import Modal from "../components/Modal"; // Import the modal
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const ResumeContext = createContext(DefaultResumeData);

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder({ onClose }) {
  const [resumeData, setResumeData] = useState(DefaultResumeData);
  const [formClose, setFormClose] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedFont, setSelectedFont] = useState("Ubuntu");
  const [headerColor, setHeaderColor] = useState('');
  const [backgroundColorss, setBgColor] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [isFinished, setIsFinished] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [token, setToken] = useState(null);
  const [resumeId, setResumeId] = useState(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);


  useEffect(() => {
    // Extract resumeId from URL
    const path = window.location.pathname;
    const id = path.split('/').pop(); // Get the last part of the URL
    setResumeId(id);
  }, []);

   const handleDownloadResume = () => {
    const amount = 49; // Fixed price
  

    // Ensure the resumeId is valid
    if (!resumeId) {
      console.error('Resume ID is not available');
      return;
    }

    // Create the download payload
    const payload = {
      amount,
      ResumeId: resumeId, // Ensure the field name matches the API expectation
      Token: token || '' // Ensure the field name matches the API expectation
    };

    // Make the API call to initiate download
    axios.post('https://api.sentryspot.co.uk/api/user/paypal/create-payment', payload, {
      headers: { 'Content-Type': 'application/json' }, // Use JSON content type
    })

    .then(response => {
      const data = response.data;
      if (data && data.data) {
        // Redirect to the PayPal URL provided in the response
        window.location.href = data.data;
      }
      if (data && data.order_id) {
        localStorage.setItem("orderid", data.order_id);
      }
      console.log(data.order_id)
    })
    .catch(error => console.error('Payment Error:', error));
  };
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

 

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const sections = [
    { label: "Details", component: <PersonalInformation /> },
    { label: "Social", component: <SocialMedia /> },
    { label: "Summary", component: <Summary /> },
    { label: "Education", component: <Education /> },
    { label: "Experience", component: <WorkExperience /> },
    { label: "Projects", component: <Projects /> },
    { label: "Skills", component: Array.isArray(resumeData?.skills) ? resumeData.skills.map((skill, index) => <Skill title={skill.title} key={index} />) : <p>No skills available</p> },
    { label: "Language", component: <Language /> },
    { label: "Certification", component: <Certification /> },
  ];

   
  const handleNext = () => {
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
    setCurrentSection(index);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

   const pdfExportComponent = useRef(null);
  const downloadAsPDF = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
      // router.push('/dashboard/page')
    }
  };



  const pdfExportOptions = {
    paperSize: "A4",
    fileName: "resume.pdf",
    author: resumeData.firstName + " " + resumeData.lastName,
    creator: "ATSResume Builder",
    date: new Date(),
    scale: 0.7,
    forcePageBreak: ".page-break"
  };

  const router = useRouter(); 
  const { id } = router.query;
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsLoggedIn(false); // Update login state
  };
  const getLinkClassName = (path) => {
    return router.pathname === path
      ? "flex items-center p-2 bg-violet-900 border-b-2 rounded font-semibold text-white"
      : "flex items-center p-2 hover:bg-violet-900  border-b-2 rounded font-semibold  ";
  };

  const handleFinish = async () => {
    if (!resumeData) return;
  
    // Map resumeData into the required templateData format
    const templateData = {
      templateData: {
        name: resumeData.name || "",
        position: resumeData.position || "",
        contactInformation: resumeData.contact || "",
        email: resumeData.email || "",
        address: resumeData.address || "",
        profilePicture: resumeData.profilePicture || "",
        socialMedia: resumeData.socialMedia?.map((media) => ({
          socialMedia: media.platform || "",
          link: media.link || ""
        })) || [],
        summary: resumeData.summary || "",
        education: resumeData.education?.map((edu) => ({
          school: edu.school || "",
          degree: edu.degree || "",
          startYear: edu.startYear || "",
          endYear: edu.endYear || ""
        })) || [],
        workExperience: resumeData.workExperience?.map((exp) => ({
          company: exp.company || "",
          position: exp.position || "",
          description: exp.description || "",
          KeyAchievements: Array.isArray(exp.keyAchievements) ? exp.keyAchievements : [exp.keyAchievements || ""], // Ensure it's an array
          startYear: exp.startYear || "",
          endYear: exp.endYear || ""
        })) || [],
        projects: resumeData.projects?.map((project) => ({
          title: project.title || "",
          link: project.link || "",
          description: project.description || "",
          keyAchievements: Array.isArray(project.keyAchievements) ? project.keyAchievements : [project.keyAchievements || ""], // Ensure it's an array
          startYear: project.startYear || "",
          endYear: project.endYear || "",
          name: project.name || ""
        })) || [],
        skills: Array.isArray(resumeData.skills)
        ? resumeData.skills.map((skill) => ({
            title: skill.title || "",
            skills: skill.skills || []
          }))
        : [],      
        languages: resumeData.languages || [],
        certifications: resumeData.certifications || []
      }
    };
  
    try {
      // Check if `id` is available, otherwise get it from local storage
      const id = router.query.id || localStorage.getItem("resumeId");
      if (!id) {
        console.error("Resume ID not found.");
        return;
      }
    
      const url = `https://api.sentryspot.co.uk/api/jobseeker/resume-update/${id}`;
      const response = await axios.put(url, templateData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
    
      console.log('Resume updated successfully:', response.data);
      if(response.data.code === 200 || response.data.status === "success"){
        toast.success(response.data.message)
      }
      // Uncomment below if you need to redirect after updating
      // if (response.data) {
      //   router.push('/dashboard/ai-resume-builder');
      // }
    } catch (error) {
      console.error('Error updating resume:', error);
    }
  };
  
  return (
    <>
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

        {!isFinished && (
          <div className="flex"> 
           <LoadUnload/>
           <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MyResume  />
      </Modal>
     
           <div>
           <div className="lg:flex justify-between bg-gray-200 p-2 px-5">
              {/* <button
                type="button"
                onClick={toggleSidebar}
                className="p-2 bg-blue-900 text-white rounded-lg"
              >
                {isSidebarOpen ? "☰" : "☰"}
              </button> */}
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="rounded-lg border-2 bg-blue-950  w-full lg:w-40 text-white px-10 py-1"
              >
                Previous
              </button>

              <div className="lg:flex gap- content-center  justify-between bg-gray-200 p-1 px-5 hidden">
                <select
                  value={selectedFont}
                  onChange={handleFontChange}
                  className="rounded-lg border-2 border-blue-800 px-8 p- font-bold text-blue-800 lg:block hidden"
                >
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
                <ColorPicker selectedColor={headerColor} onChange={setHeaderColor} />
                <ColorPickers selectmultiplecolor={backgroundColorss} onChange={setBgColor} />
                <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="rounded-lg px-10 font-bold bg-yellow-500 w-full lg:w-40 text-black p-1"
              >
                {currentSection === sections.length - 1 ? "Finish" : "Next"}
              </button>
             
            </div>

            <div className="flex   md:mx-auto md:h-screen overflow-y-auto" style={{ fontFamily: selectedFont }}>

              <div className="md:flex lg:block hidden">
                <aside
                  className={` h-full bg-gray-100 p-4   transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
                >
                  <ul className="space-y-6 text-center">
                    {sections.map((section, index) => (
                      <li
                        key={index}
                        className={`p-2 cursor-pointer ${currentSection === index ? "rounded-3xl border-y-2 border-blue-800 font-bold bg-blue-950 text-white" : "border-2 bg-white border-blue-800 rounded-3xl text-blue-800"}`}
                        onClick={() => handleSectionClick(index)}
                      >
                        {section.label}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>

              <form className=" p-">
                {sections[currentSection].component}
              </form>

              <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
                <div id="preview-section" className="bg-white lg:block hidden">
                  <Preview selectedTemplate={selectedTemplate} />
                </div>
              </PDFExport>
            </div>
            </div>
          </div>
        )}
         {isFinished && (
          <div className="p-">
            <div className="lg:flex lg:justify-between  bg-gray-200 p-2 px-5">
              <div className="lg:flex flex-row gap-4 justify-center bg-gray-200">
                
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
                <ColorPicker selectedColor={headerColor} onChange={setHeaderColor} />
                <ColorPickers selectmultiplecolor={backgroundColorss} onChange={setBgColor} />
                <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
              </div>
              <button
          type="button"
          onClick={handleFinish}
         // disabled={isFinished} // Optional, disable if already finished
          className="bg-blue-950 text-white px-5 py-2 rounded-lg"
        >
          Save
        </button>
              <button
                type="button"
                className="rounded-lg px-10 lg:ms-2 font-bold bg-blue-950 text-white p-1"
                onClick={downloadAsPDF}
              >
                Pay & Download
              </button>
            </div>
            
            <div className="overflow-y-auto md:h-screen mx-auto">
              <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
                <div id="preview-section" className="bg-white">
                  <Preview selectedTemplate={selectedTemplate} />
                </div>
              </PDFExport>
            </div>
          </div>
        )}
      </ResumeContext.Provider>

  
      
    </>
  );
}



export { ResumeContext };