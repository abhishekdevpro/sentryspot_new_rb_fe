


import { useEffect, useState } from "react"
import CoverLetterSection from "../../components/dashboard/CoverLetterSection"
import InterviewSection from "../../components/dashboard/InterviewSection"
import ResumeStrength from "../../components/dashboard/ResumeStrength"
import Sidebar from "../../components/dashboard/Sidebar"
import Navbar from "../Navbar/Navbar"
import axios from "axios"
import MyResume from "./MyResume"
import MyJobs from "./MyJobs"


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
    <MyResume />
    <MyJobs />
   </>
  )
}

