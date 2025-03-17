import React from 'react';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { registerSession } from '../../reducer/user/user-mySession-reducer';
import Session from '../../models/session';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa'; 

interface SessionCardProps {
  session: Session;
  isRegistered: boolean;
}

const UserSessionCard: React.FC<SessionCardProps> = ({ session, isRegistered }) => {
  const dispatch = useDispatch<AppDispatch>();

  const formattedDate = new Date(session.date).toLocaleDateString();
  const formattedTime = new Date(session.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleRegister = () => {
    dispatch(registerSession(session));
    toast.success("Session Add to My Sessions!", { position: "bottom-right", autoClose: 3000 });
  };

  const handleRemove = () => {
    // Handle session removal if needed
    toast.success("Session removed successfully!", { position: "bottom-right", autoClose: 3000 });
  };

  return (
    <article
      key={session.sessionID}
      className="w-[250px] h-[350px] mx-auto transition-transform duration-300 transform hover:translate-y-[-10px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-xl shadow-2xl hover:bg-[length:400%_400%] hover:[animation-duration:_4s]"
    >
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

export default UserSessionCard;
