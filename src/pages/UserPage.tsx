import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import User from '../models/user';
import { toast } from 'react-toastify';

const UsersPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userCount, setUserCount] = useState(1);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userId = userData.username.toLowerCase().replace(/ /g, '-');
  
    if (!editingUserId) {
      userId = userCount.toString().padStart(2, '0');
      setUserCount(userCount + 1);
    }
  
    if (editingUserId) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId
            ? { ...user, ...userData }
            : user
        )
      );
      setEditingUserId(null);
      toast.success("User updated successfully!"); // ✅ Success alert for update
    } else {
      const newUser = new User(
        userId,
        userData.username,
        userData.email,
        userData.password,
        userData.role
      );
      setUsers((prevUsers) => [...prevUsers, newUser]);
      toast.success("User added successfully!"); // ✅ Success alert for new user
    }
  
    // Reset userData
    setUserData({
      username: '',
      email: '',
      password: '',
      role: ''
    });
  
    setShowPopup(false); // Close the popup after submission
  };

  const handleOptionsClick = (userId: string) => {
    setSelectedUserId(prev => (prev === userId ? null : userId)); // Toggle visibility
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    setSelectedUserId(null);
  
    toast.success("User deleted successfully!"); // ✅ Success alert for user deletion
  };

  const handleUpdateUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUserData({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role
      });
      setEditingUserId(userId); // Track the user being edited
      setShowPopup(true);
  
      toast.info(`Editing user: ${user.username}`); // Toast for editing user
    }
  };

  return (
    <div>
      <NavBar />
      <button
        className="relative rounded-full bg-black ml-8 mt-8 px-4 py-2 font-mono font-bold text-white transition-colors duration-700 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-black hover:bg-black hover:before:bg-black"
        onClick={() => setShowPopup(true)}
      >
        Add User
      </button>

      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button
              type="button"
              className="absolute top-3 right-4 text-gray-700 hover:text-red-600 focus:outline-none"
              onClick={() => setShowPopup(false)}
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

              {/* Grid Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                {/* Role Dropdown */}
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={userData.role}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
                    required
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                  <span className="absolute right-2 top-12 transform -translate-y-1/2 text-gray-500">
                    ▼
                  </span>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>

              {/* Save Button */}
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
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {users.map((user) => (
          <article key={user.id} className="w-[250px] h-[250px] mx-auto hover:animate-background rounded-xl shadow-2xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => handleOptionsClick(user.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                </svg>
              </button>
          
              {selectedUserId === user.id && (
                <div className="absolute top-0 right-0 mt-8 w-32 bg-gray-100 shadow-lg rounded-lg p-2">
                  <button onClick={() => handleUpdateUser(user.id)} className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2">Update</button>
                  <button onClick={() => handleDeleteUser(user.id)} className="block w-full text-left text-gray-700 hover:bg-red-300 p-2">Delete</button>
                </div>
              )}
            </div>
          
            <div className="rounded-[10px] bg-white p-4 h-full !pt-14 sm:p-6">
              <h3 className="mt-0.5 text-lg font-medium text-gray-900">{user.username}</h3>
              <p className="mt-2 text-sm">Email: {user.email}</p>
              <p className="mt-1 text-sm text-gray-700">
                Password (Encoded)~: {user.password ? btoa(user.password) : 'No password available'}
              </p>
              <p className="mt-1 text-sm text-gray-700">Role: {user.role}</p>
              <p className="mt-1 text-sm text-gray-700">User ID: {user.id}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
