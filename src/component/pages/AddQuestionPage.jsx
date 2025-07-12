import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
const AddQuestionPage = () => {
  const [tests, setTests] = useState([]);
  const [question, setQuestion] = useState({
    id: '',
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 


  // Load test list
  useEffect(() => {
    axios.get('http://localhost:8080/api/test')
      .then(res => setTests(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/test/question', question);
      alert('Question added successfully!');
      navigate('/admin/dashboard'); 
    } catch (error) {
      setMessage('Error adding question: ' + (error.response?.data || 'Unknown error'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Add Question to Test</h2>

      {message && <p className="text-center text-red-600 mb-4">{message}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium">Select Test</label>
          <select
            name="id"
            value={question.id}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">-- Select --</option>
            {tests.map(test => (
              <option key={test.id} value={test.id}>{test.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Question Text</label>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Option A</label>
            <input name="optionA" value={question.optionA} onChange={handleChange} className="w-full border px-2 py-1 rounded" required />
          </div>
          <div>
            <label className="block mb-1">Option B</label>
            <input name="optionB" value={question.optionB} onChange={handleChange} className="w-full border px-2 py-1 rounded" required />
          </div>
          <div>
            <label className="block mb-1">Option C</label>
            <input name="optionC" value={question.optionC} onChange={handleChange} className="w-full border px-2 py-1 rounded" required />
          </div>
          <div>
            <label className="block mb-1">Option D</label>
            <input name="optionD" value={question.optionD} onChange={handleChange} className="w-full border px-2 py-1 rounded" required />
          </div>
        </div>

        <div>
          <label className="block mb-1">Correct Option</label>
          <select
            name="correctOption"
            value={question.correctOption}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">-- Select --</option>
            <option value="optionA">Option A</option>
            <option value="optionB">Option B</option>
            <option value="optionC">Option C</option>
            <option value="optionD">Option D</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestionPage;
