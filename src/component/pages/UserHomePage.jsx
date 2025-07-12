import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserHomePage = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/test');
        setTests(response.data);
      } catch (err) {
        setError('Failed to fetch tests: ' + (err.response?.data || err.message));
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-blue-200 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Available Tests</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test) => (
          <div key={test.id} className="bg-white border shadow rounded p-6">
            <h2 className="text-xl font-semibold">{test.title}</h2>
            <p className="text-gray-600 mb-2">{test.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              ⏱ Duration: {test.time} minutes
            </p>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => navigate(`/start-test/${test.id}`)}
            >
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHomePage;
