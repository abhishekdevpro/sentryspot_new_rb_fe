
// // import React, { useState } from 'react';
// // import Sidebar from './Sidebar';
// // import ProfilePage from './Profile';
// // import { FaBars } from 'react-icons/fa'; // Import hamburger icon

// import { useEffect, useState } from "react"
// import CoverLetterSection from "../../components/dashboard/CoverLetterSection"
// import InterviewSection from "../../components/dashboard/InterviewSection"
// import ResumeStrength from "../../components/dashboard/ResumeStrength"
// import Sidebar from "../../components/dashboard/Sidebar"
// import Navbar from "../Navbar/Navbar"
// import axios from "axios"
// // import ProfileSection from "../../components/dashboard/PRofileSection"

// // const DashboardLayout = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   const closeSidebar = () => {
// //     setIsSidebarOpen(false);
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col items-center bg-gray-100">
// //       <div className="w-full shadow-md">
// //         <ProfilePage />
// //       </div>
// //       <div className="flex flex-1 w-full  mt-4 bg-white shadow-md rounded-lg overflow-hidden">
// //         {/* Hamburger icon for mobile view */}
// //         <div className="md:hidden">
// //           <button onClick={toggleSidebar} className="p-4 focus:outline-none">
// //             <FaBars className="text-2xl" />
// //           </button>
// //         </div>

// //         {/* Sidebar */}
// //         <div className={`md:w-64 flex-shrink-0 md:block  ${isSidebarOpen ? 'block' : 'hidden'}`}>
// //           <Sidebar onClose={closeSidebar} />
// //         </div>

// //         {/* Content area */}
// //         <div className="flex-1 w-full max-w-8xl p-4 overflow-auto">
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardLa



// // const resumeSections = [
// //   { name: 'Contact Information', completed: true },
// //   { name: 'Professional Summary', completed: true },
// //   { name: 'Work History', completed: true },
// //   { name: 'Education', completed: true },
// //   { name: 'Skills', completed: false },
// // ]

// export default function DashboardPage() {
//    const [strength, setStrength] = useState(null);
//    const [resumeId,setResumeId]=useState(null)
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//   const resumeStrength = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "https://api.sentryspot.co.uk/api/jobseeker/resume-list/0",
//         {
//           headers: {
//             Authorization: token
//           }
//         }
//       );

//       if (response.data.code === 200 || response.data.status === "success") {
//         setStrength(response.data.data.resume_strenght_details);
//         setResumeId(response.data.data.resume_id)
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     resumeStrength();
//     // Set up an interval to refresh data every 5 minutes
//     const interval = setInterval(resumeStrength, 300000);
    
//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, []); // Empty dependency array means this effect runs once on mount

//   if (loading) {
//     return (
//       <div className="bg-blue-50 p-6 rounded-lg mb-6">
//         <p className="text-gray-600">Loading resume strength...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 p-6 rounded-lg mb-6">
//         <p className="text-red-600">Error loading resume strength: {error}</p>
//       </div>
//     );
//   }
//   return (
//    <>
//        <Navbar />
//     <div className="flex flex-col max-w-7xl mx-auto md:flex-row min-h-screen bg-white p-4">
//       {/* Sidebar */}
//       <Sidebar 
//       score={strength.resume_strenght}
//         resumeId={resumeId}
//       />

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <h1 className="text-2xl font-bold mb-6">Your Recommended Next Steps</h1>
        
//         <ResumeStrength score={strength.resume_strenght} strength={strength} resumeId={resumeId} />
//         {/* <ProfileSection visits={4} /> */}
//         <InterviewSection />
//         <CoverLetterSection />
//       </main>
//     </div>
//    </>
//   )
// }





import { useEffect, useState } from "react"
import CoverLetterSection from "../../components/dashboard/CoverLetterSection"
import InterviewSection from "../../components/dashboard/InterviewSection"
import ResumeStrength from "../../components/dashboard/ResumeStrength"
import Sidebar from "../../components/dashboard/Sidebar"
import Navbar from "../Navbar/Navbar"
import axios from "axios"


export default function DashboardPage() {
   const [strength, setStrength] = useState(null);
   const [resumeId,setResumeId]=useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const resumeStrength = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.sentryspot.co.uk/api/jobseeker/resume-list/0",
        {
          headers: {
            Authorization: token
          }
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setStrength(response.data.data.resume_strenght_details);
        setResumeId(response.data.data.resume_id)
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resumeStrength();
    // Set up an interval to refresh data every 5 minutes
    const interval = setInterval(resumeStrength, 300000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <p className="text-gray-600">Loading resume strength...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg mb-6">
        <p className="text-red-600">Error loading resume strength: {error}</p>
      </div>
    );
  }
  return (
   <>
       <Navbar />
    <div className="flex flex-col max-w-7xl mx-auto md:flex-row min-h-screen bg-white p-4">
      {/* Sidebar */}
      <Sidebar 
      score={strength.resume_strenght}
        resumeId={resumeId}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Your Recommended Next Steps</h1>
        
        <ResumeStrength score={strength.resume_strenght} strength={strength} resumeId={resumeId} />
        {/* <ProfileSection visits={4} /> */}
        <InterviewSection />
        <CoverLetterSection />
      </main>
    </div>
   </>
  )
}

