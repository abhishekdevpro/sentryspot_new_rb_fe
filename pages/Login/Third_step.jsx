// import React, { useState, useEffect } from 'react';
// import logo from './logo.png'
// import Modal from "./Modal";
// import Student from './Student'

// function Third() {
//     const [isStudentOpen, setStudentOpen] = useState(false);
//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission logic here
//       };
//   return (
//     < >
//       <div className='min-h-screen flex justify-end  py-2'>
        
//         <div className='p-8 rounded-xl shadow-lg shadow-slate-700 w-full max-w-lg' >
//         <div className=' flex bg-black '>
//         <div><img src={logo} className=' h-10 w-full'/></div>
//         <div className='text-2xl text-white font-bold'>Let's Get Started</div>
//         </div>
//           <h3 className='text-xl text-black font-semibold py-5 text-center'>People across Globe are joining us to upgrade their career with our Robust AI</h3>
          

//           <form onSubmit={handleFormSubmit} >
//             <div className='mb-4'>
//               <label className='block text-black'>Most Recent Job Title</label>
//               <input
//                 type='text'
//                 name='first_name'
//                 className='w-full px-3 py-2 border rounded-md'
//                 placeholder='Job Title'
                
//               />
//             </div>
//             <div className='mb-4'>
//               <label className='block text-black'>Most Recent Company Name</label>
//               <input
//                 type='text'
//                 name='last_name'
//                 className='w-full px-3 py-2 border rounded-md'
//                 placeholder='Company Name'
                
//               />
//             </div>
//             <div className='mb-4'>
//               <label className='block text-black'>Job Location</label>
//               <input
//                 type='text'
//                 name='last_name'
//                 className='w-full px-3 py-2 border rounded-md'
//                 placeholder='Company Name'
                
//               />
//             </div>
//             <button
//             type='button'
//           className="bg-yellow-500 text-white px-4 m-3 py-2 rounded-md"
//           onClick={() => setStudentOpen(true)}
//         >
//          I am a Student
//         </button>
            
//             <button type='submit' className='w-full py-2 px-4 bg-yellow-500 text-black font-semibold rounded-md'>
//               Finish
//             </button>
//           </form>
//         </div>
//       </div>
//       <Modal isOpen={isStudentOpen} onClose={() => setStudentOpen(false)}>
//         <Student />
//       </Modal>
//     </>
//   );
// }

// export default Third;


// Third.js
import React, { useState } from 'react';
import logo from './logo.png';
import Modal from "./Modal";
import Student from './Student';

function Third() {
  const [isStudentOpen, setStudentOpen] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='min-h-screen flex justify-end py-2'>
      <div className='p-8 rounded-xl shadow-lg shadow-slate-700 w-full max-w-lg'>
        <div className='flex bg-black'>
          <div>
            <img src={logo} className='h-10 w-full' alt='Logo' />
          </div>
          <div className='text-2xl text-white font-bold'>Let's Get Started</div>
        </div>
        <h3 className='text-xl text-black font-semibold py-5 text-center'>
          People across the globe are joining us to upgrade their career with our Robust AI
        </h3>

        <form onSubmit={handleFormSubmit}>
          <div className='mb-4'>
            <label className='block text-black'>Most Recent Job Title</label>
            <input
              type='text'
              name='job_title'
              className='w-full px-3 py-2 border rounded-md'
              placeholder='Job Title'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-black'>Most Recent Company Name</label>
            <input
              type='text'
              name='company_name'
              className='w-full px-3 py-2 border rounded-md'
              placeholder='Company Name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-black'>Job Location</label>
            <input
              type='text'
              name='job_location'
              className='w-full px-3 py-2 border rounded-md'
              placeholder='Job Location'
            />
          </div>
          <button
            type='button'
            className='bg-yellow-500 text-white px-4 m-3 py-2 rounded-md'
            onClick={() => setStudentOpen(true)}
          >
            I am a Student
          </button>
          <button type='submit' className='w-full py-2 px-4 bg-yellow-500 text-black font-semibold rounded-md'>
            Finish
          </button>
        </form>
      </div>
      <Modal isOpen={isStudentOpen} onClose={() => setStudentOpen(false)}>
        <Student />
      </Modal>
    </div>
  );
}

export default Third;
