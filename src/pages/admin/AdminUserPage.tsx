import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/admin/AdminNavBar';
import UserFormPopup from '../../components/admin/AdminUserFormPopup';
import UserCard from '../../components/admin/AdminUserCard';
import { RootState, AppDispatch } from '../../store/store';
import { saveUser, getUsers, deleteUser, updateUser } from '../../reducer/admin/admin-user-reducer';
import { toast } from 'react-toastify';
import User from '../../models/user';

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [editingUserEmail, setEditingUserEmail] = useState<string | null>(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingUserEmail) {
      const userToUpdate = { ...userData, email: editingUserEmail };
      dispatch(updateUser(userToUpdate));
      toast.success("User updated successfully!");
    } else {
      const newUser = { ...userData, email: userData.email }; 
      dispatch(saveUser(newUser));
      toast.success("User added successfully!");
    }

    setUserData({
      username: '',
      email: '',
      password: '',
      role: ''
    });

    setShowPopup(false);
    setEditingUserEmail(null);
  };

  const handleOptionsClick = (email: string) => {
    setSelectedUserEmail((prev) => (prev === email ? null : email));
  };

  const handleDeleteUser = async (email: string) => {
    try {
      await dispatch(deleteUser(email)).unwrap();
      setSelectedUserEmail(null);
      toast.success("User deleted successfully!");
    } catch {
      toast.error("Failed to delete user.");
    }
  };

  const handleUpdateUser = (email: string) => {
    const user = users.find((u: User) => u.email === email);
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
        className="relative rounded-full bg-gray-700 ml-8 mt-8 px-4 py-2 font-mono font-bold text-white transition-colors duration-700 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-black hover:bg-black hover:before:bg-black"
        onClick={() => {
          setEditingUserEmail(null);
          setShowPopup(true);
        }}
      >
        Add User
      </button>

      <UserFormPopup
        showPopup={showPopup}
        formTitle={editingUserEmail ? "Update User" : "Add New User"}
        userData={userData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        onClose={() => setShowPopup(false)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {users.map((user: User) => (
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
