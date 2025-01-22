"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import PersonalInfoWrapper from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";

const CoverLetter3 = () => {
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
      <div className="flex">
        {/* Sidebar */}
        <div
          className="w-36 min-h-full"
          style={{ backgroundColor: backgroundColorss || "#1a1a1a" }}
        />

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Personal Information Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {coverLetterData?.personalDetails?.name || "Your Name"}
            </h1>
            <div className="space-y-1 text-gray-600">
              <p>
                {coverLetterData?.personalDetails?.email || "email@example.com"}
              </p>
              <p>
                {coverLetterData?.personalDetails?.phone || "+1 234 567 890"}
              </p>
              <p>
                {coverLetterData?.personalDetails?.address || "Your Address"}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="mb-8">
            <p className="text-gray-600">
              {coverLetterData?.letterDetails?.date || "January 21, 2025"}
            </p>
          </div>

          {/* Recipient Details */}
          <div className="mb-8">
            <p>
              {coverLetterData?.letterDetails?.recipientName ||
                "Recipient Name"}
            </p>
            <p>
              {coverLetterData?.letterDetails?.companyName || "Company Name"}
            </p>
            <p>
              {coverLetterData?.letterDetails?.companyAddress ||
                "Company Address"}
            </p>
          </div>

          {/* Greeting */}
          <div className="mb-6">
            <p className="text-gray-800">
              {coverLetterData?.letterDetails?.greeting ||
                "Dear Hiring Manager,"}
            </p>
          </div>

          {/* Body Content */}
          <div className="space-y-4 mb-8">
            <div className="text-gray-800">
              {coverLetterData?.introduction ||
                "Introduction paragraph goes here..."}
            </div>
            <div className="text-gray-800">
              {coverLetterData?.body || "Body paragraphs go here..."}
            </div>
          </div>

          {/* Closing */}
          <div className="space-y-4">
            <p className="text-gray-800">
              {coverLetterData?.gratitude ||
                "Thank you for your consideration."}
            </p>
            <p className="text-gray-800">
              {coverLetterData?.closing || "Sincerely,"}
            </p>
            <div className="mt-8">
              <p className="font-semibold">
                {coverLetterData?.signature || "Your Name"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter3;
