import React from 'react';

interface UserFormPopupProps {
  showPopup: boolean;
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

const UserFormPopup: React.FC<UserFormPopupProps> = ({ showPopup, userData, handleInputChange, handleSubmit, onClose }) => {
  return (
    showPopup && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg relative">
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
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-6 text-center font-bold">Add New User</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={userData.username} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
                <select id="role" name="role" value={userData.role} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8" required>
                  <option value="student">User</option>
                  <option value="admin">Admin</option>
                </select>
                <span className="absolute right-2 top-12 transform -translate-y-1/2 text-gray-500">▼</span>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={userData.password} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default UserFormPopup;
