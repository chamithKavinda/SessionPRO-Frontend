import React from 'react';
import NavBar from '../components/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SessionCard from '../components/SessionCard';
import Session from '../models/session';

const MySessionPage: React.FC = () => {
  const registeredSessions = useSelector((state: RootState) => state.mySession.registeredSessions);

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {registeredSessions.length > 0 ? (
          registeredSessions.map((session: Session) => (
            <SessionCard
              key={session.sessionID}
              session={session}
              handleOptionsClick={() => {}}
              handleUpdateSession={() => {}}
              handleDeleteSession={() => {}}
              selectedSessionId={null}
            />
          ))
        ) : (
          <p className="text-center w-full">No registered sessions yet.</p>
        )}
      </div>
    </div>
  );
};

export default MySessionPage;
