import React, { useEffect } from 'react';
import UserNavBar from '../../components/user/UserNavBar';
import UserSessionCard from '../../components/user/UserSessionCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getSessions } from '../../reducer/admin/admin-session-reducer';
import Session from '../../models/session';

const SessionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sessions = useSelector((state: RootState) => state.session);

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  return (
    <div>
      <UserNavBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 gap-x-2 px-4 mt-8">
        {sessions.map((session: Session) => (
          <UserSessionCard
            key={session.sessionID}
            session={session}
            isRegistered={false} 
          />
        ))}
      </div>
    </div>
  );
};

export default SessionsPage;
