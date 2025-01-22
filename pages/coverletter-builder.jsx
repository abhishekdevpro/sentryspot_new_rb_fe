import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import { CoverLetterContext } from "../components/context/CoverLetterContext";
import CoverLetterEditor from "../components/cv/coverletterform/CoverLetterEditor";
import TemplateSelector from "../components/cv/coverletter/CvSelector";
import CoverLetterPreview from "../components/cv/coverletter/CoverLetterPreview";
import ColorPickers from "./ColorPickers";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
function CoverLetterBuilder() {
  const {
    coverLetterData,
    setCoverLetterData,
    backgroundColorss,
    selectedFont,
    setSelectedFont,
    setBgColor,
    setHeaderColor,
  } = useContext(CoverLetterContext);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [coverletterId, setCoverLetterId] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  useEffect(() => {
    const fetchResumeData = async () => {
      const { id } = router.query;
      const token = localStorage.getItem("token");

      if (id && token) {
        try {
          const response = await axios.get(
            `https://api.sentryspot.co.uk/api/jobseeker/coverletter/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.data.status === "success") {
            const { data } = response.data;
            // console.log(data,"rnd");

            const parsedData = data.cover_letter_obj;

            setCoverLetterData(parsedData.coverletterInfo);

            if (parsedData.templateDetails) {
              setBgColor(
                parsedData.coverletterInfo.templateDetails.backgroundColor || ""
              );
              setHeaderColor(
                parsedData.coverletterInfo.templateDetails.backgroundColor || ""
              );
              setSelectedTemplate(
                parsedData.coverletterInfo.templateDetails.templateId ||
                  "template1"
              );
            }
          }
        } catch (error) {
          console.error("Error fetching cover letter  data:", error);
          toast.error("Failed to fetch cover letter  data");
        }
      }
    };

    fetchResumeData();
  }, [router.query]);
  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setCoverLetterId(id);
  }, []);

  const formatCoverLetterData = (data) => {
    console.log(data, ">>>data");
    return {
      closing: data.closing || "",
      body: data.body || "",
      gratitude: data.gratitude || "",
      introduction: data.introduction || "",
      letterDetails: {
        companyName: data.letterDetails?.companyName || "",
        date: data.letterDetails?.date || "",
        jobTitle: data.letterDetails?.jobTitle || "",
        reference: data.letterDetails?.reference || "",
        salutation: data.letterDetails?.salutation || "",
      },

      signature: data.signature || "",
      templateDetails: {
        templateId: selectedTemplate,
        backgroundColor: backgroundColorss || "",
        font: selectedFont || "Ubuntu",
      },
      personalDetails: {
        name: data.personalDetails?.name || "",
        address: data.personalDetails?.address || "",
        email: data.personalDetails?.email || "",
        contact: data.personalDetails?.contact || "",
      },
    };
  };

  const handleFinish = async () => {
    if (!coverLetterData) return;
    const coverletterInfo = {
      coverletterInfo: formatCoverLetterData(coverLetterData),
    };
    console.log(coverLetterData, ">>>coverlettersdata");

    try {
      const coverletterId = router.query.id || localStorage.getItem("id");
      if (!coverletterId) {
        toast.error("Resume ID not found");
        return;
      }

      const response = await axios.put(
        `https://api.sentryspot.co.uk/api/jobseeker/coverletter/${coverletterId}`,
        coverletterInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        // setIsSaved(true);
        // localStorage.setItem("isSaved", "true");
        toast.success(response.data.message || "Resume saved Successfully");
      } else {
        toast.error(response.data.error || "Error while saving the Resume");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    }
  };

  return (
    // <CoverLetterProvider>

    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className=" bg-gray-50 ">
        {/* Sticky Options Bar */}
        <div className="sticky top-[64px] z-40 bg-gray-200 p-4 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Font Selector and Options */}
            <div className="flex items-center gap-4">
              <select
                value={selectedFont}
                onChange={handleFontChange}
                className="w-40 h-10 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 bg-white focus:ring-2 focus:ring-blue-800"
              >
                <option value="Ubuntu">Ubuntu</option>
                <option value="Calibri">Calibri</option>
                <option value="Georgia">Georgia</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
              </select>

              <ColorPickers
                selectmultiplecolor={backgroundColorss}
                onChange={setBgColor}
              />
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleFinish}
                className="bg-blue-950 text-white px-6 py-2 rounded-lg"
              >
                Save Cover Letter
              </button>
              <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg">
                Pay & Download
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex flex-col md:flex-row flex-grow p-4">
          {/* Editor Section */}
          <div
            className="w-[40%] overflow-auto"
            style={{ backgroundColor: "#323159f5" }}
          >
            <main className="w-full mx-auto md:p-4">
              <CoverLetterEditor />
            </main>
          </div>

          {/* Preview Section */}
          <aside className="w-[60%] min-h-screen border-l bg-gray-50">
            <div className="sticky top-20 p-4">
              <CoverLetterPreview selectedTemplate={selectedTemplate} />
            </div>
          </aside>
        </div>
      </div>
    </div>
    // </CoverLetterProvider>
  );
}

export default CoverLetterBuilder;
