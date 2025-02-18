import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SessionFormPopup from '../components/SessionFormPopup';
import SessionCard from '../components/SessionCard';
import Session from '../models/session';
import { toast } from "react-toastify";

const SessionsPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionCount, setSessionCount] = useState(1);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const [sessionData, setSessionData] = useState({
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let sessionId = sessionData.date;

    if (!editingSessionId) {
      sessionId = sessionCount.toString().padStart(2, '0');
      setSessionCount(sessionCount + 1);
    }

    if (editingSessionId) {
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.sessionID === editingSessionId
            ? { ...session, ...sessionData }
            : session
        )
      );
      setEditingSessionId(null);
      toast.success("Session updated successfully!"); 
    } else {
      const newSession = new Session(
        sessionId,
        sessionData.name,
        sessionData.description,
        sessionData.date,
        sessionData.time,
        sessionData.location,
        sessionData.duration,
        sessionData.speakerName
      );
      setSessions((prevSessions) => [...prevSessions, newSession]);

      toast.success("Session added successfully!");
    }

    setSessionData({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      duration: '',
      speakerName: ''
    });

    setShowPopup(false); 
  };

  const handleOptionsClick = (sessionId: string) => {
    setSelectedSessionId(prev => (prev === sessionId ? null : sessionId)); 
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter(session => session.sessionID !== sessionId));
    toast.success("Session deleted successfully!");
  };

  const handleUpdateSession = (sessionId: string) => {
    const session = sessions.find(s => s.sessionID === sessionId);
    if (session) {
      setSessionData({
        name: session.name,
        description: session.description,
        date: session.date,
        time: session.time,
        location: session.location,
        duration: session.duration,
        speakerName: session.speakerName
      });
      setEditingSessionId(sessionId); 
      setShowPopup(true);
      toast.info(`Editing session: ${session.name}`);
    }
  };

  return (
    <div>
      <NavBar />
      <button
        className="relative rounded-full bg-black ml-8 mt-8 px-4 py-2 font-mono font-bold text-white transition-colors duration-700 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-black hover:bg-black hover:before:bg-black"
        onClick={() => setShowPopup(true)}
      >
        Add Session
      </button>

      <SessionFormPopup
        showPopup={showPopup}
        sessionData={sessionData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        onClose={() => setShowPopup(false)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {sessions.map((session) => (
          <SessionCard
            key={session.sessionID}
            session={session}
            handleOptionsClick={handleOptionsClick}
            handleUpdateSession={handleUpdateSession}
            handleDeleteSession={handleDeleteSession}
            selectedSessionId={selectedSessionId}
          />
        ))}
      </div>
    </div>
  );
};

export default SessionsPage;
