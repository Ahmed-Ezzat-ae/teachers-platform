import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { teacherLogout } from '../teacherLogin';

export const getGroupsLevel2 = createAsyncThunk(
  'getGroupsLevel2',
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.get('/groups/levelTwo');
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

export const deleteGroupLevel2 = createAsyncThunk(
  'deleteGroupLevel2',
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.delete(`/groups/levelTwo?groupId=${id}`);
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

const levelTwoSlice = createSlice({
  name: 'groupsLevel2',
  initialState: {},
  reducers: {
    resetLevel2: (state) => {
      return { ...state, message: '' };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGroupsLevel2.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGroupsLevel2.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.groupsLevelTwo = action.payload;
    });
    builder.addCase(getGroupsLevel2.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteGroupLevel2.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteGroupLevel2.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message
      state.groupsLevelTwo = state.groupsLevelTwo.filter(g => g._id !== action.payload.deletedGroup._id)
    });
    builder.addCase(deleteGroupLevel2.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetLevel2 } = levelTwoSlice.actions;
export default levelTwoSlice.reducer;
