import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAttemptsPage = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.id) {
          setError('User not logged in.');
          return;
        }

        const res = await axios.get('http://localhost:8080/api/test/test-result');
        console.log("👉 Logged in user:", user);
        console.log("👉 Raw test results:", res.data);

        const userResults = res.data.filter((r) => {
          return r && r.userId?.toString() === user.id.toString();
        });

        setAttempts(userResults);
      } catch (err) {
        setError('❌ Failed to load your attempts: ' + (err.response?.data || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchUserResults();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">📝 My Attempts</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Loading your attempts...</p>
      ) : attempts.length === 0 ? (
        <p className="text-gray-500">You haven't attempted any tests yet.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow">
          <thead>
            <tr className="bg-blue-100 text-left">
              
              <th className="px-4 py-2">Test Name</th>
              <th className="px-4 py-2">Total Questions</th>
              <th className="px-4 py-2">Correct</th>
              <th className="px-4 py-2">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt, index) => (
              <tr key={attempt.id || index} className="border-t hover:bg-gray-50">
                
                <td className="px-4 py-2">{attempt.testName || `Test #${attempt.testId}`}</td>
                <td className="px-4 py-2">{attempt.totalQuestion}</td>
                <td className="px-4 py-2">{attempt.correctAnswer}</td>
                <td className="px-4 py-2">{attempt.percentage?.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAttemptsPage;
