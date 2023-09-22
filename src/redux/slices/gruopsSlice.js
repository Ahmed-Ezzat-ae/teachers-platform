import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { teacherLogout } from './teacherLogin';

export const createGrope = createAsyncThunk(
  'createGrope',
  async (info, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.post('/groups/', info);
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



const groupSlice = createSlice({
  name: 'groups',
  initialState: {},
  reducers: {
    resetCreateMsg: (state) => {
      return {...state, message: ''}
    }
  },

  extraReducers: (builder) => {
    builder.addCase(createGrope.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createGrope.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    });
    builder.addCase(createGrope.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetCreateMsg} = groupSlice.actions
export default groupSlice.reducer;
