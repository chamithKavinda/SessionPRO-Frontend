import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User from '../models/user';

export const initialState: User[] = [];

type NewUser = Omit<User, 'email'>;

const api = axios.create({
  baseURL: 'http://localhost:3001/user',
});

export const saveUser = createAsyncThunk('user/saveUser', async (user: NewUser) => {
  try {
    console.log('Saving user:', user);
    const response = await api.post('/', user);
    console.log('Save response:', response.data);
    return response.data;
  } catch (error) {
    console.log('Error saving user:', error);
  }
});

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
  }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (email: string) => {
  try {
    await api.delete(`/${email}`);
    return email; 
  } catch (error) {
    console.log('Error deleting user:', error);
    throw error; 
  }
});


export const updateUser = createAsyncThunk('user/updateUser', async (user: User) => {
  try {
    const response = await api.put(`/${user.email}`, user);
    return response.data;
  } catch (error) {
    console.log('Error updating user:', error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveUser.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(saveUser.rejected, (state, action) => {
        console.error('Failed to save user:', action.payload);
      })
      .addCase(saveUser.pending, (state, action) => {
        console.log('Save user pending', action.payload);
      });

    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getUsers.pending, (state, action) => {
        console.log('Get users pending', action.payload);
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.error('Failed to fetch users:', action.payload);
      });

    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        return state.filter((user: User) => user.email !== action.payload); 
      })
      .addCase(deleteUser.pending, (state, action) => {
        console.log('Pending delete user', action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.error('Failed to delete user:', action.payload);
      });

    builder
      .addCase(updateUser.rejected, (state, action) => {
        console.error('Failed to update user:', action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const user = state.find((user: User) => user.email === action.payload.email);
        if (user) {
          user.username = action.payload.username;
          user.password = action.payload.password;
          user.role = action.payload.role;
        }
      })
      .addCase(updateUser.pending, (state, action) => {
        console.log('Pending update user:', action.payload);
      });
  },
});

export default userSlice.reducer;
