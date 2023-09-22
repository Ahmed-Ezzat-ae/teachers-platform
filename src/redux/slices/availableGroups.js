import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { teacherLogout } from './teacherLogin';

export const availableGroups = createAsyncThunk(
  'availableGroups',
  async (info, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.get(`/groups/available?_id=${info._id}&gender=${info.gender}&level=${info.level}`);

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

const availableGroupSlice = createSlice({
  name: 'available',
  initialState: {
    groups: [],
  },
  extraReducers: (builder) => {
    builder.addCase(availableGroups.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(availableGroups.fulfilled, (state, action) => {
      state.loading = false;
      state.groups = action.payload;
    });
    builder.addCase(availableGroups.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default availableGroupSlice.reducer;
