import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    const response = await axios.get(`${BASE_URL}/students`);
    return response.data;
  }
);

export const addStudentAsync = createAsyncThunk(
  'students/addStudent',
  async (newStudent) => {
    const response = await axios.post(`${BASE_URL}/students`, newStudent);
    return response.data;
  }
);

export const updateStudentAsync = createAsyncThunk(
  'students/updateStudentAsync',
  async ({ id, updatedStudent }) => {
    const response = await axios.put(
      `${BASE_URL}/students/${id}`,
      updatedStudent
    );
    return response.data;
  }
);

export const deleteStudentSync = createAsyncThunk(
  'students/deleteStudentSync',
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/students/${id}`);
    return response.data;
  }
);

export const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = 'success';
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });

    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });

    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id
      );

      if (index !== -1) {
        state.students[index] = action.payload;
      }
    });

    builder.addCase(deleteStudentSync.fulfilled, (state, action) => {
      state.students = state.students.filter(
        (student) => student._id !== action.meta.arg
      );
    });
  },
});

export default studentsSlice.reducer;
