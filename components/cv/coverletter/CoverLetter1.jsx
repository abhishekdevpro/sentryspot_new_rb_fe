"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

import PersonalInfoWrapper from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";

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

        <PersonalInfoWrapper
          personalDetails={coverLetterData?.personalDetails || {}}
          // editable={true}
          headerColor={backgroundColorss ? "white" : "black"}
        />

        {/* Letter Details Section */}
        <LetterDetailsWrapper
          letterDetails={coverLetterData?.letterDetails || {}}
          // editable={true}
          headerColor={backgroundColorss ? "white" : "black"}
        />

        {/* Introduction and Body Section */}
        <IntroductionBodyWrapper
          introduction={coverLetterData.introduction}
          body={coverLetterData.body}
          closing={coverLetterData.closing}
          gratitude={coverLetterData.gratitude}
          signature={coverLetterData.signature}
          editable={true}
          headerColor={backgroundColorss ? "white" : "black"}
        />
      </div>
    </div>
  );
};

export default CoverLetter1;
