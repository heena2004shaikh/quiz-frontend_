import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../../service/Apiservice';

const AdminDashboard = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await ApiService.getAllTests();
      setTests(res.data);
    } catch (err) {
      console.error('Failed to load tests', err);
    }
  };

  const handleDelete = async (testId) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      try {
        await ApiService.deleteTestById(testId);
        alert("Test deleted successfully!");
        fetchTests(); 
      } catch (err) {
        console.error("Error deleting test:", err);
        alert("Failed to delete test.");
      }
    }
  };

  const handleEdit = (testId) => {
    navigate(`/admin/edit-test/${testId}`); 
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-10">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        {tests.map((test) => (
          <div key={test.id} className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-2">{test.title}</h2>
            <p className="mb-1">
              <strong>Time:</strong> {Math.floor(test.time / 60)} minutes {test.time % 60} seconds
            </p>
            <p className="mb-4">
              <strong>Description:</strong> {test.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate(`/admin/add-question/${test.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Question
              </button>

              <button
                onClick={() => navigate(`/view-test/${test.id}`)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                View Test
              </button>

              <button
                onClick={() => handleEdit(test.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(test.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
