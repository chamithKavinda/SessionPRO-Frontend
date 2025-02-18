import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import UserFormPopup from '../components/UserFormPopup';
import UserCard from '../components/UserCard';
import User from '../models/user';
import { toast } from 'react-toastify';

const UsersPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserEmail, setEditingUserEmail] = useState<string | null>(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingUserEmail) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === editingUserEmail ? { ...user, ...userData } : user
        )
      );
      setEditingUserEmail(null);
      toast.success("User updated successfully!");
    } else {
      const newUser = new User(
        userData.username,
        userData.email,
        userData.password,
        userData.role
      );
      setUsers((prevUsers) => [...prevUsers, newUser]);
      toast.success("User added successfully!");
    }

    setUserData({
      username: '',
      email: '',
      password: '',
      role: ''
    });

    setShowPopup(false);
  };

  const handleOptionsClick = (email: string) => {
    setSelectedUserEmail((prev) => (prev === email ? null : email));
  };

  const handleDeleteUser = (email: string) => {
    setUsers(users.filter((user) => user.email !== email));
    setSelectedUserEmail(null);

    toast.success("User deleted successfully!");
  };

  const handleUpdateUser = (email: string) => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setUserData({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role
      });
      setEditingUserEmail(email);
      setShowPopup(true);

      toast.info(`Editing user: ${user.username}`);
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

      <UserFormPopup
        showPopup={showPopup}
        userData={userData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        onClose={() => setShowPopup(false)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {users.map((user) => (
          <UserCard
            key={user.email}
            user={user}
            handleOptionsClick={handleOptionsClick}
            handleUpdateUser={handleUpdateUser}
            handleDeleteUser={handleDeleteUser}
            selectedUserEmail={selectedUserEmail}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
