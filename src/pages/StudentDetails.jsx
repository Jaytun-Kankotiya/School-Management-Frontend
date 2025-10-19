import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import {
  deleteStudentSync,
  fetchStudents,
  updateStudentAsync,
} from '../features/students/studentsSlice';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const StudentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    age: '',
    gender: '',
    attendance: '',
    marks: '',
  });

  const { student: locationStudent } = location.state || {};

  const studentFromStore = useSelector((state) => state?.students?.students?.find((s) => s._id === locationStudent?._id))
  const student = studentFromStore || locationStudent


  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        grade: student.grade || '',
        age: student.age || '',
        gender: student.gender || '',
        attendance: student.attendance || '',
        marks: student.marks || '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSumbitHandler = async (e) => {
    e.preventDefault();

    try {
      const updated =
      await dispatch(
        updateStudentAsync({ id: student._id, updatedStudent: formData })
      ).unwrap();
      setFormData({
      name: updated.name,
      grade: updated.grade,
      age: updated.age,
      gender: updated.gender,
      attendance: updated.attendance,
      marks: updated.marks,
    });
      setEditMode(false);
      alert('Student updated successfully!');
    } catch (error) {
      console.error('Failed to Update student', error);
      alert('Failed to update student. Please try again');
    }
  };

  const deleteHandler = async () => {
    if (window.confirm(`Are You sure you want to delete ${student.name}?`)) {
      try {
        await dispatch(deleteStudentSync(student._id)).unwrap();
        alert('Student deleted successfully!');
        navigate('/students');
      } catch (error) {
        console.error('Failed to delete student', error);
        alert('Failed to delete student. Please try again');
      }
    }
  };

  if (!student) {
    return (
      <>
        <NavBar />
        <div className="container py-5 text-center">
          <h2>Student Details not found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />

      {editMode ? (
        <form onSubmit={formSumbitHandler} className="container">
          <h1 className="py-3">Edit Student</h1>
          <input
            type="text"
            name="name"
            className="w-50"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="text"
            name="age"
            className="w-50"
            value={formData.age}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="text"
            name="grade"
            className="w-50"
            value={formData.grade}
            onChange={handleChange}
          />
          <br />
          <br />
          <div className="d-flex gap-2">
            <label>Gender: </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
          <br />
          <input
            type="number"
            name="attendance"
            placeholder="Attendance between 0 to 100"
            className="w-50"
            value={formData.attendance}
            onChange={handleChange}
            step="0.01"
          />
          <br />
          <br />
          <input
            type="number"
            name="marks"
            className="w-50"
            placeholder="Marks between 0 to 100"
            step="0.01"
            value={formData.marks}
            onChange={handleChange}
          />
          <br />
          <br />
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </form>
      ) : (
        <main className="container">
          <h1 className="py-3">Student Detail</h1>
          <p>Name: {student.name}</p>
          <p>Grade: {student.grade}</p>
          <p>Age: {student.age}</p>
          {student.attendance && <p>Attendance: {student.attendance}</p>}
          {student.marks && <p>Marks: {student.marks}</p>}
          <div className="d-flex gap-3">
            <button
              className="btn btn-warning"
              onClick={() => setEditMode(true)}
            >
              Edit Details
            </button>
            <button className="btn btn-danger" onClick={deleteHandler}>
              Delete
            </button>
          </div>
        </main>
      )}
    </>
  );
};

export default StudentDetails;
