import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../src/utils/mutations'; 
// import Auth from './utils/auth';
import PropTypes from 'prop-types';
import { useAuth } from '../src/utils/authContext';

const LoginForm = ({ onClose }) => {
   const { login } = useAuth();
   const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
  onCompleted: (data) => {
    const { token } = data.login;
    if (token) {
      login(token);
      if (typeof onClose === 'function') onClose();
      navigate('/'); 
    } else {
      throw new Error('Login failed, no token returned');
    }
  },
  onError: (error) => {
    console.error('Login error:', error);
    setShowAlert(true);
  }
});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    loginUser({
      variables: {
        email: userFormData.email,
        password: userFormData.password
      }
    });
  };

  return (
    <div className="relative bg-white p-6 rounded-lg">
      {showAlert && (
        <div className="mb-4 text-sm text-red-700 bg-red-100 p-4 rounded-lg" role="alert">
          Incorrect login information!
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>An err0r occurred: {error.message}</p>}
      <button onClick={onClose} className="absolute top-0 right-0 p-4">X</button>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          disabled={!(userFormData.email && userFormData.password)}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

// LoginForm.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };

export default LoginForm;
