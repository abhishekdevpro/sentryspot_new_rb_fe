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

// Dynamically import html2pdf without SSR
const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

const ResumeContext = createContext(DefaultResumeData);

// server side rendering false
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

  // State to track if the user clicked "Finish"
  const [isFinished, setIsFinished] = useState(false);

  // Ref to target the Preview component
  const previewRef = useRef();

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
  // { label: "Upload resume", component: },
    { label: "Details", component: <PersonalInformation /> },
    { label: "Social Media", component: <SocialMedia /> },
    { label: "Summary", component: <Summary /> },
    { label: "Education", component: <Education /> },
    { label: "Work Experience", component: <WorkExperience /> },
    { label: "Projects", component: <Projects /> },
    { label: "Skills", component: Array.isArray(resumeData?.skills) ? resumeData.skills.map((skill, index) => <Skill title={skill.title} key={index} />) : <p>No skills available</p> },
    { label: "Language", component: <Language /> },
    { label: "Certification", component: <Certification /> }, // Last section (index 9)
  ];

  const handleNext = () => {
    if (currentSection === sections.length - 1) {
      setIsFinished(true); // Set isFinished to true when user clicks "Finish"
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

  // Function to download the Preview content as a PDF
  const downloadAsPDF = async () => {
    const element = previewRef.current;
    const html2pdfModule = (await import("html2pdf.js")).default;
  
    // PDF options
    const opt = {
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      html2canvas: { scale: 2 }, // Optional: for better quality
    };
  
    html2pdfModule()
      .from(element)
      .set(opt)
      .toPdf()
      .get('pdf')
      .then(pdf => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.text(`Page ${i} of ${totalPages}`, 10, pdf.internal.pageSize.height - 10); // Bottom left
        }
      })
      .save();
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
          title="Resume | Get hired with an ATS-optimized resume"
          description="Resume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
          keywords="ATS-friendly, Resume optimization..."
        />

        {/* Show controls and sections only if not finished */}
        {!isFinished && (
          <> <LoadUnload />
            <div className="flex justify-between bg-gray-200 p-2 px-5">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="rounded-lg border-2  bg-blue-950 text-white px-10 py-1"
              >
                Previous
              </button>

              
              
              <div className="flex gap-3 justify-between bg-gray-200 p-1 px-5">
                {/* Font Selection Dropdown */}
              <select
                value={selectedFont}
                onChange={handleFontChange}
               className="rounded-lg border-2 border-blue-800 px-8 p- font-bold   text-blue-800"
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
           
              {/* Conditional rendering of the Next/Finish button */}
              <button
                type="button"
                onClick={handleNext}
                className="rounded-lg  px-10 font-bold bg-yellow-500 text-black p-1"
              >
                {currentSection === sections.length - 1 ? "Finish" : "Next"}
              </button>
            </div>

            <div className={`f-col gap-2 md:flex-row justify-evenly md:mx-auto md:h-screen overflow-y-auto`} style={{ fontFamily: selectedFont }}>
              {!formClose && (
                <div className="flex w-full md:w-3/5">
                  {/*<aside className="w-3/12 p-4 bg-gray-100 exclude-print h-screen overflow-y-auto">
                  
                    <ul className="space-y-2 text-center">
                      {sections.map((section, index) => (
                        <li
                          key={index}
                          style={{ fontFamily: 'ubuntu' }}
                          className={`p-2 cursor-pointer ${
                            currentSection === index
                              ? "rounded-3xl border-y-2 border-blue-800  p- font-bold bg-blue-950  text-white"
                              : "border-2 bg-white border-blue-800 rounded-3xl    text-blue-800"
                          }`}
                          onClick={() => handleSectionClick(index)}
                        >
                          {section.label}
                      
                        </li>
                        
                      ))}
                      
                    </ul>
                  </aside> */}
                  <form className="p-4  exclude-print w-full h-screen overflow-y-auto">
                    {sections[currentSection].component}
                  </form>
                </div>
              )}
              {/* Ref applied to Preview component */}
              <div id="preview-section" className=" bg-white "  ref={previewRef} >
              <Preview selectedTemplate={selectedTemplate} />
              </div>
            </div>
          </>
        )}

        {/* Show only preview, font selector, color pickers, and download button if finished */}
        {isFinished && (
          <div className="p-">
            <div className="flex justify-between bg-gray-200 p-2 px-5">
              {/* Font Selection Dropdown */}
              

              <div className="flex gap-2 justify-center bg-gray-200  ">
              <select
                value={selectedFont}
                onChange={handleFontChange}
              className="rounded-lg border-2 border-blue-800 px-8 p-2 font-bold  bg-white text-blue-800"
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
                <button
                type="button"
                onClick={downloadAsPDF}
                className="rounded-lg border-2 border-blue-800 px-8 p-2 font-bold  bg-white text-blue-800"
              >
                Download 
              </button>
              <Print />
              </div>

              {/* Download PDF Button */}
              
            </div>

           

            {/* Show only the preview */}
            <div className="mt-5 bg-white" ref={previewRef}>
            <Preview selectedTemplate={selectedTemplate} />
            </div>
          </div>
        )}

       {/*<FormCP formClose={formClose} setFormClose={setFormClose} /> */} 
        
      </ResumeContext.Provider>
    </>
  );
}

export { ResumeContext };