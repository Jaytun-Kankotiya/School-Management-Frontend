import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDetails from './pages/StudentDetails';
import Classes from './pages/Classes';
import School from './pages/School';
import Students from './features/students/Students';
import AddNewStudent from './features/students/AddNewStudent';
import AddNewTeacher from './features/students/AddNewTeacher';
import TeacherDetails from './pages/TeacherDetails';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/students" element={<Students />} />
        <Route path="/new_student" element={<AddNewStudent />} />
        <Route path="/new_teacher" element={<AddNewTeacher />} />
        <Route path="/teacher_Details/:id" element={<TeacherDetails />} />
        <Route path="/student_Details/:id" element={<StudentDetails />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/school" element={<School />} />
      </Routes>
    </>
  );
}

export default App;
