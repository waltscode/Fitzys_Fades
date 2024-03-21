import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../src/utils/mutations';
import Auth from './utils/auth';
import PropTypes from 'prop-types';
import { useAuth } from '../src/utils/authContext';


const SignupForm = ({ onClose }) => {
    const { login } = useAuth();
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', phone: '' });
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const [createUser, { loading, error }] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            const { token } = data.createUser;
            if (token) {
                login(token);
                if (onClose) onClose();
                navigate('/');
            } else {
                throw new Error('Failed to create user');
            }
        },
        onError: (error) => {
            console.error('Signup error:', error);
            setShowAlert(true);
        }
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        createUser({
            variables: {
                userInput: {
                    user_name: userFormData.username,
                    email: userFormData.email,
                    password: userFormData.password,
                    phone: userFormData.phone
                }
            },
        });
    };

    return (
        <div className="relative bg-white p-6 rounded-lg">
            {showAlert && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                    Sign-up Error!
                </div>
            )}
            {loading && <p>Loading...</p>}
            {error && <p>An err0r occurred: {error.message}</p>}
            <button onClick={onClose} className="absolute top-0 right-0 p-4">X</button>
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
                <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                    onChange={handleInputChange}
                    value={userFormData.phone}
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

SignupForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default SignupForm;
