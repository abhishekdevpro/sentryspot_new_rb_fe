"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

import PersonalInfoWrapper from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";

const CoverLetter3 = () => {
  const { coverLetterData, backgroundColorss } = useContext(CoverLetterContext);

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 ">
      <div className="container mx-auto flex bg-white shadow-lg">
        {/* Left Column */}
        <div className="left-column w-8/12 p-8 border-r border-gray-300">
          <PersonalInfoWrapper
            personalDetails={coverLetterData?.personalDetails || {}}
            editable={true}
            headerColor={backgroundColorss ? "white" : "black"}
          />

          {/* Job 1 */}
          <div className="flex flex-col gap-4">
            <div className="col-span-2 space-y-2">
              <LetterDetailsWrapper
                letterDetails={coverLetterData?.letterDetails || {}}
                editable={true}
                headerColor={backgroundColorss ? "white" : "black"}
              />
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
        </div>

        {/* Right Column */}
        <div
          className="right-column w-4/12 bg-gray-100 p-8"
          style={{ backgroundColor: backgroundColorss }}
        ></div>
      </div>
    </div>
  );
};

export default CoverLetter3;
