import React from 'react';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { registerSession } from '../reducer/mySession-reducer';

interface SessionCardProps {
  session: {
    sessionID: string;
    name: string;
    description: string;
    date: string;
    time: string;
    location: string;
    duration: string;
    speakerName: string;
  };
  handleOptionsClick: (sessionId: string) => void;
  handleUpdateSession: (sessionId: string) => void;
  handleDeleteSession: (sessionId: string) => void;
  selectedSessionId: string | null;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, handleOptionsClick, handleUpdateSession, handleDeleteSession, selectedSessionId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const formattedDate = new Date(session.date).toLocaleDateString();
  const formattedTime = new Date(session.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleRegister = () => {
    dispatch(registerSession(session));
    toast.success("Registration successful!", { position: "bottom-right", autoClose: 3000 });
  };

  return (
    <article
      key={session.sessionID}
      className="w-[250px] h-[295px] mx-auto hover:animate-background rounded-xl shadow-2xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
    >
      <div className="relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => handleOptionsClick(session.sessionID)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          </svg>
        </button>

        {selectedSessionId === session.sessionID && (
          <div className="absolute top-0 right-0 mt-8 w-32 bg-gray-100 shadow-lg rounded-lg p-2">
            <button onClick={() => handleUpdateSession(session.sessionID)} className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2">Update</button>
            <button onClick={() => handleDeleteSession(session.sessionID)} className="block w-full text-left text-gray-700 hover:bg-red-300 p-2">Delete</button>
          </div>
        )}
      </div>

      <div className="rounded-[10px] bg-white p-4 h-full !pt-20 sm:p-6">
        <time className="block text-xs -mt-12 text-gray-500">{formattedDate}</time>
        <p className="block text-xs mt-1 text-gray-500">{formattedTime}</p>
        <h3 className="mt-2 text-lg font-medium text-gray-900">{session.name}</h3>
        <p className="mt-1 text-sm ">{session.description}</p>
        <p className="text-sm mt-1 text-gray-700">Location: {session.location}</p>
        <p className="text-sm mt-1 text-gray-700">Speaker: {session.speakerName}</p>
        <p className="text-sm mt-1 text-gray-700">Session ID: {session.sessionID}</p>

        <button
          className="mt-4 w-full bg-gray-800 text-white h-9 rounded-xl hover:bg-gray-700 transition"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </article>
  );
};

export default SessionCard;
