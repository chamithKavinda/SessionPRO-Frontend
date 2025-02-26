import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Speaker from "../../models/speaker";

export const initialState: Speaker[] = [];

type NewSpeaker = Omit<Speaker, 'speakerEmail'>;

const api = axios.create({
  baseURL: "http://localhost:3001/speaker",
});

export const saveSpeaker = createAsyncThunk("speaker/saveSpeaker", async (speaker: NewSpeaker) => {
  try {
    console.log("Saving speaker:", speaker);
    const response = await api.post("/", speaker);
    console.log("Save response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error saving speaker:", error);
  }
});

export const getSpeakers = createAsyncThunk("speaker/getSpeakers", async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.log("Error fetching speakers:", error);
  }
});

export const deleteSpeaker = createAsyncThunk("speaker/deleteSpeaker", async (email: string) => {
  try {
    const response = await api.delete(`/${email}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting speaker:", error);
  }
});

export const updateSpeaker = createAsyncThunk("speaker/updateSpeaker", async (speaker: Speaker) => {
  try {
    const response = await api.put(`/${speaker.speakerEmail}`, speaker);
    return response.data;
  } catch (error) {
    console.log("Error updating speaker:", error);
  }
});

const speakerSlice = createSlice({
  name: "speaker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveSpeaker.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(saveSpeaker.rejected, (state, action) => {
        console.error("Failed to save speaker:", action.payload);
      })
      .addCase(saveSpeaker.pending, (state, action) => {
        console.log("Save speaker pending", action.payload);
      });

    builder
      .addCase(getSpeakers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getSpeakers.pending, (state, action) => {
        console.log("Get speakers pending", action.payload);
      })
      .addCase(getSpeakers.rejected, (state, action) => {
        console.error("Failed to fetch speakers:", action.payload);
      });

    builder
      .addCase(deleteSpeaker.rejected, (state, action) => {
        console.error("Failed to delete speaker:", action.payload);
      })
      .addCase(deleteSpeaker.fulfilled, (state, action) => {
        return state.filter((speaker: Speaker) => speaker.speakerEmail !== action.payload.speakerEmail);
      })
      .addCase(deleteSpeaker.pending, (state, action) => {
        console.log("Pending delete speaker", action.payload);
      });

    builder
      .addCase(updateSpeaker.rejected, (state, action) => {
        console.error("Failed to update speaker:", action.payload);
      })
      .addCase(updateSpeaker.fulfilled, (state, action) => {
        const speaker = state.find((speaker: Speaker) => speaker.speakerEmail === action.payload.speakerEmail);
        if (speaker) {
          speaker.name = action.payload.name;
          speaker.bio = action.payload.bio;
          speaker.expertise = action.payload.expertise;
          speaker.speakerEmail = action.payload.speakerEmail;
          speaker.image = action.payload.image;
        }
      })
      .addCase(updateSpeaker.pending, (state, action) => {
        console.log("Pending update speaker:", action.payload);
      });
  },
});

export default speakerSlice.reducer;
