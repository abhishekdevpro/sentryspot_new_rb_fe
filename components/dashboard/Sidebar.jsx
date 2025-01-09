import { Download, Edit } from "lucide-react"
import Template1 from "../preview/template/template1.png"
import { useRouter } from "next/router"
const Sidebar = ({ score,resumeId }) => {
  const router = useRouter()
  const hnadleEdit =()=>{
    router.push(`/dashboard/aibuilder/${resumeId}`)
  }
  const handleCreate=()=>{
    router.push(`/dashboard/aibuilder`)
  }
    return (
      <div className="w-full md:w-[400px] p-4 border-r border-gray-200 h-screen ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Resume_1</h2>
          <a href="#" className="text-blue-600 hover:text-blue-700">View All</a>
        </div>
  
        {/* Resume Preview */}
        <div className="border border-gray-200 rounded-lg shadow-sm p-2 mb-4">
          <img 
            src={"https://builder.zety.com/thumbnail/documentprod/a1300cca-ab79-49e1-b31d-2dc4b680dae6/283ffb2f-75bc-4987-a957-479914008a20/5caba74d-715b-40de-8b4b-43748c7835af.png"}
            alt="Resume Preview" 
            className="w-full h-auto rounded"
          />
        </div>
  
        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={hnadleEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Edit />
            Edit
          </button>
          <button 
            onClick={hnadleEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download />
            Download
          </button>
        </div>
  
        {/* Resume Strength */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Resume Strength:</span>
            <div className="flex items-center gap-2">
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm">{score}</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm">Improve</button>
            </div>
          </div>
        </div>
  
        {/* Create New Resume Button */}
        <button 
          onClick={handleCreate}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Resume
        </button>
      </div>
    )
  }
  
  export default Sidebar
  
  