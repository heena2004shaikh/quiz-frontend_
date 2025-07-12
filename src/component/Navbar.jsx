import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-900 text-white px-4 py-3 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">QUIZ-APP</Link>

      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            {role === 'admin' ? (
              <>
                <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
                <Link to="/admin/create-test" className="hover:underline">Create Test</Link>
                <Link to="/admin/view-results" className="hover:underline">View Results</Link>


              </>
            ) : (
              <>
                <Link to="/user/home" className="hover:underline">Home</Link>
                <Link to="/user/my-attempts" className="hover:underline">My Attempts</Link>
              </>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
