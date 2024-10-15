import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = ({
  question,
  onNext,
  onPrevious,
  disablePrevious,
  disableNext,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { skillId, skillName } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  console.log('token:', token);

  console.log('Rendering QuestionDetail:', question);

  if (!question) {
    return <div>Loading...</div>;
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("token",token);
    console.log("skillId", skillId);
    console.log("skillName", skillName);
    if (selectedOption === null) {
      alert('Please select an option before submitting.');
      return;
    }

    try {
      const url = `https://api.resumeintellect.com/api/user/skill-assessment?skill_id=${skillId}&skill_name=${encodeURIComponent(skillName)}`;
      console.log('Request URL:', url);
      const response = await axios.post(
        url,
        {
          questionId: question.id,
          selectedOption,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`, // Include token in Authorization header
          },
        }
      );
      console.log("response",response)
      // Navigate to Skills component with the results
      navigate('/skills', { state: { result: response.data } });
    } catch (error) {
      console.error('Error checking answer:', error);
      alert('There was an error checking your answer. Please try again later.');
    }
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="flex-1 py-24 bg-slate-200 px-5">
      <h1 className="text-2xl mb-4">{question.question}</h1>
      <ul className="mb-4">
        {question.options.map((option, index) => (
          <li key={index} className="mb-2">
            <input
              type="radio"
              id={`option-${index}`}
              name="option"
              value={option}
              className="mr-2"
              onChange={handleOptionChange}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button
          className={`p-2 bg-blue-500 rounded-md text-white ${
            disablePrevious ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          onClick={onPrevious}
          disabled={disablePrevious}
        >
          Previous
        </button>
        {isLastQuestion ? (
          <button className="p-2 bg-green-500 rounded-md text-white hover:bg-green-700" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button
            className={`p-2 bg-blue-500 rounded-md text-white ${
              disableNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            onClick={onNext}
            disabled={disableNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionDetail;
