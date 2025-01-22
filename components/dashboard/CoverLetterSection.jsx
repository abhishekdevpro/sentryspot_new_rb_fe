// import { Mail } from "lucide-react"
// import { useRouter } from "next/router"
// import FullScreenLoader from "../ResumeLoader/Loader"

// const CoverLetterSection = ({ letterCount }) => {
//   const router = useRouter()
//   const handleClick =()=>{
//     <FullScreenLoader/>
//     router.push('/dashboard/cvletterlist');
//   }
//     return (
//       <div className="border border-gray-200 rounded-lg p-6">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <Mail/>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold">Your Cover Letters</h3>
//               {/* <p className="text-gray-600">Cover Letter: Letter_1</p> */}
//             </div>
//           </div>
//           <button
//           onClick={handleClick}
//            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
//             View Cover Letters
//           </button>
//         </div>
//       </div>
//     )
//   }
  
//   export default CoverLetterSection
  
  
import { Mail } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import FullScreenLoader from "../ResumeLoader/Loader";

const CoverLetterSection = ({ letterCount }) => {
  const [showLoader, setShowLoader] = useState(false); // State to control loader visibility
  const router = useRouter();

  const handleClick = () => {
    setShowLoader(true); // Show the loader
    setTimeout(() => {
      router.push('/dashboard/cvletterlist'); // Navigate after 3 seconds
    }, 2000); // 3-second delay
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      {/* Show loader if `showLoader` is true */}
      {showLoader && <FullScreenLoader />}
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Mail />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Your Cover Letters</h3>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
        >
          View Cover Letters
        </button>
      </div>
    </div>
  );
};

export default CoverLetterSection;
