import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { teacherLogout } from '../teacherLogin';

export const groupEContent = createAsyncThunk(
  'groupEContent',
  async (groupId, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.get(`/teachers/uploads?groupId=${groupId}`);

      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message === 'مستخدم غير موثوق') {
          rejectWithValue(error.response.data.message);
          dispatch(teacherLogout());
        } else {
          return rejectWithValue(error.response.data.message);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFile = createAsyncThunk(
  'deleteFile',
  async ({ groupId, fileName, lessonName }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.delete(
        `/groups/uploadsFile?groupId=${groupId}&fileName=${fileName}&lessonName=${lessonName}`
      );
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message === 'مستخدم غير موثوق') {
          rejectWithValue(error.response.data.message);
          dispatch(teacherLogout());
        } else {
          return rejectWithValue(error.response.data.message);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  'deleteLesson',
  async ({ groupId, lessonName }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.delete(
        `/groups/uploadLesson?groupId=${groupId}&lessonName=${lessonName}`
      );
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message === 'مستخدم غير موثوق') {
          rejectWithValue(error.response.data.message);
          dispatch(teacherLogout());
        } else {
          return rejectWithValue(error.response.data.message);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

const groupUploadsSlice = createSlice({
  name: 'groupUploads',
  initialState: {
    groupUploads: [],
  },

  reducers: {
    resetDeleteUploadFile:(state) => {
        return {...state, message: ''}
    }
  },

  extraReducers: (builder) => {
    builder.addCase(groupEContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(groupEContent.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.groupUploads = action.payload;
    });
    builder.addCase(groupEContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addMatcher(
      isAnyOf(deleteFile.pending, deleteLesson.pending),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(deleteFile.fulfilled, deleteLesson.fulfilled),
      (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.groupUploads = action.payload.group;
      }
    );
    builder.addMatcher(
      isAnyOf(deleteFile.rejected, deleteLesson.rejected),
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const {resetDeleteUploadFile} = groupUploadsSlice.actions
export default groupUploadsSlice.reducer;
