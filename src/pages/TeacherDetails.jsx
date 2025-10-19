import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  deleteTeacherAsync,
  updateTeacherAsync,
} from '../features/students/teachersSlice';

const TeacherDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    experience: '',
    gender: '',
    email: '',
  });

  const { teacher: locationTeacher  } = location.state || {};

  const teacherFromStore = useSelector((state) => state.teachers?.teachers?.find((t) => t._id === locationTeacher?._id))
  const teacher = teacherFromStore || locationTeacher 

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        subject: teacher.subject || '',
        experience: teacher.experience || '',
        gender: teacher.gender || '',
        email: teacher.email || '',
      });
    }
  }, [teacher]);

  console.log(locationTeacher);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateTeacherAsync({ id: teacher._id, updatedTeacher: formData })
      ).unwrap();
      setEditMode(false);
      alert('Teacher updated successfully!');
    } catch (error) {
      console.error('Failed to update teacher', error);
      alert('Failed to update teacher. Please try again.');
    }
  };

  const deleteHandler = async () => {
    if (window.confirm(`Are you sure you want to delete ${teacher.name}?`)) {
      try {
        await dispatch(deleteTeacherAsync(teacher._id)).unwrap();
        alert('Teacher deleted successfully!');
        navigate('/students');
      } catch (error) {
        console.error('Failed to delete teacher', error);
        alert('Failed to delete teacher. Please try again.');
      }
    }
  };

  if (!teacher) {
    return (
      <>
        <NavBar />
        <div className="container py-5 text-center">
          <h2>Teacher Details not found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      {editMode ? (
        <form onSubmit={formSubmitHandler} className="container mt-3">
          <h1 className='py-3'>Edit Teacher</h1>
          <input
            type="text"
            name="name"
            className="w-50"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <br />
          <br />
          <input
            type="text"
            name="subject"
            className="w-50"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
          />
          <br />
          <br />
          <input
            type="number"
            name="experience"
            className="w-50"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience (years)"
          />
          <br />
          <br />
          <div className="d-flex gap-3">
            <label>Gender:</label>
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
            type="email"
            name="email"
            className="w-50"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <br />
          <br />
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      ) : (
        <main className="container mt-3">
          <h1 className='py-3'>Teacher Detail</h1>
          <p>Name: {teacher.name}</p>
          <p>Subject: {teacher.subject}</p>
          <p>Experience: {teacher.experience} years</p>
          {teacher.email && <p>Email: {teacher.email}</p>}
          <div className="d-flex gap-3 mt-3">
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

export default TeacherDetails;
