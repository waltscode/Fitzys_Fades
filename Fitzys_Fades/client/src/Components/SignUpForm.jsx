import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const SignupForm = ({ onClose }) => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate(); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createUser(userFormData);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const { token } = await response.json();
      Auth.login(token);
      if (onClose) onClose(); // should close the modal 
      navigate('/'); // redirection, might need to be modified
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-lg">
      {showAlert && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          Sign-up Error!
        </div>
      )}
      <button onClick={onClose} className="absolute top-0 right-0 p-4">X</button>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        
      </form>
    </div>
  );
};

export default SignupForm;
