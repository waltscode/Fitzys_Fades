// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createUser } from '../utils/API';
// import Auth from '../utils/auth';
// import PropTypes from 'prop-types'; // Add prop-types import

// const SignupForm = ({ onClose }) => {
//     const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
//     const [showAlert, setShowAlert] = useState(false);
//     const navigate = useNavigate(); 

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setUserFormData({ ...userFormData, [name]: value });
//     };

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await createUser(userFormData);
//             if (!response.ok) {
//                 throw new Error('Something went wrong!');
//             }
//             const { token } = await response.json();
//             Auth.login(token);
//             if (onClose) onClose(); // closes the modal on successful signup
//             navigate('/'); // redirects, but might need to be set to something else may break modal..
//         } catch (err) {
//             console.error(err);
//             setShowAlert(true);
//         }
//     };

//     return (
//         <div className="relative bg-white p-6 rounded-lg">
//             {showAlert && (
//                 <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
//                     Sign-up Err0r!
//                 </div>
//             )}
//             <button onClick={onClose} className="absolute top-0 right-0 p-4">X</button>
//             <form onSubmit={handleFormSubmit} className="space-y-6">
//                 <input
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     type="text"
//                     placeholder="Username"
//                     name="username"
//                     onChange={handleInputChange}
//                     value={userFormData.username}
//                     required
//                 />
//                 <input
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     type="email"
//                     placeholder="Email"
//                     name="email"
//                     onChange={handleInputChange}
//                     value={userFormData.email}
//                     required
//                 />
//                 <input
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     onChange={handleInputChange}
//                     value={userFormData.password}
//                     required
//                 />
//                 <button
//                     className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                     type="submit"
//                     disabled={!(userFormData.username && userFormData.email && userFormData.password)}
//                 >
//                     Sign Up
//                 </button>
//             </form>
//         </div>
//     );
// };

// SignupForm.propTypes = {
//     onClose: PropTypes.func.isRequired, // added a prop validation for onClose prop
// };

// export default SignupForm;
