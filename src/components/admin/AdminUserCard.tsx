import React from 'react';

interface UserCardProps {
  user: {
    email: string;
    username: string;
    password: string;
    role: string;
  };
  handleOptionsClick: (email: string) => void;
  handleUpdateUser: (email: string) => void;
  handleDeleteUser: (email: string) => void;
  selectedUserEmail: string | null;
}

const UserCard: React.FC<UserCardProps> = ({ user, handleOptionsClick, handleUpdateUser, handleDeleteUser, selectedUserEmail }) => {
  // const shortEncodedPassword = user.password ? btoa(user.password).substr(0, 20) + '...' : 'No password available';

  return (
    <article
      key={user.email}
      className="w-[250px] h-[180px] mx-auto hover:animate-background rounded-xl shadow-2xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] transition-transform duration-300 transform hover:translate-y-[-10px]"
    >
      <div className="relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => handleOptionsClick(user.email)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          </svg>
        </button>

        {selectedUserEmail === user.email && (
          <div className="absolute top-0 right-0 mt-8 w-32 bg-gray-100 shadow-lg rounded-lg p-2">
            <button onClick={() => handleUpdateUser(user.email)} className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2">Update</button>
            <button onClick={() => handleDeleteUser(user.email)} className="block w-full text-left text-gray-700 hover:bg-red-300 p-2">Delete</button>
          </div>
        )}
      </div>

      <div className="rounded-[10px] bg-white p-4 h-full !pt-14 sm:p-6">
        <h3 className="mt-0 text-lg font-medium text-gray-900">{user.username}</h3>
        <p className="mt-1 text-sm text-gray-700">Role: {user.role}</p>
        <p className="mt-2 text-sm">Email: {user.email}</p>
        {/* <p className="mt-1 text-sm text-gray-700">
          Password (Encoded): {shortEncodedPassword}
        </p> */}
      </div>
    </article>
  );
};

export default UserCard;
