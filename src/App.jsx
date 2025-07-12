import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import LoginPage from './component/auth/LoginPage';
import SignupPage from './component/auth/SignupPage';

import AdminDashboard from './component/pages/AdminDashboard';
import CreateTest from './component/pages/CreateTest';
import AddQuestionPage from './component/pages/AddQuestionPage';
import ViewTestsPage from './component/pages/ViewTestsPage';
import UserHomePage from './component/pages/UserHomePage';
import StartTestPage from './component/pages/StartTestPage';
import AdminResultsPage from './component/pages/AdminResultsPage';
import MyAttemptsPage from './component/pages/MyAttemptsPage';
import EditTestPage from './component/pages/EditTestPage';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-test" element={<CreateTest />} />
        <Route path="/admin/add-question/:testId" element={<AddQuestionPage />} />
        <Route path="/view-test/:testId" element={<ViewTestsPage />} />
        <Route path="/user/home" element={<UserHomePage />} />
        <Route path="/start-test/:testId" element={<StartTestPage />} />
        <Route path="/admin/view-results" element={<AdminResultsPage />} />
  <Route path="/admin/view-results/:testId" element={<AdminResultsPage />} />
        <Route path="/user/my-attempts" element={<MyAttemptsPage />} />
        <Route path="/admin/edit-test/:testId" element={<EditTestPage />} />





        {/* <Route path="/admin/view-results" element={<ViewResults />} /> */}



      </Routes>
    </Router>
  )
}

export default App
