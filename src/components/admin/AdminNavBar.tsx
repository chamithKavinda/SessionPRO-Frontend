import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store/store'; 
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import UserProfilePopup from '../../components/UserProfileProps';

export default function NavBar() {
  const navigate = useNavigate();
  const registeredSessions = useSelector((state: RootState) => state.mySession.registeredSessions); 
  const sessionCount = registeredSessions.length; 
  const [showMenu, setShowMenu] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/"); 
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Handler for opening profile popup
  const handleOpenProfile = () => {
    setShowMenu(false); 
    setShowProfilePopup(true);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <img src="src/assets/SessionPro Icon.png" alt="Logo" className="h-16 w-20 mt-1" />
            <h1 className="text-2xl font-bold">SessionPRO</h1>
          </div>
          <ul className="flex space-x-14 ml-56">
            <li>
              <NavLink to="/admindashboard" className={({ isActive }) => isActive ? "text-black font-bold" : "hover:text-black"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/adminsessions" className={({ isActive }) => isActive ? "text-black font-bold" : "hover:text-black"}>
                Sessions
              </NavLink>
            </li>
            <li>
              <NavLink to="/adminspeakers" className={({ isActive }) => isActive ? "text-black font-bold" : "hover:text-black"}>
                Speakers
              </NavLink>
            </li>
            <li>
              <NavLink to="/adminusers" className={({ isActive }) => isActive ? "text-black font-bold" : "hover:text-black"}>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/adminmy-sessions" className={({ isActive }) => isActive ? "text-black font-bold" : "hover:text-black"}>
                My Sessions {sessionCount > 0 && `(${sessionCount})`} 
              </NavLink>
            </li>
          </ul>
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="w-6 h-6 mr-20 text-black mr-8 cursor-pointer"
              onClick={toggleMenu}
              style={{ marginLeft: 'auto' }}
            />
            {showMenu && (
              <div className="absolute right-0 w-48 mr-4 bg-white rounded-lg shadow-lg py-2 mt-1">
                <button
                  onClick={handleOpenProfile}
                  className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-black hover:bg-red-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="h-20"></div>
      
      <UserProfilePopup 
        isOpen={showProfilePopup} 
        onClose={() => setShowProfilePopup(false)} 
      />
    </div>
  );
}