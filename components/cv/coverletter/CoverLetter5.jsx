"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

import PersonalInfoWrapper from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";

const CoverLetter5 = () => {
  const { coverLetterData, backgroundColorss, headerColor } =
    useContext(CoverLetterContext);

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 ">
      <div
        className="mx-auto flex justify-center items-center p-4"
        style={{
          borderBottom: `2px solid ${backgroundColorss}`,
        }}
      >
        <h2
          style={{
            color: `${backgroundColorss}`,
          }}
          className="text-4xl font-bold mb-2 "
        >
          {coverLetterData?.personalDetails.name}
        </h2>
      </div>
      <div className="container mx-auto flex bg-white shadow-lg mt-2">
        {/* Left Column */}
        <div
          className="right-column w-4/12 bg-gray-100 p-4"
          style={{ backgroundColor: backgroundColorss }}
        >
          <p
            style={{
              color: backgroundColorss ? "white" : "black",
            }}
          >
            <strong>Email:</strong> {coverLetterData.personalDetails.email}
          </p>
          <p style={{ color:backgroundColorss ? "white" : "black"} }>
            <strong>Address:</strong> {coverLetterData.personalDetails.address}
          </p>
          <p style={{ color: backgroundColorss ? "white" : "black" }}>
            <strong>Contact:</strong> {coverLetterData.personalDetails.contact}
          </p>
        </div>

        {/* Right Column */}
        <div className="left-column w-8/12 p-2 border-r border-gray-300">
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
      </div>
    </div>
  );
};

export default CoverLetter5;
