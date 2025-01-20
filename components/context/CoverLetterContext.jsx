import React, { createContext, useState } from "react";
import DefaultCoverLetterData from '../utility/DefaultCoverLetterData';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [coverLetterData, setCoverLetterData] = useState(DefaultCoverLetterData);
  const [headerColor, setHeaderColor] = useState("");
  const [backgroundColorss, setBgColor] = useState("");
  const [selectedFont, setSelectedFont] = useState("Ubuntu");
  const handleChange = (e) => {
    setCoverLetterData({ ...coverLetterData, [e.target.name]: e.target.value });
  };
  return (
    <ResumeContext.Provider value={{ coverLetterData, setCoverLetterData, handleChange,
      headerColor,
      setHeaderColor,
      backgroundColorss,
      setBgColor,
      selectedFont,
      setSelectedFont, }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
