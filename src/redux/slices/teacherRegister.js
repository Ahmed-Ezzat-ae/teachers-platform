import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const teacherRegister = createAsyncThunk(
  'teacherRegister',
  async (info, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post('/teachers/register', info);
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: 'teacher',
  initialState: {},
  reducers: {
    resetRegister: () => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(teacherRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(teacherRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    });
    builder.addCase(teacherRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
