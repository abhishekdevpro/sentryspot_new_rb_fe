import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cvletter1 from "./cvimgs/cvletter1.png";
import cvletter2 from "./cvimgs/cvletter2.png";
import cvletter3 from "./cvimgs/cvletter3.png";
import cvletter4 from "./cvimgs/cvletter4.png";

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [templateId, setTemplateId] = useState(selectedTemplate);
  const templates = [
    { key: "template1", imageUrl: cvletter1 },
    { key: "template2", imageUrl: cvletter2 },
    { key: "template3", imageUrl: cvletter3 },
    { key: "template4", imageUrl: cvletter4 },
    { key: "template5", imageUrl: cvletter1 },
    { key: "template6", imageUrl: cvletter2 },
  ];

  useEffect(() => {
    const selectedIndex = templates.findIndex(
      (template) => template.key == selectedTemplate
    );
    if (selectedIndex !== -1) {
      setCurrentIndex(selectedIndex);
    }
  }, [selectedTemplate]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleTemplateClick = (templateKey) => {
    setSelectedTemplate(templateKey);
    setTemplateId(templateKey);
    closeModal();
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? templates.length - 3 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === templates.length - 3 ? 0 : prevIndex + 1
    );
  };

  const getDisplayedTemplates = () => {
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(templates.length, currentIndex + 2);
    return templates.slice(start, end);
  };

  return (
    <div className="font-sans">
      <button
        onClick={openModal}
        className="hidden md:block rounded-lg border-2 m-2 border-blue-800 px-5 py-2 font-bold bg-white text-blue-800"
      >
        <span>Selected: {templateId || "template1"}</span>
      </button>
      <button
        onClick={openModal}
        className="block md:hidden rounded-lg border-2 m-2 border-blue-800 px-5 py-2 font-bold bg-white text-blue-800"
      >
        Template
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/75 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-5xl relative shadow-2xl">
            <div className="text-lg font-bold mb-4 text-center border rounded-3xl py-2 text-white bg-gray-800">
              Select a Template
            </div>

            <div className="relative flex items-center mb-6">
              <button
                onClick={goToPrevious}
                className="absolute -left-3 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              <div className="flex justify-center w-full overflow-hidden px-8">
                <div className="flex gap-4">
                  {getDisplayedTemplates().map((template) => (
                    <div
                      key={template.key}
                      onClick={() => handleTemplateClick(template.key)}
                      className={`
                        relative group cursor-pointer transition-all duration-300
                        ${
                          template.key === templateId
                            ? "transform scale-105"
                            : "hover:scale-102"
                        }
                      `}
                    >
                      <div
                        className={`
                        w-64 p-2 rounded-lg transition-all duration-300
                        ${
                          template.key === templateId
                            ? "bg-blue-100 ring-4 ring-blue-500 ring-offset-2"
                            : "hover:bg-gray-50"
                        }
                      `}
                      >
                        <div className="relative">
                          <Image
                            src={template.imageUrl}
                            alt={template.key}
                            width={300}
                            height={400}
                            className={`
                              w-full h-80 object-cover rounded-lg shadow-md transition-transform duration-300
                              ${
                                template.key === templateId
                                  ? "ring-2 ring-blue-400"
                                  : "group-hover:ring-2 group-hover:ring-blue-300"
                              }
                            `}
                          />
                          {template.key === templateId && (
                            <div className="absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none" />
                          )}
                        </div>
                        <div
                          className={`
                          mt-2 text-center py-2 px-4 rounded-md transition-colors duration-300
                          ${
                            template.key === templateId
                              ? "bg-blue-500 text-white font-semibold"
                              : "text-gray-600 group-hover:text-blue-600"
                          }
                        `}
                        >
                          {template.key}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={goToNext}
                className="absolute -right-3 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <button
              onClick={closeModal}
              className="w-full sm:w-auto px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
