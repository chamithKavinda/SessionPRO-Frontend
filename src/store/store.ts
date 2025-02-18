import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/auth-reducer";
import sessionReducer from "../reducer/session-reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
  },
});

export default store;