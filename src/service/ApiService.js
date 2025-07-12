import axios from 'axios';

const AUTH_BASE_URL = 'http://localhost:8080/api/auth';
const TEST_BASE_URL = 'http://localhost:8080/api/test';

const ApiService = {
  // Auth
  signupUser: (userData) => axios.post(`${AUTH_BASE_URL}/sign-up`, userData),
  loginUser: (userData) => axios.post(`${AUTH_BASE_URL}/login`, userData),

  // Test operations
  createTest: (testData) => axios.post(`${TEST_BASE_URL}`, testData),
  addQuestion: (questionData) => axios.post(`${TEST_BASE_URL}/question`, questionData),
  getAllTests: () => axios.get(`${TEST_BASE_URL}`),

  deleteTestById: (id) => axios.delete(`http://localhost:8080/api/test/${id}`),

};

export default ApiService;
