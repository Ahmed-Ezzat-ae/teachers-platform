import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { teacherLogout } from '../teacherLogin';

export const getGroupsLevel3 = createAsyncThunk(
  'getGroupsLevel3',
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.get('/groups/levelThree');
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

export const deleteGroupLevel3 = createAsyncThunk(
  'deleteGroupLevel3',
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.delete(`/groups/levelThree?groupId=${id}`);
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

const levelThreeSlice = createSlice({
  name: 'groupsLevel3',
  initialState: {},
  reducers: {
    resetLevel3: (state) => {
      return { ...state, message: '' };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getGroupsLevel3.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGroupsLevel3.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.groupsLevelThree = action.payload;
    });
    builder.addCase(getGroupsLevel3.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteGroupLevel3.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteGroupLevel3.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.groupsLevelThree = state.groupsLevelThree.filter(
        (g) => g._id !== action.payload.deletedGroup._id
      );
    });
    builder.addCase(deleteGroupLevel3.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetLevel3 } = levelThreeSlice.actions;

export default levelThreeSlice.reducer;
