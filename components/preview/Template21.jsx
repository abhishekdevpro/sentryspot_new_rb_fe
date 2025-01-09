// import { useContext, useRef } from "react";
// import { ResumeContext } from "../../pages/builder";
// import { HighlightMenu } from "react-highlight-menu";
// import ContactInfo from "./ContactInfo";
// import { CgWebsite } from "react-icons/cg";
// import DateRange from "../utility/DateRange";
// import Language from "./Language";
// import Skills from "./Skills";
// import Certification from "./Certification";
// import Link from "next/link";
// import {
//   FaGithub,
//   FaLinkedin,
//   FaTwitter,
//   FaFacebook,
//   FaInstagram,
//   FaYoutube,
//   FaBold,
//   FaItalic,
//   FaPlus,
//   FaMinus,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
//   FaLink,
//   FaUnderline,
// } from "react-icons/fa";
// import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
// import dynamic from "next/dynamic";
// import ContactAndSocialMedia from "./ContactAndSocial";

// const DragDropContext = dynamic(
//   () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
//   { ssr: false }
// );
// const Droppable = dynamic(
//   () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
//   { ssr: false }
// );
// const Draggable = dynamic(
//   () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
//   { ssr: false }
// );

// const Template21 = () => {
//   const { resumeData, setResumeData, headerColor } = useContext(ResumeContext);
//   const icons = [
//     { name: "github", icon: <FaGithub /> },
//     { name: "linkedin", icon: <FaLinkedin /> },
//     { name: "twitter", icon: <FaTwitter /> },
//     { name: "facebook", icon: <FaFacebook /> },
//     { name: "instagram", icon: <FaInstagram /> },
//     { name: "youtube", icon: <FaYoutube /> },
//     { name: "website", icon: <CgWebsite /> },
//   ];
//   const templateRef = useRef(null);

//   const extractHtml = () => {
//     const htmlContent = templateRef.current?.outerHTML;
//     console.log(htmlContent);
//     return htmlContent;
//   };

//   return (
//     <div ref={templateRef} className="max-w-4xl mx-auto p-2 bg-white shadow-md border">
//       <div className="flex">
//         <div className="bg-cyan-500 p-5 w-1/3">
//           <div className="mb-5">
//             <div className="rounded-full border-2 border-white mb-5">
//               <img
//                 className="rounded-full w-full h-full object-cover"
//                 src={
//                   resumeData.profilePicture
//                     ? resumeData.profilePicture
//                     : "img/profile_one.png"
//                 }
//                 alt="Profile"
//               />
//             </div>
 
//             <div className="text-left text-white">
//             <ContactAndSocialMedia
//               contactData={{
//                 teldata: resumeData.contactInformation,
//                 emaildata: resumeData.email,
//                 addressdata: resumeData.address,
//               }}
//               socialMediaData={resumeData.socialMedia}
//               icons={icons}
//               layout="column"
//             />
//           </div>

//           <div className="border-b-2 border-white mb-2"></div>
//           </div>

//           <div className="mb-8">
//             <div className="flex flex-col">
//               <h2 className="text-xl capitalize text-white font-bold mb-4">
//                 About me
//               </h2>
//               <div className="border-b-2 border-white mb-2"></div>
//             </div>
//             <p
//               className="text-sm text-white hover:outline-dashed hover:outline-2 hover:outline-gray-400 hover:scale-105 transition-transform duration-300"
//               contentEditable="true"
//               suppressContentEditableWarning={true}
//             >
//               {resumeData.summary}
//             </p>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl capitalize text-white font-bold">Skills</h2>
//             <div className="border-b-2 border-white mb-2"></div>
//             <Droppable droppableId="skills" type="SKILLS">
//               {(provided) => (
//                 <div {...provided.droppableProps} ref={provided.innerRef}>
//                   {resumeData.skills.map((skill, index) => (
//                     <Draggable
//                       key={`SKILLS-${index}`}
//                       draggableId={`SKILLS-${index}`}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className={`text-white mb-5 hover:scale-105 transition-transform duration-300 ${
//                             snapshot.isDragging ? "bg-white/10" : ""
//                           }`}
//                         >
//                           <Skills title={skill.title} skills={skill.skills} />
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           </div>

          
//         </div>

