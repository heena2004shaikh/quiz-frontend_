import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTest = () => {
  const [test, setTest] = useState({
    title: '',
    description: '',
    time: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/test', {
        title: test.title,
        description: test.description,
        time: parseInt(test.time)
      });

      setMessage('✅ Test created successfully!');
      setTest({ title: '', description: '', time: '' });

      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (error) {
      setMessage('❌ Failed to create test: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Create New Test</h2>

      {message && (
        <div className="mb-4 text-center text-sm text-green-600">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            type="text"
            value={test.title}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:ring focus:ring-blue-300"
            placeholder="Enter test title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={test.description}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:ring focus:ring-blue-300"
            placeholder="Describe the test"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Time (in minutes)</label>
          <input
            name="time"
            type="number"
            value={test.time}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:ring focus:ring-blue-300"
            placeholder="e.g. 60"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Test
        </button>
      </form>
    </div>
  );
};

export default CreateTest;
