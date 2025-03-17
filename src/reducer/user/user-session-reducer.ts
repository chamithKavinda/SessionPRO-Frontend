import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Session from "../../models/session";

export const initialState: Session[] = [];

const api = axios.create({
  baseURL: "http://localhost:3001/session",
});

export const getSessions = createAsyncThunk("session/getSessions", async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.log("Error fetching sessions:", error);
  }
});

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
        },
});
        
export default sessionSlice.reducer;          