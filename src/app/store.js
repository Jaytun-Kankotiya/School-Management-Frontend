import { configureStore } from '@reduxjs/toolkit';
import { studentsSlice } from '../features/students/studentsSlice';
import { teacherSlice } from '../features/students/teachersSlice';

const store = configureStore({
  reducer: {
    students: studentsSlice.reducer,
    teachers: teacherSlice.reducer,
  },
});

export default store;
