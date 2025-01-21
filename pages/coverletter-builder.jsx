import { useState } from "react";
import { CoverLetterProvider } from "../components/context/CoverLetterContext";
import CoverLetterPreview from "../components/coverletter/CoverLetterPreview";
import TemplateSelector from "../components/coverletter/CvSelector";
import PersonalInfoWrapper from "../components/coverletter/PersonalInfoWrapper";
import Navbar from "./Navbar/Navbar";
import PersonalInformation from "../components/coverletterform/PersonalInformation";
import LetterDetails from "../components/coverletterform/LetterDetails";
import IntroductionAndBodyForm from "../components/coverletterform/IntroductionAndBodyForm";
import ClosingGratitudeAndSignatureForm from "../components/coverletterform/ClosingGratitudeAndSignatureForm";
import CoverLetterEditor from "../components/coverletterform/CoverLetterEditor";

function CoverLetterBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  return (
    <CoverLetterProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex">
          <div className="w-[40%] p-4">
            <CoverLetterEditor />
            {/* <PersonalInformation />
            <LetterDetails />
            <IntroductionAndBodyForm />
            <ClosingGratitudeAndSignatureForm /> */}
          </div>
          <div className="w-[60%] p-4">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
            <CoverLetterPreview selectedTemplate={selectedTemplate} />
          </div>
        </main>
      </div>
    </CoverLetterProvider>
  );
}

export default CoverLetterBuilder;
