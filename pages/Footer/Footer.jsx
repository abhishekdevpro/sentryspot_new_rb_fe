import React from 'react';
import Image from 'next/image';
import logo from '../Footer/logo.jpg'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form default behavior
    
        // Sending raw JSON data in the POST request
        axios.post('https://api.resumeintellect.com/api/user/user-subscribe', 
          JSON.stringify({ email }), // Sending email in raw JSON
          {
            headers: {
              'Content-Type': 'application/json', // Specify raw JSON
            },
          }
        )
          .then(response => {
            // Handle the response, show a success message
            setMessage('Subscribed successfully!');
            toast.success('Subscribed successfully!');
          })
          .catch(error => {
            // Handle the error, show an error message
            setMessage('Subscription failed. Please try again.');
            console.error('Error subscribing:', error);
          });
      };

    

    return (
      <>
      <ToastContainer/>
        <footer className=" bg-black text-white py-8" id='footerbg'>
            <div className="container mx-auto flex flex-col gap-7 justify-between px-6">
              <div className=' flex flex-wrap justify-between px-2 md:px-[65px]'>
                <div className=" md:w-auto mb-6 md:mb-0">
                    <Image src={logo} className=' h-14 w-full'/>
                    <p className=' text-lg text-bold px-5'>Building Careers of Tomorrow</p>
                </div>
                <div className="w-full md:w-auto mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold text-white">Get Our Weekly</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <input 
          type="email" 
          placeholder="Type your email..." 
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Update the email state
          required 
          className="p-2 rounded text-black" 
        />
        <button type="submit" className="md:px-4 md:py-1 p-1 rounded-full bg-white text-black hover:bg-orange-500">
          Subscribe
        </button>
      </form>
      {message && <p>{message}</p>} {/* Display message */}
                </div>
                </div>
                <br/>
                <div className=' flex flex-wrap justify-around'>
                <div className="w-full md:w-auto mb-6 md:mb-0" id='footer'>
                    <h2 className="text-lg font-bold text-white">Resume Intellect</h2>
                    <ul>
                        <li><a href="/footerr/Aboutus" className="">About Us</a></li>
                        <li><a href="/footerr/Careers" className="">Careers</a></li>
                        <li><a href="/footerr/Placement" className="">Placement Support</a></li>
                        <li><a href="https://www.Resume Intellect.ca/blog/" className="">Resources</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-auto mb-6 md:mb-0">
                    <h2 className="text-lg font-bold text-white">Support</h2>
                    <ul>
                        {/*//<li><a href="https://www.Resume Intellect.ca/#contact" className="">Contact</a></li> */}
                        <li><a href="/footerr/Salarytools" className="">Salary Tool</a></li>
                   
                        <li><a href="/footerr/TermsandConditions" className="">Terms & Conditions</a></li>
                        <li><a href="/footerr/PrivacyPolicy" className="">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-auto mb-6 md:mb-0">
                    <h2 className="text-lg font-bold text-white">Scope & Products</h2>
                    <ul>
                        <li><a href="/footerr/AiResumeBuilder" className="">Ai Resume Builder</a></li>
                        <li><a href="/footerr/AiSkillTests" className="">Ai Skill Tests</a></li>
                        <li><a href="/footerr/AiCVParsing" className="">Ai CV Parsing</a></li>
                        <li><a href="" className="">White Labelling</a></li>
                        <li><a href="#" className="">Generative AI</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-auto mb-6 md:mb-0">
                    <h2 className="text-lg font-bold text-white">Ai Resources</h2>
                    <ul>
                        <li><a href="/footerr/AIEnhancedResumeAccuracy" className="">Ai - Resume Accuracy</a></li>
                        <li><a href="/footerr/AiResumeEnhancer" className="">Ai - Resume Enhancer</a></li>
                        <li><a href="/footerr/AiJobMatchApply" className="">Ai - Job Match & Apply</a></li>
                
                    </ul>
                </div>
                </div>
            </div>
            <div className="container text-base md:mx-auto text-center border-t border-white pt-6 mt-6">
                <p className="text-white text-right">&copy; Copyright By Resume Intellect.ca All Rights Reserved</p>
            </div>
        </footer>
        </>
    );
}

export default Footer;
