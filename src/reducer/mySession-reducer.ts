import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Session from '../models/session';

interface MySessionState {
  registeredSessions: Session[];
}

const initialState: MySessionState = {
  registeredSessions: JSON.parse(localStorage.getItem('registeredSessions') || '[]')
};

const mySessionSlice = createSlice({
  name: 'mySession',
  initialState,
  reducers: {
    registerSession: (state, action: PayloadAction<Session>) => {
      state.registeredSessions.push(action.payload);
      localStorage.setItem('registeredSessions', JSON.stringify(state.registeredSessions));
    }
  }
});

export const { registerSession } = mySessionSlice.actions;
export default mySessionSlice.reducer;
