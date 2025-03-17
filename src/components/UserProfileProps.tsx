import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import store from '../store/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reducer/auth-reducer';
import { deleteUser, updateUser } from '../reducer/admin/admin-user-reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  email: string;
  username: string;
  role: string;
}

const UserProfilePopup = ({ isOpen, onClose }: UserProfileProps) => {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    username: '',
    role: ''
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  
  const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { email: string; role: string };
        
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/user/${decodedToken.email}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            setUserData({
              email: decodedToken.email,
              username: response.data.username,
              role: decodedToken.role
            });
          } catch (error) {
            console.error('Error fetching user data:', error);
            setUserData({
              email: decodedToken.email,
              username: '',
              role: decodedToken.role
            });
          }
        };
        
        fetchUserData();
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token, isOpen]);

  const handleEditProfile = () => {
    setIsEditing(true);
    setUpdateSuccess(false);
  };

  const validatePasswords = () => {
    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    
    if (password && password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleUpdateProfile = async () => {
    if (!validatePasswords()) {
      return;
    }

    try {
      const updatedUser = {
        email: userData.email,
        username: userData.username,
        password: password || '',
        role: userData.role
      };

      await dispatch(updateUser(updatedUser));
      setIsEditing(false);
      setPassword('');
      setConfirmPassword('');
      setUpdateSuccess(true);
      
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      await dispatch(deleteUser(userData.email));
      dispatch(logout());
      navigate('/');
      onClose();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const cancelDeleteAccount = () => {
    setIsDeleting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

        {updateSuccess && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            Profile updated successfully!
          </div>
        )}

        {!isDeleting ? (
          <>
            {/* Profile Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">Email:</label>
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">Role:</label>
                <input
                  type="text"
                  value={userData.role}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">Username:</label>
                <input
                  type="text"
                  value={userData.username}
                  onChange={(e) => setUserData({...userData, username: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-blue-300' : 'border-gray-300'} rounded-md ${!isEditing && 'bg-gray-100'}`}
                />
              </div>

              {isEditing && (
                <>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">New Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Leave blank to keep current password"
                      className="w-full px-3 py-2 border border-blue-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Confirm Password:</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-3 py-2 border border-blue-300 rounded-md"
                    />
                    {passwordError && (
                      <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col space-y-3">
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setPassword('');
                      setConfirmPassword('');
                      setPasswordError('');
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditProfile}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Edit Profile
                </button>
              )}
              
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <p className="text-red-600 font-semibold text-lg mb-2">Are you sure you want to delete your account?</p>
              <p className="text-gray-600 mb-4">This action cannot be undone. All your data will be permanently removed.</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={confirmDeleteAccount}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={cancelDeleteAccount}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePopup;