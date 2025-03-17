import React from 'react';
import NavBar from '../../components/admin/AdminNavBar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import SessionCard from '../../components/admin/AdminSessionCard';
import Session from '../../models/session';
import { removeSession } from '../../reducer/admin/admin-mySession-reducer';

const MySessionPage: React.FC = () => {
  const dispatch = useDispatch();
  const registeredSessions = useSelector((state: RootState) => state.mySession.registeredSessions);

  const handleRemoveClick = (sessionID: string) => {
    dispatch(removeSession(sessionID));
  };

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {registeredSessions.length > 0 ? (
          registeredSessions.map((session: Session) => (
            <SessionCard
              key={session.sessionID}
              session={session}
              isRegistered={true}
              handleOptionsClick={() => {}}
              handleUpdateSession={() => {}}
              handleDeleteSession={() => {}}
              selectedSessionId={null}
              handleRemoveClick={() => handleRemoveClick(session.sessionID)}
            />
          ))
        ) : (
          <p className="text-center w-full">No Add to My sessions yet.</p>
        )}
      </div>
    </div>
  );
};

export default MySessionPage;
