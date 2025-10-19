import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { fetchStudents } from '../features/students/studentsSlice';
import { fetchTeacherAsync } from '../features/students/teachersSlice';

const Classes = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students || []);
  const teachers = useSelector((state) => state.teachers.teachers || []);
  const [genderFilter, setGenderFilter] = useState('All');
  const [sort, setSort] = useState('Name');
  const [teachersFilter, setTeachersFilter] = useState('All');
  const [teachersSort, setTeachersSort] = useState('Name');

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeacherAsync());
  }, [dispatch]);

  console.log(students);

  const filterStudents =
    genderFilter === 'All'
      ? students
      : students.filter((s) => s.gender === genderFilter);

  const studentFilter = [...filterStudents].sort((a, b) => {
    if (sort === 'Name') {
      return a.name.localeCompare(b.name);
    } else if (sort === 'Marks') {
      return (b.marks || 0) - (a.marks || 0);
    } else {
      return (b.attendance || 0) - (a.attendance || 0);
    }
    return 0;
  });

  const filteredTeacher =
    teachersFilter === 'All'
      ? teachers
      : teachers.filter((t) => t.gender === teachersFilter);

  const teacherFilter = [...filteredTeacher].sort((a, b) => {
    if (teachersSort === 'Name') {
      return a.name.localeCompare(b.name);
    } else {
      return (b.experience || 0) - (a.experience || 0);
    }
  });

  return (
    <>
      <NavBar />
      <div className="container py-3">
        <h1 className="text-center">Class View</h1>

        <main className="mt-3">
          <h2>Students</h2>
          <div className="py-3 d-flex gap-2">
            <label>Filter by Gender: </label>
            <select onChange={(e) => setGenderFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Male">Boys</option>
              <option value="Female">Girls</option>
            </select>
          </div>

          <div className="py-2 d-flex gap-2">
            <label>Sort by: </label>
            <select onChange={(e) => setSort(e.target.value)}>
              <option value="Name">Name</option>
              <option value="Marks">Marks</option>
              <option value="Attendance">Attendance</option>
            </select>
          </div>

          <div className="py-3">
            <ul>
              {studentFilter.map((student) => (
                <li>
                  {student.name} - {student.gender} - Marks:{' '}
                  {student.marks ? student.marks : 'N/A'} - Attendance:{' '}
                  {student.attendance ? student.attendance : 'N/A'}
                </li>
              ))}
            </ul>
          </div>
        </main>

        <main>
          <h2>Teachers</h2>
          <div className="py-3 d-flex gap-2">
            <label>Filter by Gender: </label>
            <select onChange={(e) => setTeachersFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Male">Sir</option>
              <option value="Female">Medam</option>
            </select>
          </div>

          <div className="py-2 d-flex gap-2">
            <label>Sort by: </label>
            <select onChange={(e) => setTeachersSort(e.target.value)}>
              <option value="Name">Name</option>
              <option value="Experience">Experience</option>
            </select>
          </div>

          <div className="py-3">
            <ul>
              {teacherFilter.map((teacher) => (
                <li>
                  {teacher.name} - {teacher.gender} - Subject: {teacher.subject}{' '}
                  - Experience: {teacher.experience} years
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default Classes;
