import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/auth-reducer";
import adminsessionReducer from "../reducer/admin/admin-session-reducer";
import adminspeakerReducer from "../reducer/admin/admin-speaker-reducer";
import adminuserReducer from "../reducer/admin/admin-user-reducer";
import adminmySessionReducer from "../reducer/admin/admin-mySession-reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    session: adminsessionReducer,
    speaker: adminspeakerReducer,
    user: adminuserReducer,
    mySession: adminmySessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
