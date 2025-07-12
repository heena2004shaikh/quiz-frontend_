import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizzes from '../../data/quizzes';

const QuizPlayer = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  
  const quiz = quizzes.find(q => q.id === parseInt(quizId));

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  
  if (!quiz) {
    return (
      <div className="text-center mt-10 text-red-600">
        <h2 className="text-xl font-bold">Quiz Not Found</h2>
        <p>Invalid quiz ID. Please return to the <button onClick={() => navigate('/')} className="underline text-blue-600">quiz list</button>.</p>
      </div>
    );
  }

  const question = quiz.questions[current];

  const handleSubmit = () => {
    if (selected === question.correctAnswer) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelected('');
    setShowFeedback(false);
    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg">Your Score: <strong>{score} / {quiz.questions.length}</strong></p>
        <button
          onClick={() => navigate('/my-attempts')}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          View My Attempts
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">
        Question {current + 1} of {quiz.questions.length}
      </h2>
      <p className="mb-4 font-medium">{question.text}</p>

      {question.options.map((opt, i) => (
        <label key={i} className="block mb-2">
          <input
            type="radio"
            name="answer"
            value={opt}
            checked={selected === opt}
            onChange={() => setSelected(opt)}
            disabled={showFeedback}
            className="mr-2"
          />
          {opt}
        </label>
      ))}

      {!showFeedback ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={`mt-4 px-6 py-2 rounded text-white ${selected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Submit
        </button>
      ) : (
        <div className="mt-4">
          <p className={`font-semibold ${selected === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
            {selected === question.correctAnswer ? 'Correct!' : `Incorrect! Correct answer: ${question.correctAnswer}`}
          </p>
          <button
            onClick={handleNext}
            className="mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            {current + 1 < quiz.questions.length ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPlayer;
