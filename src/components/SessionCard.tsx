import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { registerSession } from '../reducer/mySession-reducer';
import Session from '../models/session';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa'; 

interface SessionCardProps {
  session: Session;
  isRegistered: boolean;
  handleOptionsClick: (sessionId: string) => void;
  handleUpdateSession: (sessionId: string) => void;
  handleDeleteSession: (sessionId: string) => void;
  selectedSessionId: string | null;
  handleRemoveClick: (sessionId: string) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, isRegistered, handleOptionsClick, handleUpdateSession, handleDeleteSession, selectedSessionId, handleRemoveClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showOptions, setShowOptions] = useState(false);

  const formattedDate = new Date(session.date).toLocaleDateString();
  const formattedTime = new Date(session.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleRegister = () => {
    dispatch(registerSession(session));
    toast.success("Session Add to My Sessions!", { position: "bottom-right", autoClose: 3000 });
  };

  const handleRemove = () => {
    handleRemoveClick(session.sessionID);
    toast.success("Session removed successfully!", { position: "bottom-right", autoClose: 3000 });
  };

  const handleOptions = (sessionId: string) => {
    handleOptionsClick(sessionId);
    setShowOptions(!showOptions);
  };

  const handleUpdate = (sessionId: string) => {
    handleUpdateSession(sessionId);
    setShowOptions(false);
  };

  return (
    <article
  key={session.sessionID}
  className="w-[250px] h-[350px] mx-auto transition-transform duration-300 transform hover:translate-y-[-10px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-xl shadow-2xl hover:bg-[length:400%_400%] hover:[animation-duration:_4s]"
>
      <div className="relative">
        {!isRegistered && (
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => handleOptions(session.sessionID)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
            </svg>
          </button>
        )}

        {showOptions && selectedSessionId === session.sessionID && (
          <div className="absolute top-0 right-0 mt-8 w-32 bg-gray-100 shadow-lg rounded-lg p-2">
            <button onClick={() => handleUpdate(session.sessionID)} className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2">Update</button>
            <button onClick={() => handleDeleteSession(session.sessionID)} className="block w-full text-left text-gray-700 hover:bg-red-300 p-2">Delete</button>
          </div>
        )}
      </div>

      <div className="rounded-[10px] bg-white p-4 h-full !pt-20 sm:p-6">
        <time className="block text-xs -mt-12 text-gray-500">{formattedDate}</time>
        <p className="block text-xs mt-1 text-gray-500">{formattedTime}</p>
        <h3 className="mt-3 text-lg font-medium text-gray-900">{session.name}</h3>
        <p className="mt-2 text-sm">{session.description}</p>
        <p className="text-sm mt-3 text-gray-700"><FaUser className="inline-block mr-1"/> {session.speakerName}</p>
        <p className="text-sm mt-2 text-gray-700"><FaMapMarkerAlt className="inline-block mr-1"/> {session.location}</p>
        <p className="text-sm mt-4 text-gray-700">Session ID: {session.sessionID}</p>

        <div className="mt-4 w-full">
          {isRegistered ? (
            <button
              className="w-full bg-red-500 text-white h-9 rounded-xl hover:bg-red-500 transition"
              onClick={handleRemove}
            >
              Remove Session
            </button>
          ) : (
            <button
              className="w-full bg-gray-600 text-white h-9 rounded-xl hover:bg-gray-800 transition"
              onClick={handleRegister}
            >
              Add to MySession
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default SessionCard;