//         <div className="bg-slate-300 w-2/3">
//           <div className="bg-cyan-800 p-5">
//             <div className="border-b-2 border-white mb-2"></div>
//             <h1 className="text-4xl font-bold mb-2 text-white">
//               {resumeData.name}
//             </h1>
//             <h2 className="text-2xl font-semibold mb-2 text-white">
//               {resumeData.position}
//             </h2>
//           </div>

//           <div className="p-5 space-y-8">
//             <div>
//               <h2 className="text-xl text-cyan-800 font-bold mb-4">
//                 EXPERIENCE
//               </h2>
//               <h3 className="text-xl text-cyan-800 font-semibold border-b-2 border-gray-800 pb-2 mb-4">
//                 Projects
//               </h3>

//               {resumeData.workExperience.length > 0 && (
//                 <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
//                   {(provided) => (
//                     <div
//                       {...provided.droppableProps}
//                       ref={provided.innerRef}
//                       className="space-y-4"
//                     >
//                       {resumeData.workExperience.map((item, index) => (
//                         <Draggable
//                           key={`${item.company}-${index}`}
//                           draggableId={`WORK_EXPERIENCE-${index}`}
//                           index={index}
//                         >
//                           {(provided, snapshot) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className={`p-4 rounded hover:scale-105 transition-transform duration-300 ${
//                                 snapshot.isDragging ? "bg-white shadow-lg" : ""
//                               }`}
//                             >
//                               <div className="flex justify-between items-center text-cyan-800">
//                                 <p className="text-xl font-semibold">
//                                   {item.company}
//                                 </p>
//                                 <DateRange
//                                   startYear={item.startYear}
//                                   endYear={item.endYear}
//                                   id={`work-experience-start-end-date`}
//                                 />
//                               </div>
//                               <p className="text-cyan-800 font-medium my-2">
//                                 {item.position}
//                               </p>
//                               <p
//                                 className="text-cyan-800 hover:outline-dashed hover:outline-2 hover:outline-gray-400"
//                                 contentEditable="true"
//                                 suppressContentEditableWarning={true}
//                               >
//                                 {item.description}
//                               </p>

//                               <Droppable
//                                 droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
//                                 type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
//                               >
//                                 {(provided) => (
//                                   <ul
//                                     className="list-disc pl-5 mt-2 text-cyan-800"
//                                     {...provided.droppableProps}
//                                     ref={provided.innerRef}
//                                   >
//                                     {typeof item.keyAchievements === "string" &&
//                                       item.keyAchievements
//                                         .split("\n")
//                                         .map((achievement, subIndex) => (
//                                           <Draggable
//                                             key={`${item.company}-${index}-${subIndex}`}
//                                             draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
//                                             index={subIndex}
//                                           >
//                                             {(provided, snapshot) => (
//                                               <li
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                                 className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
//                                                   snapshot.isDragging
//                                                     ? "bg-white shadow-md"
//                                                     : ""
//                                                 }`}
//                                               >
//                                                 <div
//                                                   dangerouslySetInnerHTML={{
//                                                     __html: achievement,
//                                                   }}
//                                                   contentEditable
//                                                 />
//                                               </li>
//                                             )}
//                                           </Draggable>
//                                         ))}
//                                     {provided.placeholder}
//                                   </ul>
//                                 )}
//                               </Droppable>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               )}

