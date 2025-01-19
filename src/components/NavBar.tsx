import React from 'react'
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <img src="src\\assets\\SessionPro Icon.png" alt="Logo" className="h-16 w-20 mt-1" />
            <h1 className="text-2xl font-bold">SessionPRO</h1>
          </div>
          <ul className="flex space-x-14 ml-56">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold"
                    : "hover:text-black"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sessions"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold"
                    : "hover:text-black"
                }
              >
                Sessions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/speakers"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold"
                    : "hover:text-black"
                }
              >
                Speakers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold"
                    : "hover:text-black"
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-sessions"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold"
                    : "hover:text-black"
                }
              >
                My Sessions
              </NavLink>
            </li>
          </ul>
          <button
            className="group flex items-center justify-start w-8 h-8 mr-8 bg-black rounded-full cursor-pointer relative overflow-hidden transition-all duration-700 shadow-lg hover:bg-gradient-to-r hover:from-teal-400 hover:via-blue-500 hover:to-purple-500 hover:w-32 active:translate-x-1 active:translate-y-1"
            style={{ marginLeft: 'auto' }} 
          >
            <div
              className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                ></path>
              </svg>
            </div>
            <div
              className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-1000 group-hover:translate-x-0 group-hover:opacity-100"
            >
              Logout
            </div>
          </button>
        </div>
      </nav>
    </div>
  )
}
