import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_ADMIN_USER } from '../src/utils/mutations';
import { useAuth } from '../src/utils/authContext';

const SignupForm = () => {
    const { login } = useAuth();
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', phone: '', role: 'admin', adminKey: '' });
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const [createAdminUser, { loading, error }] = useMutation(CREATE_ADMIN_USER, {
        onCompleted: (data) => {
            const { token } = data.createAdminUser;
            if (token) {
                login(token);
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

        createAdminUser({
            variables: {
                userInput: {
                    user_name: userFormData.username,
                    email: userFormData.email,
                    password: userFormData.password,
                    phone: userFormData.phone
                },
                adminKey: userFormData.adminKey // admin key value
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
            {error && <p>An error occurred: {error.message}</p>}
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
                <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="password"
                    placeholder="Admin Key"
                    name="adminKey"
                    onChange={handleInputChange}
                    value={userFormData.adminKey}
                    required
                />
                <button
                    className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    type="submit"
                    disabled={!(userFormData.username && userFormData.email && userFormData.password && userFormData.adminKey)}
                >
                    Sign Up
                </button>
            </form>
            <Link to="/signin" className="text-blue-500 hover:underline">Already have an account?</Link>
        </div>
    );
};

export default SignupForm;
