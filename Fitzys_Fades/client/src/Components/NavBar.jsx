//import { useState } from 'react'
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <div className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-white text-lg">Fitzys Fades</Link>
        <div>
          {!Auth.loggedIn() ? (
            <>
              <button onClick={() => setShowSignUpModal(true)} className="text-gray-300 hover:text-white mx-2">Sign Up</button>
              <button onClick={() => setShowSignInModal(true)} className="text-gray-300 hover:text-white mx-2">Sign In</button>
            </>
          ) : (
            <button onClick={Auth.logout} className="text-gray-300 hover:text-white mx-2">Logout</button>
          )}
        </div>
      </div>

      {showSignUpModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setShowSignUpModal(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <SignUpForm />
          </div>
        </div>
      )}

      {showSignInModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setShowSignInModal(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <SigninForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppNavbar;
