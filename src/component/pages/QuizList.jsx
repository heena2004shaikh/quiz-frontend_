import React from 'react';
import quizzes from '../../data/quizzes.js';
import { Link } from 'react-router-dom';

const QuizList = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {quizzes.map(quiz => (
        <div key={quiz.id} className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-lg font-semibold">{quiz.title}</h2>
          <Link to={`/quiz/${quiz.id}`} className="text-blue-600 hover:underline">
            Start Quiz
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
