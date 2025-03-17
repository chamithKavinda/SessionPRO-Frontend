import React, { useState, useEffect } from 'react';
import NavBar from '../../components/admin/AdminNavBar';
import SessionFormPopup from '../../components/admin/AdminSessionFormPopup';
import SessionCard from '../../components/admin/AdminSessionCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { deleteSession, getSessions, saveSession, updateSession } from '../../reducer/admin/admin-session-reducer';
import { toast } from "react-toastify";
import Session from '../../models/session';

const SessionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sessions = useSelector((state: RootState) => state.session);

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const [sessionData, setSessionData] = useState<Session>({
    sessionID: '',
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    duration: '',
    speakerName: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Combine date and time
    const dateTime = new Date(`${sessionData.date}T00:00:00.000Z`).toISOString();
    const timeOnly = new Date(`1970-01-01T${sessionData.time}:00.000Z`).toISOString();

    if (editingSessionId) {
      dispatch(updateSession({
        ...sessionData,
        date: dateTime,
        time: timeOnly,
        sessionID: editingSessionId
      }));
      toast.success("Session updated successfully!");
    } else {
      dispatch(saveSession({
        ...sessionData,
        date: dateTime,
        time: timeOnly
      }));
      toast.success("Session added successfully!");
    }

    setSessionData(new Session('', '', '', '', '', '', '', ''));

    setShowPopup(false);
  };

  const handleOptionsClick = (sessionId: string) => {
    setSelectedSessionId(prev => (prev === sessionId ? null : sessionId));
  };

  const handleDeleteSession = (sessionId: string) => {
    dispatch(deleteSession(sessionId));
    toast.success("Session deleted successfully!");
  };

  const handleUpdateSession = (sessionId: string) => {
    const session = sessions.find((s: Session) => s.sessionID === sessionId);
    if (session) {
      setSessionData({
        ...session,
        date: session.date.split('T')[0],
        time: session.time.split('T')[1].substring(0, 5) 
      });
      setEditingSessionId(sessionId);
      setShowPopup(true);
      toast.info(`Editing session: ${session.name}`);
    }
  };

  const handleRemoveClick = (sessionId: string) => {
    // Implement the logic to remove the session here
    console.log(`Remove session: ${sessionId}`);
  };

  return (
    <div>
      <NavBar />
      <button
        className="relative rounded-full bg-gray-700 ml-8 mt-8 px-4 py-2 font-mono font-bold text-white transition-colors duration-700 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-black hover:bg-black hover:before:bg-black"
        onClick={() => {
          setEditingSessionId(null);
          setShowPopup(true);
        }}
      >
        Add Session
      </button>

      <SessionFormPopup
        showPopup={showPopup}
        formTitle={editingSessionId ? "Update Session" : "Add New Session"}
        sessionData={sessionData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        onClose={() => setShowPopup(false)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {sessions.map((session: Session) => (
          <SessionCard
            key={session.sessionID}
            session={session}
            isRegistered={false} // Provide a value for isRegistered
            handleOptionsClick={handleOptionsClick}
            handleUpdateSession={handleUpdateSession}
            handleDeleteSession={handleDeleteSession}
            selectedSessionId={selectedSessionId}
            handleRemoveClick={handleRemoveClick} // Provide the handleRemoveClick function
          />
        ))}
      </div>
    </div>
  );
};

export default SessionsPage;
