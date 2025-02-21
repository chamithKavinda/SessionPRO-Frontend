import React, { useState } from 'react';

interface UserFormPopupProps {
  showPopup: boolean;
  formTitle: string;
  userData: { 
    username: string;
    email: string;
    password: string;
    role: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const UserFormPopup: React.FC<UserFormPopupProps> = ({ showPopup, formTitle, userData, handleInputChange, handleSubmit, onClose }) => {
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const validateField = (name: string, value: string) => {
    const usernamePattern = /^[A-Za-z0-9_]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

    switch (name) {
      case 'username':
        return value.trim() === ''
          ? 'Username is required'
          : !usernamePattern.test(value)
          ? 'Username should contain only letters, numbers, and underscores'
          : '';
      case 'email':
        return value.trim() === ''
          ? 'Email is required'
          : !emailPattern.test(value)
          ? 'Invalid email format'
          : '';
      case 'password':
        return value.trim() === ''
          ? 'Password is required'
          : !passwordPattern.test(value)
          ? 'Password must be at least 8 characters long and contain both letters and numbers'
          : '';
      default:
        return '';
    }
  };

  const handleInputChangeWithValidation = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleInputChange(e);
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      username: validateField('username', userData.username),
      email: validateField('email', userData.email),
      password: validateField('password', userData.password),
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      handleSubmit(e);
    }
  };

  return (
    showPopup && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-3xl">
          <button
            type="button"
            className="absolute top-3 right-4 text-gray-700 hover:text-red-600 focus:outline-none"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-2xl mb-6 text-center font-bold">{formTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={userData.username} 
                  onChange={handleInputChangeWithValidation} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  required 
                />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                  )}
              </div>
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
                  <select 
                    id="role" 
                    name="role" 
                    value={userData.role} 
                    onChange={handleInputChange} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8" 
                    required
                  >
                    <option>Select Role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <span className="absolute right-2 top-12 transform -translate-y-1/2 text-gray-500">▼</span>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={userData.email} 
                    onChange={handleInputChangeWithValidation} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    required 
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={userData.password} 
                    onChange={handleInputChangeWithValidation} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    required 
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button 
                  type="submit" 
                  className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    );
};

export default UserFormPopup;
