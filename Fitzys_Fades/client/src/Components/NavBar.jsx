//import { useState } from 'react'
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const AppNavbar = () => {
  return (
    <div className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-white text-lg">
          Fitzys Fades
        </Link>
        <div>
          {!Auth.loggedIn() ? (
            <>
              <Link to="/signup" className="text-gray-300 hover:text-white mx-2">Sign Up</Link>
              <Link to="/signin" className="text-gray-300 hover:text-white mx-2">Sign In</Link>
            </>
          ) : (
            <button onClick={Auth.logout} className="text-gray-300 hover:text-white mx-2">Logout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
