import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-green-600" onClick={closeMenu}>
            <span>♻️</span>
            <span>WasteMap</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/request-pickup" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  Request Pickup
                </Link>
                <Link to="/history" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  History
                </Link>
                {currentUser.role === 'collector' || currentUser.role === 'admin' ? (
                  <Link to="/collector" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                    Collector
                  </Link>
                ) : null}
                {currentUser.role === 'admin' ? (
                  <Link to="/admin" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                    Admin
                  </Link>
                ) : null}
                <span className="text-gray-600 text-sm">Welcome, {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {currentUser ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium" onClick={closeMenu}>
                    Dashboard
                  </Link>
                  <Link to="/request-pickup" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium" onClick={closeMenu}>
                    Request Pickup
                  </Link>
                  <Link to="/history" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium" onClick={closeMenu}>
                    History
                  </Link>
                  {currentUser.role === 'collector' || currentUser.role === 'admin' ? (
                    <Link to="/collector" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium" onClick={closeMenu}>
                      Collector
                    </Link>
                  ) : null}
                  {currentUser.role === 'admin' ? (
                    <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium" onClick={closeMenu}>
                      Admin
                    </Link>
                  ) : null}
                  <div className="px-3 py-2 text-gray-600 text-sm">
                    Welcome, {currentUser.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium" onClick={closeMenu}>
                    Login
                  </Link>
                  <Link to="/register" className="block px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200" onClick={closeMenu}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
