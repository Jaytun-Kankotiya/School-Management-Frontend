import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/Navbar';
import { useEffect } from 'react';
import { fetchStudents } from '../features/students/studentsSlice';
import { fetchTeacherAsync } from '../features/students/teachersSlice';

const School = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const teachers = useSelector((state) => state.teachers.teachers);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeacherAsync());
  }, [dispatch]);

  const avgMarks = students.reduce((sum, curr) => sum + (curr.marks || 0), 0);
  const avgattandance = students.reduce(
    (sum, curr) => sum + (curr.attendance || 0),
    0
  );

  const topStudent = [...students].sort((a, b) => b.marks - a.marks)[0];

  const totalExperience = teachers.reduce(
    (sum, t) => sum + (t.experience || 0),
    0
  );
  const avgExperience =
    teachers.length > 0 ? totalExperience / teachers.length : 0;

  const subjects = teachers.map((t) => t.subject).join(', ');

  console.log(teachers);

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="my-3">School View</h1>
        <main>
          <h3>Students</h3>
          <p>Total Students: {students.length}</p>
          <p>Average Attendance: {avgMarks / students.length}</p>
          <p>Average Marks: {avgattandance / students.length}</p>
          <p>Top Student: {topStudent?.name}</p>
        </main>
        <hr />
        <main>
          <h3>Teachers</h3>
          <p>Total Teachers: {teachers.length}</p>
          <p>List Of Subjects: {subjects}</p>
          <p>Average Experienced Teachers: {avgExperience.toFixed(1)}</p>
        </main>
      </div>
    </>
  );
};

export default School;
