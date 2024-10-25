import React, { useState, useRef, createContext } from "react";
import Language from "../components/form/Language";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import LoadUnload from "../components/form/LoadUnload";
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

const ResumeContext = createContext(DefaultResumeData);

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder(props) {
  const [resumeData, setResumeData] = useState(DefaultResumeData);
  const [formClose, setFormClose] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedFont, setSelectedFont] = useState("Ubuntu");
  const [headerColor, setHeaderColor] = useState('');
  const [backgroundColorss, setBgColor] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [isFinished, setIsFinished] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const pdfExportComponent = useRef(null);

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

  const downloadAsPDF = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
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
        }}
      >
        <Meta
          title="ATSResume | Get hired with an ATS-optimized resume"
          description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
          keywords="ATS-friendly, Resume optimization..."
        />

        {!isFinished && (
          <> 
            <LoadUnload />
            <div className="flex justify-between bg-gray-200 p-2 px-5">
            <button
    type="button"
    onClick={toggleSidebar}
    className="p-2 bg-blue-900 text-white rounded-lg"
  >
    {isSidebarOpen ? "☰" : "☰"}
  </button>
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="rounded-lg border-2 bg-blue-950 text-white px-10 py-1"
              >
                Previous
              </button>

              <div className="flex gap-3 justify-between bg-gray-200 p-1 px-5">
                <select
                  value={selectedFont}
                  onChange={handleFontChange}
                  className="rounded-lg border-2 border-blue-800 px-8 p- font-bold text-blue-800"
                >
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
                <ColorPicker selectedColor={headerColor} onChange={setHeaderColor} />
                <ColorPickers selectmultiplecolor={backgroundColorss} onChange={setBgColor} />
                <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate}/>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="rounded-lg px-10 font-bold bg-yellow-500 text-black p-1"
              >
                {currentSection === sections.length - 1 ? "Finish" : "Next"}
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:mx-auto md:h-screen overflow-y-auto" style={{ fontFamily: selectedFont }}>
              {/* Sidebar Toggle Button */}
           

              <div className="flex">
  {/* Sidebar Toggle Button */}


  {/* Sidebar */}
  <aside
    className={` h-full bg-gray-100 p-4  z-40 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
  >
    <ul className="space-y-2 text-center">
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


              <form className="w-2/6 p-3">
                {sections[currentSection].component}
              </form>

              <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
                <div id="preview-section" className="bg-white">
                  <Preview selectedTemplate={selectedTemplate} />
                </div>
              </PDFExport>
            </div>
          </>
        )}

        {isFinished && (
          <div className="p-">
            <div className="flex justify-between bg-gray-200 p-2 px-5">
              <div className="flex gap-2 justify-center bg-gray-200">
                
                <select
                  value={selectedFont}
                  onChange={handleFontChange}
                  className="rounded-lg border-2 border-blue-800 px-8 p-2 font-bold bg-white text-blue-800"
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
                className="rounded-lg px-10 font-bold bg-blue-950 text-white p-1"
                onClick={downloadAsPDF}
              >
                Download PDF
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

