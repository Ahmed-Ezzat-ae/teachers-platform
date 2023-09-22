import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { teacherLogout } from './teacherLogin';

export const teacherProfile = createAsyncThunk(
  'teacherProfile',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get('/teachers/profile');
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message === 'مستخدم غير موثوق') {
          dispatch(teacherLogout());
        } else {
          return rejectWithValue(error.response.data.message);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (profileData, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put('/teachers/profile', profileData);
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message === 'مستخدم غير موثوق') {
          dispatch(teacherLogout());
        } else {
          return rejectWithValue(error.response.data.message);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {},

  extraReducers: (builder) => {
    builder.addCase(teacherProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(teacherProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(teacherProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload.profile;
      state.message = action.payload.message;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default profileSlice.reducer;
