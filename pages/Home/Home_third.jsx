import Link from "next/link";
import Image from "next/image";
import image from './Images/homeimage1.jpg'
import icon1 from './Images/video_icon1.png'
import icon2 from './Images/video_icon2.gif'
import icon3 from './Images/video_icon3.gif'
import icon4 from './Images/video_icon4.gif'
import image1 from './Images/homeimage1.jpg'
import image2 from './Images/resume3.jpg'
import image3 from './Images/homeimage2.jpg'
import cvimage1 from './Images/cv4.jpg'
import cvimage2 from './Images/homeimage3.jpg'
import cvimage3 from './Images/cv3.jpg'
import Home_fourth from "./Home_fourth";

function Home_third() {
    return ( <>
    <div className=' bg-gray-200  py-10 mb-3' >
      <div className=' flex justify-center '>
        <div className=' md:w-[78%] rounded-xl py-5 px-4' id='home_third'>
          
        <div className=' flex flex-col gap-2 justify-evenly md:flex-row  text-white rounded-xl  px-5 ' >
          
          <div >
            
            <Image src={image} alt="" className=' h-[400px] w-[400px] rounded-xl shadow-lg shadow-gray-600 ' />
          </div>
          <div className='flex flex-col font-semibold px-3 gap-5'>
          <h1 className=' text-center font-bold text-4xl py-2  text-white'>How Our AI Resume Works For You</h1>
                 <div>
                    <div className='flex items-center hover:border-b-2 shadow-lg rounded-2xl py-2 shadow-gray-600 px-3 hover:border-slate-500 hover:rounded-lg  gap-2'>
                        <div>
                          <Image src={icon1} className=' h-16 w-16'/>
                        </div>
                        <div className=' text-xl'>
                            
                            <p>Check Resume Score,
                            In few seconds with just couple of clicks.</p>
                        </div>
                    </div>
                    <div className='flex items-center shadow-lg rounded-2xl px-3 hover:border-b-2 py-2 shadow-gray-600 hover:border-slate-500 hover:rounded-lg gap-2'>
                        <div>
                          <Image src={icon2} className=' h-16 w-16'/>
                        </div>
                        <div className=' text-xl'>
                            
                            <p>Our AI does deep checks on your resume & suggest you edits.</p>
                        </div>
                    </div>
                    
                     <div className='flex items-center shadow-lg rounded-2xl px-3 hover:border-b-2 py-2 shadow-gray-600 hover:border-slate-500 hover:rounded-lg gap-2'>
                     <div>
                          <Image src={icon3} className=' h-16 w-16'/>
                        </div>
                        <div className=' text-xl'>
                            
                            <p>Land in Abroad Interviews with our AI technology. </p>
                        </div>
                     </div>
                     <div className='flex items-center shadow-lg rounded-2xl px-3 hover:border-b-2 py-2 shadow-gray-600 hover:border-slate-500 hover:rounded-lg gap-2'>
                     <div>
                          <Image src={icon4} className=' h-16 w-16'/>
                        </div>
                        <div className=' text-xl'>
                            
                            <p>Improve Resume with our robust AI, in just few clicks.</p>
                        </div>
                     </div>
                
                  </div>          
          </div>


                
        </div>
      </div>
      </div>

   {/* <Home_Video/> */}

{/* Start Building component */}

      <div className='flex flex-col gap-5  my-8 rounded-xl bg-white justify-center px-5 py-10 shadow-md shadow-gray-600 md:mx-auto md:w-[78%]'>
  <div className='flex flex-col items-center'>
    <h1 className='text-5xl font-bold text-center py-6'>Explore Our Wide Range Of Trending Templates That Recruiters Loves To See
    </h1>
    <div className=' flex gap-2'>
    <div className=' text-lg text-left flex flex-col'>
      <div><i className="fa-solid fa-check border-2 px-2 py-2 rounded-full text-white bg-green-500 "></i>Chosen & Crafted by Our Experts</div>
      <div><i className="fa-solid fa-check border-2 px-2 py-2 rounded-full text-white bg-green-500 "></i>Backed by our Technology</div>
    </div>

    <div className=' text-lg text-left flex flex-col '>      
      <div><i className="fa-solid fa-check border-2 px-2 py-2 rounded-full text-white bg-green-500 "></i> Powered by our Robust AI </div>
       <div><i className="fa-solid fa-check border-2 px-2 py-2 rounded-full text-white bg-green-500 "></i> Get it ready in less than 15 minutes</div>
    </div>
    </div>
  </div>
  <div className='flex flex-col justify-center gap-5 items-center md:flex-row'>
    {[
      { src: image1, alt: "Assistant Editor Resume Example", title: "Create Resume Template" },
      { src: cvimage2, alt: "Farmer Resume Template", title: "Simple Resume Template" },
      { src: image3, alt: "Doctor Resume Template", title: "Modern Resume Template" }
    ].map((template, index) => (
      <div key={index} className='relative group'>
        <Image src={template.src} alt={template.alt} className=' h-96 w-full rounded-xl hover:h-[400px]' />
        <h1 className='font-bold text-xl text-center mt-2' id='homecard'>{template.title}</h1>
        <Link href="/dashboard/profile">
        <button className='absolute top-0 left-0 right-0 bottom-0 m-auto w-fit h-fit  text-white font-bold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' id='home_third'>Build Your Resume Now</button>
      </Link></div>
    ))}
  </div>
</div>

<div className='flex flex-col gap-5 px-9 py-7 shadow-xl shadow-gray-600 bg-white rounded-xl md:mx-auto md:w-[79%]'>
  <div className='flex flex-col items-center'>
    <h1 className='text-5xl font-bold text-center py-6'>Make Your Resume Using Real-World Examples</h1>
    <p className=' text-xl'>Browse <span className=' font-semibold text-blue-600'>350+ popular resume</span> examples covering all types of jobs, industries and levels of experience. Every example has been reviewed and approved by a Certified Professional Resume Writer (CPRW).
    </p>
  </div>
  <div className='flex flex-col justify-center gap-5 items-center md:flex-row'>
            {[
                { src: "https://www.resume-now.com/sapp/uploads/2023/11/resume-example-teacher.svg", alt: "Assistant Editor Resume Example", title: "Teacher Resume" },
                { src: "https://www.resume-now.com/sapp/uploads/2023/11/resume-example-registered-nurse.svg", alt: "Farmer Resume Template", title: "Registered Nurse Resume" },
                { src: "https://www.resume-now.com/sapp/uploads/2023/11/resume-example-college-student.svg", alt: "Doctor Resume Template", title: "College Resume" },
                { src: "https://www.resume-now.com/sapp/uploads/2023/11/resume-example-administrative-assistant.svg", alt: "Doctor Resume Template", title: "Administrative Assistant Resume" }
            ].map((template, index) => (
                <div key={index} className='relative group'>
                    <Image 
                        src={template.src} 
                        alt={template.alt} 
                        width={400} 
                        height={400} 
                        className='h-[400px] w-full rounded-xl object-cover' 
                    />
                    <h1 className='font-bold text-xl text-center mt-2' id='homecard'>{template.title}</h1>
                    <Link href="/dashboard/profile">
                        <button className='absolute top-0 left-0 right-0 bottom-0 m-auto w-fit h-fit bg-blue-600 text-white font-bold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' id='home_third'>
                            Create Your Resume
                        </button>
                    </Link>
                </div>
            ))}
        </div>
</div>


{/* Looking for CV or Cover Letter */}

<div className='flex flex-col gap-5 px-5 py-10 md:mx-auto md:w-[70%]'>
  <div className='flex flex-col items-center'>
    <h1 className='text-5xl font-bold text-center py-6'>Looking For Impressive Cover Letters?</h1>
    <p className=' text-lg'>Explore from our 25+ premium Cover Letters, Which are exclusively crafted by our Experts.
    </p>
  </div>
  <div className='flex flex-col justify-center gap-5 items-center md:flex-row'>
    {[
      { src: cvimage1, alt: "Assistant Editor Resume Example", title: "Cover Letter Example" },
      { src: image2, alt: "Farmer Resume Template", title: "Cover Letter Examples" },
      { src: cvimage3, alt: "Farmer Resume Template", title: "Cover Letter Examples" }
    ].map((template, index) => (
      <div key={index} className='relative group'>
        <Image src={template.src} alt={template.alt} className=' h-[400px] w-full border-2 rounded-lg shadow-xl shadow-gray-500' />
        <h1 className='font-bold  text-xl text-center mt-2' id='homecard'>{template.title}</h1>
        <Link href="/dashboard/profile">
        <button className='absolute top-0 left-0 right-0 bottom-0 m-auto w-fit h-fit bg-blue-600 text-white font-bold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' id='home_third'>Create Your CV </button>
        </Link> </div>
    ))}
  </div>
</div>
</div>
<Home_fourth/>
    </>
  )
}


export default Home_third;