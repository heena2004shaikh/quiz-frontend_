import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AdminResultsPage = () => {
  const { testId } = useParams(); 
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/test/test-result');

        const filteredResults = testId
          ? res.data.filter((r) => r.testId === parseInt(testId))
          : res.data;

        setResults(filteredResults);
      } catch (err) {
        setError('❌ Failed to load results: ' + (err.response?.data || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [testId]);

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        📊 {testId ? `Results for Test #${testId}` : 'All Test Results'}
      </h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Loading results...</p>
      ) : results.length === 0 ? (
        <p>No results found {testId ? 'for this test.' : '.'}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-left text-sm text-gray-700">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Test Name</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Total Questions</th>
              <th className="px-4 py-2">Correct Answers</th>
              <th className="px-4 py-2">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr key={res.id} className="border-t hover:bg-gray-50 text-sm">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{res.testName || `Test ${res.testId}`}</td>
                <td className="px-4 py-2">{res.userName || `User ${res.userId}`}</td>
                <td className="px-4 py-2">{res.totalQuestion}</td>
                <td className="px-4 py-2">{res.correctAnswer}</td>
                <td className="px-4 py-2">{res.percentage?.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminResultsPage;
