import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { teacherLogout } from './teacherLogin';

export const getGroupDetails = createAsyncThunk(
  'getGroupDetails',
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.get(`/groups/details/${id}`);
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

export const updateGroup = createAsyncThunk(
  'updateGroup',
  async (info, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.put(
        `/groups/update?groupId=${info.groupId}`,
        info.updatedData
      );
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

export const updateAbsence = createAsyncThunk(
  'updateAbsence',
  async (postedData, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.put(
        `/groups/absence?groupId=${postedData.id}`,
        postedData.absenceData
      );

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

export const deleteAllStudentsFromGroup = createAsyncThunk(
  'deleteAllStudents',
  async (groupId, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.delete(
        `/groups/students?groupId=${groupId}`
      );

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

export const deleteStudentFromGroup = createAsyncThunk(
  'deleteStudentFromGroup',
  async (info, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.delete(
        `/groups/student?groupId=${info.groupId}&studentId=${info.studentId}`
      );

      return {
        message: data.message,
        studentId: info.studentId,
      };
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

// move student from group to another
export const moveStudent = createAsyncThunk(
  'moveStudent',
  async (info, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.put(`/groups/moveStudent`, info);

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

const groupDetailsSlice = createSlice({
  name: 'groups',
  initialState: {},
  reducers: {
    resetGroupMessage: (state) => {
      return { ...state, message: '', error: '' };
    },
  },
  extraReducers: (builder) => {
    /* group details  */
    builder.addCase(getGroupDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGroupDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.groupDetails = action.payload;
    });
    builder.addCase(getGroupDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    /* delete all students from one Group   */
    builder.addCase(deleteAllStudentsFromGroup.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteAllStudentsFromGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.groupDetails = { ...state.groupDetails, students: [] };
      state.message = action.payload.message;
    });

    builder.addCase(deleteAllStudentsFromGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    /* delete one student from one group */
    builder.addCase(deleteStudentFromGroup.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteStudentFromGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.groupDetails = {
        ...state.groupDetails,
        students: state.groupDetails.students.filter(
          (s) => s._id !== action.payload.studentId
        ),
      };
      state.message = action.payload.message;
    });

    builder.addCase(deleteStudentFromGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    /* move student to another group  */
    /* اخذ الغياب  */
    /* update group details  */
    builder.addMatcher(
      isAnyOf(updateGroup.pending, moveStudent.pending, updateAbsence.pending),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        updateGroup.fulfilled,
        moveStudent.fulfilled,
        updateAbsence.fulfilled
      ),
      (state, action) => {
        state.loading = false;
        state.error = null;
        state.group = action.payload.group;
        state.message = action.payload.message;
      }
    );
    builder.addMatcher(
      isAnyOf(
        updateGroup.rejected,
        moveStudent.rejected,
        updateAbsence.rejected
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { resetGroupMessage } = groupDetailsSlice.actions;
export default groupDetailsSlice.reducer;
