// import React from "react";
import { useContext, useRef } from "react";
import { ResumeContext } from "../../pages/builder";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Image from "next/image";
import Link from "next/link";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink,
    FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import dynamic from "next/dynamic";
import ContactAndSocialMedia from "./ContactAndSocial";
// Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })
const Template11 = () => {
    const { resumeData, setResumeData, headerColor,backgroundColorss } = useContext(ResumeContext);
    const templateRef = useRef(null);

  const extractHtml = () => {
      const htmlContent = templateRef.current?.outerHTML;
      console.log(htmlContent);
      return htmlContent;
  };
    const icons = [
        { name: "github", icon: <FaGithub /> },
        { name: "linkedin", icon: <FaLinkedin /> },
        { name: "twitter", icon: <FaTwitter /> },
        { name: "facebook", icon: <FaFacebook /> },
        { name: "instagram", icon: <FaInstagram /> },
        { name: "youtube", icon: <FaYoutube /> },
        { name: "website", icon: <CgWebsite /> },
    ];

    return (
      <div ref={templateRef} className="max-w-4xl mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <div className="header flex bg-[#2b3d63] text-white p-5 items-center" style={{ backgroundColor: backgroundColorss }}>
          <div className="profile-pic mr-5">
            {/* <img
            src="profile-pic.jpg"
            alt="Profile Picture"
            className="rounded-full w-24 h-24"
          /> */}
            <Image
              src={resumeData.profilePicture}
              alt="profile"
              width={100}
              height={100}
              className=" w-50 h-24"
            />
          </div>
          <div className="name-title">
            <h1 className="text-3xl m-0" style={{ color: headerColor }}>
              {resumeData.name}
            </h1>
            <p className="mt-1 text-lg">{resumeData.position}</p>
          </div>
        </div>
        <div className="main-content flex p-5">
          <div className="left-column flex-1 p-5">
            <div className="about-me mb-5">
              <h2 className="bg-[#2b3d63] text-white p-3 -mx-5 mb-5"  style={{ color: headerColor,backgroundColor: backgroundColorss }}>About Me</h2>
              <p className="hover:outline-dashed hover:outline-2 hover:outline-gray-400"
              contentEditable="true"
              suppressContentEditableWarning={true}>
                {resumeData.summary}
              </p>
            </div>
            <div className="contact mb-5">
              {console.log(resumeData,"<<<")}
              {/* <ContactInfo
                mainclass=" flex flex-col gap-1 justify-start items-start mb-1 gap-1 mb-1"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
              <div className="flex flex-col gap-1 justify-start items-start mb-1 gap-1 mb-">
                {Array.isArray(resumeData?.socialMedia) ? (
                  resumeData.socialMedia.map((socialMedia, index) => {
                    return (
                      <a
                        href={`http://${socialMedia.link}`}
                        aria-label={socialMedia.socialMedia}
                        key={index}
                        title={socialMedia.socialMedia}
                        target="_blank"
                        rel="noreferrer"
                        className="lg:inline-flex items-center gap-1 social-media align-center justify-center "
                        // Prevent text overflowing, If the socialMedia.link string is longer than 32 characters, apply the wordWrap and display styles to this <a> tag.
                        // wordWrap: "break-word" breaks the text onto the next line if it's too long,
                        // display: "inline-block" is necessary for wordWrap to work on an inline element like <a>.
                      >
                        {icons.map((icon, index) => {
                          if (
                            icon.name === socialMedia.socialMedia.toLowerCase()
                          ) {
                            return <span key={index}>{icon.icon}</span>;
                          }
                        })}
                        {socialMedia.socialMedia}
                      </a>
                    );
                  })
                ) : (
                  <p>No social media links available</p> // Fallback content
                )}
              </div> */}
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
            <div className="skills-summary mb-5">
              <h2 className="bg-[#2b3d63] text-white p-3 -mx-5 mb-5" style={{ color: headerColor,backgroundColor: backgroundColorss }}>Skills Summary</h2>
              <ul className="list-none p-0">
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
                              className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
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

              </ul>
            </div>
          </div>
          <div className="right-column flex-1 p-5">
            <div className="experience mb-5">
              <h2 className="bg-[#2b3d63] text-white p-3 -mx-5 mb-5" style={{ color: headerColor ,backgroundColor: backgroundColorss}}>Experience</h2>
              <div className="experience-item mb-4">
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
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="text-lg font-bold">{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="text-lg font-bold">{item.position}</p>
                                <p className="text-sm font-medium hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                                contentEditable="true"
                                suppressContentEditableWarning={true}>
                                  {item.description}
                                </p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc pl-6 ul-padding "
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
                                                  className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${snapshot.isDragging &&
                                                    "outline-dashed outline-2 outline-gray-400 bg-white"
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
                          className="text-lg font-bold mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }}  >
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
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="text-lg font-bold">{item.name}</p>
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
                                  className=""
                                >
                                  {item.link}
                                </Link>
                                <p className="text-md hover:outline-dashed hover:outline-2 hover:outline-gray-400">{item.description}</p>
                                <Droppable
                                  droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                  type="PROJECTS_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content"
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
                                                  className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${snapshot.isDragging &&
                                                    "outline-dashed outline-2 outline-gray-400 bg-white"
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



            </div>
            <div className="education">
              <h2 className="bg-[#2b3d63] text-white p-3 -mx-5 mb-5" style={{ color: headerColor,backgroundColor: backgroundColorss }}>Education</h2>
              {resumeData.education.length > 0 && (
                <div className="mb-1">
                  {resumeData.education.map((item, index) => (
                    <div key={index} className="mb-1">
                      <p className="text-md font-semibold">{item.degree}</p>
                      <p className="">{item.school}</p>
                      <DateRange
                        startYear={item.startYear}
                        endYear={item.endYear}
                        id={`education-start-end-date`}
                      />
                    </div>
                  ))}
                </div>
              )}
     <button onClick={extractHtml}>Log HTML Content</button>
            </div>
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
        <div className="w-8.5in border p-3" onLoad={alertA4Size}>
            {children}
        </div>
    );

};

export default Template11;
