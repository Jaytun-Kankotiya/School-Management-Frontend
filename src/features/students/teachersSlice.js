import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchTeacherAsync = createAsyncThunk(
  'teachers/fetchTeacherAsync',
  async () => {
    const response = await axios.get(`${BASE_URL}/teachers`);
    return response.data;
  }
);

export const addTeacherAsync = createAsyncThunk(
  'teachers/addTeacherAsync',
  async (newTeacher) => {
    const response = await axios.post(`${BASE_URL}/teachers`, newTeacher);
    return response.data;
  }
);

export const updateTeacherAsync = createAsyncThunk(
  'teachers/updateTeacherAsync',
  async ({ id, updatedTeacher }) => {
    const response = await axios.put(
      `${BASE_URL}/teachers/${id}`,
      updatedTeacher
    );
    return response.data;
  }
);

export const deleteTeacherAsync = createAsyncThunk(
  'teachers/deleteTeacherAsync',
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/teachers/${id}`);
    return { id, ...response.data };
  }
);

export const teacherSlice = createSlice({
  name: 'teachers',
  initialState: {
    teachers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTeacherAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeacherAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.teachers = action.payload.data;
      })
      .addCase(fetchTeacherAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })

      .addCase(addTeacherAsync.fulfilled, (state, action) => {
        state.teachers.push(action.payload.data);
      })

      .addCase(updateTeacherAsync.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const index = state.teachers.findIndex((t) => t._id === updated._id);
        if (index !== -1) state.teachers[index] = updated;
      })

      .addCase(deleteTeacherAsync.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.teachers = state.teachers.filter((t) => t._id !== id);
      });
  },
});

export default teacherSlice.reducer;
