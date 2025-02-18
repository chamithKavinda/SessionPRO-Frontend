import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/auth-reducer";
import sessionReducer from "../reducer/session-reducer";
import speakerReducer from "../reducer/speaker-reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
    speaker: speakerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
