import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState({ title: '', description: '', time: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/test/${testId}`);
        setTest(res.data.testDTO); 
      } catch (err) {
        setError('❌ Failed to load test: ' + (err.response?.data || err.message));
      }
    };
    fetchTest();
  }, [testId]);

  const handleChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/test/${testId}`, test);
      alert('✅ Test updated successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      setError('❌ Failed to update: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">✏️ Edit Test</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={test.title}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={test.description}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Time (in seconds)</label>
          <input
            type="number"
            name="time"
            value={test.time}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Test
        </button>
      </form>
    </div>
  );
};

export default EditTestPage;
