import { useState } from 'react';
import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = ({ onClose }) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(userFormData);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { token } = await response.json();
      Auth.login(token);
      onClose(); 
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // may need some addtional logic to reset form or handle a redirect

    
  };

  return (
    <div className="relative bg-white p-6 rounded-lg">
      {showAlert && (
        <div className="mb-4 text-sm text-red-700 bg-red-100 p-4 rounded-lg" role="alert">
          Incorrect login information!
        </div>
      )}
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

export default LoginForm;