//               {resumeData.projects.length > 0 && (
//                 <Droppable droppableId="projects" type="PROJECTS">
//                   {(provided) => (
//                     <div
//                       {...provided.droppableProps}
//                       ref={provided.innerRef}
//                       className="mt-8"
//                     >
//                       <h2
//                         className="text-xl text-cyan-800 font-bold border-b-2 border-gray-300 pb-2 mb-4"
//                         contentEditable
//                         suppressContentEditableWarning
//                       >
//                         Projects
//                       </h2>
//                       <div className="space-y-4">
//                         {resumeData.projects.map((item, index) => (
//                           <Draggable
//                             key={`${item.name}-${index}`}
//                             draggableId={`PROJECTS-${index}`}
//                             index={index}
//                           >
//                             {(provided, snapshot) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 className={`p-4 rounded hover:scale-105 transition-transform duration-300 ${
//                                   snapshot.isDragging
//                                     ? "bg-white shadow-lg"
//                                     : ""
//                                 }`}
//                               >
//                                 <div className="flex justify-between items-center">
//                                   <p className="text-lg font-semibold text-cyan-800">
//                                     {item.name}
//                                   </p>
//                                   <DateRange
//                                     startYear={item.startYear}
//                                     endYear={item.endYear}
//                                     id={`project-start-end-date`}
//                                   />
//                                 </div>
//                                 <Link
//                                   href={item.link}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-blue-600 hover:underline block mt-2"
//                                 >
//                                   {item.link}
//                                 </Link>
//                                 <p className="text-cyan-800 mt-2">
//                                   {item.description}
//                                 </p>

//                                 <Droppable
//                                   droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
//                                   type="PROJECTS_KEY_ACHIEVEMENT"
//                                 >
//                                   {(provided) => (
//                                     <ul
//                                       className="list-disc pl-5 mt-2 text-cyan-800"
//                                       {...provided.droppableProps}
//                                       ref={provided.innerRef}
//                                     >
//                                       {typeof item.keyAchievements ===
//                                         "string" &&
//                                         item.keyAchievements
//                                           .split("\n")
//                                           .map((achievement, subIndex) => (
//                                             <Draggable
//                                               key={`${item.name}-${index}-${subIndex}`}
//                                               draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
//                                               index={subIndex}
//                                             >
//                                               {(provided, snapshot) => (
//                                                 <li
//                                                   ref={provided.innerRef}
//                                                   {...provided.draggableProps}
//                                                   {...provided.dragHandleProps}
//                                                   className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
//                                                     snapshot.isDragging
//                                                       ? "bg-white shadow-md"
//                                                       : ""
//                                                   }`}
//                                                 >
//                                                   <div
//                                                     dangerouslySetInnerHTML={{
//                                                       __html: achievement,
//                                                     }}
//                                                     contentEditable
//                                                   />
//                                                 </li>
//                                               )}
//                                             </Draggable>
//                                           ))}
//                                       {provided.placeholder}
//                                     </ul>
//                                   )}
//                                 </Droppable>
//                               </div>
//                             )}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </div>
//                     </div>
//                   )}
//                 </Droppable>
//               )}
//             </div>

//             <div className="mt-8">
//               <h2 className="text-xl font-bold text-cyan-800 mb-4">LANGUAGE</h2>
//               <div className="text-cyan-800 font-bold">
//                 <Language languages={resumeData.languages} />
//               </div>
//             </div>
//             <button
//               onClick={extractHtml}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//             >
//               Log HTML Content
//             </button>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// const A4PageWrapper = ({ children }) => {
//   const alertA4Size = () => {
//     const preview = document.querySelector(".preview");
//     const previewHeight = preview.offsetHeight;
//     console.log(previewHeight);
//     if (previewHeight > 1122) {
//       alert("A4 size exceeded");
//     }
//   };

//   return (
//     <div className="w-[8.5in] border p-3" onLoad={alertA4Size}>
//       {children}
//     </div>
//   );
// };

// export default Template21;
import { useContext, useRef } from "react";
import { ResumeContext } from "../../pages/builder";
import ContactInfo from "./ContactInfo";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import dynamic from "next/dynamic";
import ContactAndSocialMedia from "./ContactAndSocial";
import Image from "next/image";

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

