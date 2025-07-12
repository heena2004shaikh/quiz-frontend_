import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewTestsPage = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [testInfo, setTestInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/test/${testId}`);
        console.log('✅ API Response:', response.data);
        setQuestions(response.data.questions);      
        setTestInfo(response.data.testDTO);          
      } catch (err) {
        console.error(err);
        setError('❌ Failed to load questions: ' + (err.response?.data || err.message));
      }
    };

    fetchQuestions();
  }, [testId]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      {testInfo && (
        <>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            {testInfo.title} (Test #{testId})
          </h2>
          <p className="mb-4 text-gray-600">{testInfo.description}</p>
        </>
      )}

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {Array.isArray(questions) && questions.length > 0 ? (
        <ol className="space-y-6 list-decimal ml-6">
          {questions.map((q) => (
            <li key={q.id} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="font-semibold text-lg">{q.questionText}</h3>
              <ul className="mt-2 space-y-1 ml-4">
                <li>A) {q.optionA}</li>
                <li>B) {q.optionB}</li>
                <li>C) {q.optionC}</li>
                <li>D) {q.optionD}</li>
              </ul>
              <p className="mt-2 text-sm text-green-600">✅ Correct Option: {q.correctOption}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-500">No questions found for this test.</p>
      )}
    </div>
  );
};

export default ViewTestsPage;
