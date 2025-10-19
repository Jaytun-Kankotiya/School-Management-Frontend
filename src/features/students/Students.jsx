import NavBar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents } from './studentsSlice';
import { fetchTeacherAsync } from './teachersSlice';

const Students = () => {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);
  const {
    teachers,
    status: teacherStatus,
    error: teacherError,
  } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeacherAsync());
  }, [dispatch]);

  if (status === 'loading' || teacherStatus === 'loading') {
    return (
      <>
        <NavBar />
        <div className="container py-5 text-center">
          <h2>Loading...</h2>
        </div>
      </>
    );
  }

  if (status === 'error' || teacherStatus === 'error') {
    return (
      <>
        <NavBar />
        <div className="container py-5 text-center">
          <h2>Error: {error || teacherError || 'Failed to fetch data'}</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mt-2">
        <div className="mb-5">
          <div className="d-flex align-items-center gap-5">
            <h2 className="py-2">Students List</h2>
            <Link className="btn btn-warning mb-2" to="/new_student">
              Add Student
            </Link>
          </div>
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                <Link
                  to={`/student_Details/${student._id}`}
                  state={{ student }}
                >
                  {student.name} ({student.marks ?? 'N/A'})
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="d-flex align-items-center gap-5">
            <h2 className="py-2">Teachers List</h2>
            <Link className="btn btn-warning mb-2" to="/new_teacher">
              Add Teacher
            </Link>
          </div>
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher._id}>
                <Link
                  to={`/teacher_Details/${teacher._id}`}
                  state={{ teacher }}
                >
                  {teacher.name} ({teacher.subject})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Students;
