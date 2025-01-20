import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../context/CoverLetterContext";
import PersonalInformationWrapper from "./wrappers/PersonalInformationWrapper";
import LetterDetailsWrapper from "./wrappers/LetterDetailsWrapper";
import IntroductionAndBodyWrapper from "./wrappers/IntroductionAndBodyWrapper";
import ClosingGratitudeAndSignatureWrapper from "./wrappers/ClosingGratitudeAndSignatureWrapper";

const CoverLetter1 = () => {
  const templateRef = useRef(null);
  const { coverLetterData, backgroundColorss } = useContext(CoverLetterContext);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };

  return (
    <div
      ref={templateRef}
      className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg"
    >
      <div
        className="container mx-auto flex flex-col p-8 gap-8"
        style={{ backgroundColor: backgroundColorss || "white" }}
      >
        {/* Personal Information Section */}
        <PersonalInformationWrapper
          name={coverLetterData.personalDetails.name}
          email={coverLetterData.personalDetails.email}
          address={coverLetterData.personalDetails.address}
          contact={coverLetterData.personalDetails.contact}
          editable={true}
          headerColor={backgroundColorss ? "white" : "black"}
        />

        {/* Letter Details Section */}
        <LetterDetailsWrapper
          date={coverLetterData.letterDetails.date}
          jobTitle={coverLetterData.letterDetails.jobTitle}
          reference={coverLetterData.letterDetails.reference}
          companyName={coverLetterData.letterDetails.companyName}
          salutation={coverLetterData.letterDetails.salutation}
          editable={true}
          headerColor={backgroundColorss ? "white" : "black"}
        />

        {/* Introduction and Body Section */}
        <IntroductionAndBodyWrapper
          introduction={coverLetterData.introduction}
          body={coverLetterData.body}
          editable={true}
          headerColor={backgroundColorss ? "white" : "black"}
        />

        {/* Closing, Gratitude, and Signature Section */}
        <ClosingGratitudeAndSignatureWrapper
          closing={coverLetterData.closing}
          gratitude={coverLetterData.gratitude}
          signature={coverLetterData.signature}
          editable={true}
          headerColor={backgroundColorss ? "white" : "black"}
        />

        <button
          onClick={extractHtml}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Log HTML Content
        </button>
      </div>
    </div>
  );
};

export default CoverLetter1;
