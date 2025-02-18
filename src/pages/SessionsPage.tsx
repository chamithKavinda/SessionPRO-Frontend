import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SessionFormPopup from '../components/SessionFormPopup';
import SessionCard from '../components/SessionCard';
import Session from '../models/session';
import { toast } from "react-toastify";

const SessionsPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
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

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/session');
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast.error("Failed to fetch sessions");
    }
  };

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
      try {
        const response = await axios.put(`http://localhost:3000/session/${editingSessionId}`, {
          ...sessionData,
          date: dateTime,
          time: timeOnly // Send the time in ISO-8601 format
        });
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.sessionID === editingSessionId ? response.data : session
          )
        );
        setEditingSessionId(null);
        toast.success("Session updated successfully!");
      } catch (error) {
        console.error("Error updating session:", error);
        toast.error("Failed to update session");
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/session', {
          ...sessionData,
          date: dateTime,
          time: timeOnly // Send the time in ISO-8601 format
        });
        setSessions((prevSessions) => [...prevSessions, response.data]);
        toast.success("Session added successfully!");
      } catch (error) {
        console.error("Error adding session:", error);
        toast.error("Failed to add session");
      }
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

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await axios.delete(`http://localhost:3000/session/${sessionId}`);
      setSessions(sessions.filter(session => session.sessionID !== sessionId));
      toast.success("Session deleted successfully!");
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session");
    }
  };

  const handleUpdateSession = (sessionId: string) => {
    const session = sessions.find(s => s.sessionID === sessionId);
    if (session) {
      setSessionData({
        name: session.name,
        description: session.description,
        date: session.date.split('T')[0], // Extract date part
        time: session.time.split('T')[1].substring(0, 5), // Extract time part
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
