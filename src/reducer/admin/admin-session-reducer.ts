import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Session from "../../models/session";

export const initialState: Session[] = [];

type NewSession = Omit<Session, 'sessionID'>;

const api = axios.create({
  baseURL: "http://localhost:3001/session",
});

export const saveSession = createAsyncThunk("session/saveSession", async (session: NewSession) => {
  try {
      console.log("Saving session:", session);
      const response = await api.post("/", session);
      console.log("Save response:", response.data);
      return response.data;
  } catch (error) {
      console.log("Error saving session:", error);
  }
});

export const getSessions = createAsyncThunk("session/getSessions", async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.log("Error fetching sessions:", error);
  }
});

export const deleteSession = createAsyncThunk("session/deleteSession", async (id: string) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting session:", error);
  }
});

export const updateSession = createAsyncThunk("session/updateSession", async (session: Session) => {
  try {
    const response = await api.put(`/${session.sessionID}`, session);
    return response.data;
  } catch (error) {
    console.log("Error updating session:", error);
  }
});

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveSession.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(saveSession.rejected, (state, action) => {
        console.error("Failed to save session:", action.payload);
      })
      .addCase(saveSession.pending, (state, action) => {
        console.log("Save session pending", action.payload);
      });

    builder
      .addCase(getSessions.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getSessions.pending, (state, action) => {
        console.log("Get sessions pending", action.payload);
      })
      .addCase(getSessions.rejected, (state, action) => {
        console.error("Failed to fetch sessions:", action.payload);
      });

    builder
      .addCase(deleteSession.rejected, (state, action) => {
        console.error("Failed to delete session:", action.payload);
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        return state.filter((session: Session) => session.sessionID !== action.payload.sessionID);
      })
      .addCase(deleteSession.pending, (state, action) => {
        console.log("Pending delete session", action.payload);
      });

    builder
      .addCase(updateSession.rejected, (state, action) => {
        console.error("Failed to update session:", action.payload);
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        const session = state.find((session: Session) => session.sessionID === action.payload.sessionID);
        if (session) {
          session.name = action.payload.name;
          session.description = action.payload.description;
          session.date = action.payload.date;
          session.time = action.payload.time;
          session.location = action.payload.location;
          session.duration = action.payload.duration;
          session.speakerName = action.payload.speakerName;
        }
      })
      .addCase(updateSession.pending, (state, action) => {
        console.log("Pending update session:", action.payload);
      });
  },
});

export default sessionSlice.reducer;
