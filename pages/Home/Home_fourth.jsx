import Link from "next/link";
import blog3 from './Images/blog3.jpg'
import Home_five from "./Home_five";

const Home_fourth = () => {

    const course =[
    
        {
            img:"https://blog.sentryspot.co.uk/wp-content/uploads/2024/09/Untitled-design-6.jpg", title:"AI and Bias in Hiring: How AI Can Perpetuate or Reduce Bias in the Hiring Process",link:"https://blog.sentryspot.co.uk/ai-and-bias-in-hiring-how-ai-can-perpetuate-or-reduce-bias-in-the-hiring-process/"
        },
        {
          img:"https://blog.sentryspot.co.uk/wp-content/uploads/2024/09/Untitled-design-6.jpg", title:"AI and Bias in Hiring: How AI Can Perpetuate or Reduce Bias in the Hiring Process",link:"https://blog.sentryspot.co.uk/ai-and-bias-in-hiring-how-ai-can-perpetuate-or-reduce-bias-in-the-hiring-process/"
      },
    
      {
        img:"https://blog.sentryspot.co.uk/wp-content/uploads/2024/09/Untitled-design-6.jpg", title:"AI and Bias in Hiring: How AI Can Perpetuate or Reduce Bias in the Hiring Process",link:"https://blog.sentryspot.co.uk/ai-and-bias-in-hiring-how-ai-can-perpetuate-or-reduce-bias-in-the-hiring-process/"
    },
    
    {
      img:"https://blog.sentryspot.co.uk/wp-content/uploads/2024/09/Untitled-design-6.jpg", title:"AI and Bias in Hiring: How AI Can Perpetuate or Reduce Bias in the Hiring Process",link:"https://blog.sentryspot.co.uk/ai-and-bias-in-hiring-how-ai-can-perpetuate-or-reduce-bias-in-the-hiring-process/"
  }
        
      ];
    return (
      <>
        <div id="course" className="bg-[#003479] py-10 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-bold px-4 lg:px-0 py-5 text-center text-white">
              Newest Strategies From Our Career Search Advisors
            </h1>
            <p className="mx-auto px-4 lg:px-0 text-lg lg:text-base text-white max-w-4xl text-center mb-8">
              You’re never alone in your job search. Whether you’re writing a
              cover letter, preparing for the interview, or negotiating your
              salary, our resource center has articles that will help you take
              the next step in your career.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {course.map((card, index) => (
                <a
                  key={index}
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-between h-full bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105"
                >
                  <img
                    src={card.img}
                    alt="Course"
                    className="w-full h-auto border-2 rounded-t-md"
                  />
                  <div className="p-4">
                    <h2 className="text-lg lg:text-lg font-bold mb-2">
                      {card.title}
                    </h2>
                    {/* <p className="text-sm text-gray-600">{card.name}</p> */}
                  </div>
                </a>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Link href={"https://blog.sentryspot.co.uk/"}>
                <button className="px-6 py-3 text-lg font-semibold text-white bg-[#e60278] hover:bg-pink-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600">
                  Get More Career Advice
                </button>
              </Link>
            </div>
          </div>
        </div>

        <Home_five />
      </>
    );
  };
  
  export default Home_fourth;
  