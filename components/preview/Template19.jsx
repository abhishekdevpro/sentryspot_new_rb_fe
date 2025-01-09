import { useContext, useRef } from "react";
import { ResumeContext } from "../../pages/builder";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Image from "next/image";
import Certification from "./Certification";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaBold,
  FaItalic,
  FaPlus,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import dynamic from "next/dynamic";
import ContactAndSocialMedia from "./ContactAndSocial";

const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

const Template19 = () => {
  const { resumeData, setResumeData, headerColor } = useContext(ResumeContext);
  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];
  const templateRef = useRef(null);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };

  return (
    <div ref={templateRef} className="max-w-4xl mx-auto p-2 bg-white shadow-md">
      <div className="flex gap-1 items-start bg-zinc-200">
        <div className="border-r-2 border-gray-400 w-2/3 p-5">
          <div className="mb-8">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: headerColor }}
            >
              {resumeData.name}
            </h1>
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: headerColor }}
            >
              {resumeData.position}
            </h2>
          </div>

          <div className="mb-8">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: headerColor }}
            >
              ABOUT ME
            </h2>
            <div className="border-b-2 border-gray-800 mb-5"></div>
            <p
              className="hover:outline-dashed hover:outline-2 hover:outline-gray-400"
              contentEditable="true"
              suppressContentEditableWarning={true}
            >
              {resumeData.summary}
            </p>
          </div>

          <div className="mb-8">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: headerColor }}
            >
              EXPERIENCE
            </h2>
            <div>
              <h3
                className="text-xl font-semibold border-b-2 border-gray-800 pb-2 mb-4"
                style={{ color: headerColor }}
              >
                Projects
              </h3>
              {resumeData.workExperience.length > 0 && (
                <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {resumeData.workExperience.map((item, index) => (
                        <Draggable
                          key={`${item.company}-${index}`}
                          draggableId={`WORK_EXPERIENCE-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-5 hover:scale-105 transition-transform duration-300 ${
                                snapshot.isDragging
                                  ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                  : ""
                              }`}
                            >
                              <div className="flex justify-between space-y-1">
                                <p className="text-xl">{item.company}</p>
                                <DateRange
                                  startYear={item.startYear}
                                  endYear={item.endYear}
                                  id={`work-experience-start-end-date`}
                                />
                              </div>
                              <p className="text-base">{item.position}</p>
                              <p
                                className="text-base hyphens-auto hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                              >
                                {item.description}
                              </p>
                              <Droppable
                                droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                              >
                                {(provided) => (
                                  <ul
                                    className="list-disc pl-5 text-base"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {typeof item.keyAchievements === "string" &&
                                      item.keyAchievements
                                        .split("\n")
                                        .map((achievement, subIndex) => (
                                          <Draggable
                                            key={`${item.company}-${index}-${subIndex}`}
                                            draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                            index={subIndex}
                                          >
                                            {(provided, snapshot) => (
                                              <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
                                                  snapshot.isDragging
                                                    ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                                    : ""
                                                }`}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: achievement,
                                                  }}
                                                  contentEditable
                                                />
                                              </li>
                                            )}
                                          </Draggable>
                                        ))}
                                    {provided.placeholder}
                                  </ul>
                                )}
                              </Droppable>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}

              {resumeData.projects.length > 0 && (
                <Droppable droppableId="projects" type="PROJECTS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <h2
                        className="text-xl font-bold mb-4 border-b-2 border-gray-300"
                        contentEditable
                        suppressContentEditableWarning
                        style={{ color: headerColor }}
                      >
                        Projects
                      </h2>
                      {resumeData.projects.map((item, index) => (
                        <Draggable
                          key={`${item.name}-${index}`}
                          draggableId={`PROJECTS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-5 hover:scale-105 transition-transform duration-300 ${
                                snapshot.isDragging
                                  ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                  : ""
                              }`}
                            >
                              <div className="flex justify-between space-y-1">
                                <p className="text-xl font-semibold">
                                  {item.name}
                                </p>
                                <DateRange
                                  startYear={item.startYear}
                                  endYear={item.endYear}
                                  id={`work-experience-start-end-date`}
                                />
                              </div>
                              <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                {item.link}
                              </Link>
                              <p className="text-base">{item.description}</p>
                              <Droppable
                                droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                type="PROJECTS_KEY_ACHIEVEMENT"
                              >
                                {(provided) => (
                                  <ul
                                    className="list-disc pl-5 text-base"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {typeof item.keyAchievements === "string" &&
                                      item.keyAchievements
                                        .split("\n")
                                        .map((achievement, subIndex) => (
                                          <Draggable
                                            key={`${item.name}-${index}-${subIndex}`}
                                            draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                            index={subIndex}
                                          >
                                            {(provided, snapshot) => (
                                              <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
                                                  snapshot.isDragging
                                                    ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                                    : ""
                                                }`}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: achievement,
                                                  }}
                                                  contentEditable
                                                />
                                              </li>
                                            )}
                                          </Draggable>
                                        ))}
                                    {provided.placeholder}
                                  </ul>
                                )}
                              </Droppable>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </div>

            {/* <div className="text-left">
              <h2 className="text-2xl font-bold uppercase text-black mb-5">
                Reference
              </h2>
              <div className="border-b-2 border-black mb-5"></div>
              <div className="flex justify-between">
                <div className="mb-5">
                  <p className="text-xl font-semibold mb-2 uppercase">
                    Estelle Darcy
                  </p>
                  <p className="font-light mb-2">Wardlere Inc. / CTO</p>
                  <p className="font-light mb-2">Phone: 123-456-7890</p>
                  <p className="font-light mb-2">Email: abc@gmail.com</p>
                </div>
                <div className="mb-5">
                  <p className="text-xl font-semibold mb-2 uppercase">
                    Harper Richard
                  </p>
                  <p className="font-light mb-2">Wardlere Inc. / CEO</p>
                  <p className="font-light mb-2">Phone: 123-456-7890</p>
                  <p className="font-light mb-2">Email: abc@gmail.com</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="p-5 w-1/3">
          <div className="text-left">
            <div className="mb-8">
            <ContactAndSocialMedia
      contactData={{
        teldata: resumeData.contactInformation,
        emaildata: resumeData.email,
        addressdata: resumeData.address,
      }}
      socialMediaData={resumeData.socialMedia}
      icons={icons}
      layout="column" // or "row"
      contactClass=""
      socialMediaClass=""
    />
            </div>
          </div>

          <div className="mb-8">
            <h2
              className="text-xl font-bold text-black mb-5"
              style={{ color: headerColor }}
            >
              EDUCATION
            </h2>
            <div className="border-b-2 border-gray-800 mb-5"></div>
            <div className="mb-4">
              <ul className="list-none p-0">
                {resumeData.education.length > 0 && (
                  <div className="mb-5">
                    {resumeData.education.map((item, index) => (
                      <div key={index} className="text-black mb-5">
                        <p className="text-xl font-bold">{item.degree}</p>
                        <p className="text-base">{item.school}</p>
                        <DateRange
                          className="text-lg mb-1"
                          startYear={item.startYear}
                          endYear={item.endYear}
                          id={`education-start-end-date`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2
              className="text-xl font-bold text-black"
              style={{ color: headerColor }}
            >
              LANGUAGE
            </h2>
            <div className="text-black mb-4 font-bold">
              <Language languages={resumeData.languages} />
            </div>
          </div>

          <div className="mb-8">
            <h2
              className="text-xl font-bold text-black mb-4"
              style={{ color: headerColor }}
            >
              SKILLS
            </h2>
            <Droppable droppableId="skills" type="SKILLS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {resumeData.skills.map((skill, index) => (
                    <Draggable
                      key={`SKILLS-${index}`}
                      draggableId={`SKILLS-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`text-black mb-5 hover:scale-105 transition-transform duration-300 ${
                            snapshot.isDragging ? "inline" : ""
                          }`}
                        >
                          <Skills title={skill.title} skills={skill.skills} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          {/* <button 
              onClick={extractHtml}
            >
              Log HTML Content
            </button> */}
        </div>
      </div>
    </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    const previewHeight = preview.offsetHeight;
    console.log(previewHeight);
    if (previewHeight > 1122) {
      alert("A4 size exceeded");
    }
  };

  return (
    <div className="w-[8.5in] border p-3" onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default Template19;