const Template21 = () => {
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
    <div ref={templateRef} className="max-w-4xl mx-auto p-2 bg-white shadow-md border">
      <div className="flex">
        <div className="bg-cyan-500 p-5 w-1/3">
          <div className="mb-5">
            <div className=" mb-5">
              <Image
                className="rounded-full object-cover"
                src={
                  resumeData.profilePicture
                    ? resumeData.profilePicture
                    : "img/profile_one.png"
                }
                alt="Profile"
              />
            </div>
 
            <div className="text-left text-white">
              <ContactAndSocialMedia
                contactData={{
                  teldata: resumeData.contactInformation,
                  emaildata: resumeData.email,
                  addressdata: resumeData.address,
                }}
                socialMediaData={resumeData.socialMedia}
                icons={icons}
                layout="column"
              />
            </div>

            <div className="border-b-2 border-white mb-2"></div>
          </div>

          <div className="mb-8">
            <div className="flex flex-col">
              <h2 className="text-xl capitalize text-white font-bold mb-4">
                About me
              </h2>
              <div className="border-b-2 border-white mb-2"></div>
            </div>
            <p
              className="text-sm text-white hover:outline-dashed hover:outline-2 hover:outline-gray-400 hover:scale-105 transition-transform duration-300"
              contentEditable="true"
              suppressContentEditableWarning={true}
            >
              {resumeData.summary}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl capitalize text-white font-bold">Skills</h2>
            <div className="border-b-2 border-white mb-2"></div>
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
                          className={`text-white mb-5 hover:scale-105 transition-transform duration-300 ${
                            snapshot.isDragging ? "bg-white/10" : ""
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
        </div>

        <div className="bg-slate-300 w-2/3">
          <div className="bg-cyan-800 p-5">
            <div className="border-b-2 border-white mb-2"></div>
            <h1 className="text-4xl font-bold mb-2 text-white">
              {resumeData.name}
            </h1>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              {resumeData.position}
            </h2>
          </div>

          <div className="p-5 space-y-8">
            <div>
              <h2 className="text-xl text-cyan-800 font-bold mb-4">
                EXPERIENCE
              </h2>
              <h3 className="text-xl text-cyan-800 font-semibold border-b-2 border-gray-800 pb-2 mb-4">
                Projects
              </h3>

              {resumeData.workExperience.length > 0 && (
                <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
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
                              className={`p-4 rounded hover:scale-105 transition-transform duration-300 ${
                                snapshot.isDragging ? "bg-white shadow-lg" : ""
                              }`}
                            >
                              <div className="flex justify-between items-center text-cyan-800">
                                <p className="text-xl font-semibold">
                                  {item.company}
                                </p>
                                <DateRange
                                  startYear={item.startYear}
                                  endYear={item.endYear}
                                  id={`work-experience-start-end-date`}
                                />
                              </div>
                              <p className="text-cyan-800 font-medium my-2">
                                {item.position}
                              </p>
                              <p
                                className="text-cyan-800 hover:outline-dashed hover:outline-2 hover:outline-gray-400"
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
                                    className="list-disc pl-5 mt-2 text-cyan-800"
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
                                                    ? "bg-white shadow-md"
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
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="mt-8"
                    >
                      <h2
                        className="text-xl text-cyan-800 font-bold border-b-2 border-gray-300 pb-2 mb-4"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        Projects
                      </h2>
                      <div className="space-y-4">
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
                                className={`p-4 rounded hover:scale-105 transition-transform duration-300 ${
                                  snapshot.isDragging
                                    ? "bg-white shadow-lg"
                                    : ""
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <p className="text-lg font-semibold text-cyan-800">
                                    {item.name}
                                  </p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`project-start-end-date`}
                                  />
                                </div>
                                <Link
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline block mt-2"
                                >
                                  {item.link}
                                </Link>
                                <p className="text-cyan-800 mt-2">
                                  {item.description}
                                </p>

                                <Droppable
                                  droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                  type="PROJECTS_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc pl-5 mt-2 text-cyan-800"
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {typeof item.keyAchievements ===
                                        "string" &&
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
                                                      ? "bg-white shadow-md"
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
                    </div>
                  )}
                </Droppable>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-cyan-800 mb-4">LANGUAGE</h2>
              <div className="text-cyan-800 font-bold">
                <Language languages={resumeData.languages} />
              </div>
            </div>
            {/* <button
              onClick={extractHtml}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Log HTML Content
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template21;

