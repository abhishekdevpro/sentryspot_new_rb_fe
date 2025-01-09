// const ResumeStrength = ({ score, sections }) => {
//   console.log(sections,typeof sections);
//     return (
//       <div className="bg-blue-50 p-6 rounded-lg mb-6">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h2 className="text-xl font-semibold mb-1">Resume Strength</h2>
//             <div className="flex items-center gap-2">
//               <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-lg font-semibold">
//                 {score}
//               </span>
//             </div>
//           </div>
          
//           <div className="flex flex-col items-end">
//             <h3 className="text-xl font-semibold mb-1">Fix Resume</h3>
//             <p className="text-gray-600">
//               We found <span className="font-semibold">4</span> errors in your resume.
//             </p>
//             <p className="text-gray-600">Use our Resume Check tool to fix them.</p>
//             <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               Improve Resume
//             </button>
//           </div>
//         </div>
  
//         <div className="space-y-3">
//           {sections.map((section) => (
//             <div key={section.name} className="flex items-center gap-2">
//               <div className={`p-1 rounded-full ${section.completed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
//                 {section.completed ? (
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 ) : (
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 )}
//               </div>
//               <span className="text-gray-700">{section.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }
  
//   export default ResumeStrength
  
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ResumeStrength = ({score, strength,resumeId}) => {

  const getSectionsList = (data) => {
    if (!data) return [];
    return [
      {
        name: 'Personal Information',
        completed: data.is_personal_info,
        score: data.personal_score
      },
      {
        name: 'Personal Summary',
        completed: data.is_personal_summery,
        score: data.personal_summery_score
      },
      {
        name: 'Education',
        completed: data.is_education,
        score: data.education_score
      },
      {
        name: 'Work History',
        completed: data.is_work_history,
        score: data.work_history_score
      },
      {
        name: 'Skills',
        completed: data.is_skills,
        score: data.skills_score
      }
    ];
  };

  

  const sectionsList = getSectionsList(strength);

  return (
    <div className="bg-blue-50 p-6 rounded-lg mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Resume Strength</h2>
          <div className="flex items-center gap-2">
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-lg font-semibold">
              {score}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <h3 className="text-xl font-semibold mb-1">Fix Resume</h3>
          <p className="text-gray-600">
            We found <span className="font-bold">{strength.total_errors} errors</span>  in your resume.
          </p>
          <p className="text-gray-600">Use our Resume Check tool to fix them.</p>
          <Link href={`/dashboard/aibuilder/${resumeId}`}>
          <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Improve Resume
          </button>
          </Link>
        </div>
      </div>
      
      <div className="space-y-3">
        {sectionsList.map((section) => (
          <div key={section.name} className="flex items-center gap-2">
            <div className={`p-1 rounded-full ${section.completed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {section.completed ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <span className="text-gray-700">{section.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeStrength;