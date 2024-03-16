import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../utils/API';
import Auth from '../utils/auth';

// signup form component
const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate(); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

// handles form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createUser(userFormData);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const { token } = await response.json();
      Auth.login(token);
      navigate('/'); 
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };
// returns the signup form
  return (
    <div className="mt-10 px-4 py-6">
      {showAlert && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          Sign-up Err0r!
        </div>
      )}
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        <button
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          type="submit"
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
// exports the signup form for use in nav bar
export default SignupForm;
