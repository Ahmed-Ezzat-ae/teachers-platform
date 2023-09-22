import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { teacherLogout } from '../teacherLogin';

export const getGroupsLevel1 = createAsyncThunk(
  'getGroupsLevel1',
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.get('/groups/levelOne');

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

export const deleteGroupLevel1 = createAsyncThunk(
  'deleteGroupLevel1',
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.delete(`/groups/levelOne?groupId=${id}`);
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

const levelOneSlice = createSlice({
  name: 'groupsLevel1',
  initialState: {},
  reducers: {
    resetLevel1: (state) => {
      return { ...state, message: '' };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGroupsLevel1.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGroupsLevel1.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.groupsLevelOne = action.payload;
    });
    builder.addCase(getGroupsLevel1.rejected, (state, action) => {

      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteGroupLevel1.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteGroupLevel1.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.groupsLevelOne = state.groupsLevelOne.filter(
        (g) => g._id !== action.payload.deletedGroup._id
      );
    });
    builder.addCase(deleteGroupLevel1.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetLevel1 } = levelOneSlice.actions;
export default levelOneSlice.reducer;
