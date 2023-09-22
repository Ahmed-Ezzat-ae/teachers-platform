import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const teacherLogin = createAsyncThunk(
  'teacherLogin',
  async (info, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post('/teachers/login', info);

      return {
        message: data.message,
        teacher: data.data,
        token: data.token,
      };
    } catch (error) {
    
      if (error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: 'teacher',
  initialState: {
    teacherData: JSON.parse(localStorage.getItem('teacherData')) || {},
  },

  reducers: {
    teacherLogout: () => {
      localStorage.removeItem('teacherData');
    },

    resetLogin: (state) => {
      return {...state, message: '', error: null };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(teacherLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(teacherLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.teacherData = action.payload.teacher;
      localStorage.setItem(
        'teacherData',
        JSON.stringify({
          ...action.payload.teacher,
          token: action.payload.token,
        })
      );
    });
    builder.addCase(teacherLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { teacherLogout, resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
