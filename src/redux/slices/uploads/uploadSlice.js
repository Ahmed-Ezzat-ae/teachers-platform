import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { teacherLogout } from '../teacherLogin';
import axios from 'axios';

export const uploadMyFiles = createAsyncThunk(
  'uploadMyFiles',
  async ({ groupId, formData }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.post(
        `/groups/uploads?groupId=${groupId}`,
        formData
      );
      return data.message;
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


const uploadSlice = createSlice({
  name: 'upload',
  initialState: {},
  reducers: {
    resetUploadMsg: (state) => {
      return {...state, message: ''}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadMyFiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadMyFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(uploadMyFiles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetUploadMsg} = uploadSlice.actions
export default uploadSlice.reducer;
