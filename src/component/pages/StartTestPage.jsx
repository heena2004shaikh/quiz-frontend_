import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StartTestPage = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [testInfo, setTestInfo] = useState(null);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null); 

  useEffect(() => {
    const fetchTestQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/test/${testId}`);
        setQuestions(res.data.questions);
        setTestInfo(res.data.testDTO);
        setRemainingTime(res.data.testDTO.time);
      } catch (err) {
        setError('❌ Failed to load questions: ' + (err.response?.data || err.message));
      }
    };

    fetchTestQuestions();
  }, [testId]);

  // Timer logic 
  useEffect(() => {
    if (!remainingTime || submitted) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, submitted]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    const payload = {
      testId: parseInt(testId),
      userId: user.id,
      responses: Object.keys(answers).map((qid) => ({
        questionId: parseInt(qid),
        selectedOption: answers[qid]
      }))
    };

    try {
      const res = await axios.post('http://localhost:8080/api/test/submit-test', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      setError('❌ Submission failed: ' + (err.response?.data || err.message));
    }
  };

  const currentQuestion = questions[currentIndex];

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      {testInfo && !submitted && (
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-1">{testInfo.title}</h2>
            <p className="text-gray-600">{testInfo.description}</p>
          </div>
          <div className="text-lg font-semibold text-red-600">
            ⏱ Time Left: {formatTime(remainingTime)}
          </div>
        </div>
      )}

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {!submitted ? (
        questions.length === 0 ? (
          <p>No questions available for this test.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-100 p-5 rounded shadow">
              <h3 className="font-semibold text-lg mb-3">
                Q{currentIndex + 1}: {currentQuestion?.questionText}
              </h3>
              <div className="space-y-2 ml-4">
                {['A', 'B', 'C', 'D'].map((option) => (
                  <label key={option} className="block">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={() => handleOptionChange(currentQuestion.id, option)}
                      className="mr-2"
                      required
                    />
                    {option}) {currentQuestion[`option${option}`]}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>

              {currentIndex === questions.length - 1 ? (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        )
      ) : (
        <div className="mt-10 bg-green-100 p-6 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Test Submitted!</h2>
          <p className="text-lg"><strong>Total Questions:</strong> {result.totalQuestion}</p>
          <p className="text-lg"><strong>Correct Answers:</strong> {result.correctAnswer}</p>
          <p className="text-lg"><strong>Percentage:</strong> {result.percentage.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default StartTestPage;
