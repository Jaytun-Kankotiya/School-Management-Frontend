import { useState } from 'react';
import NavBar from '../../components/Navbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTeacherAsync } from './teachersSlice';

const AddNewTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({
    name: '',
    subject: '',
    experience: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTeacherAsync(teacher));
    alert(`Teacher ${teacher.name} added successfully`);
    setTeacher({ name: '', subject: '', experience: '', gender: '' });
    navigate('/students');
  };

  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit} className="container mt-3">
        <h2 className='py-3'>Add Teacher</h2>

        <input
          type="text"
          value={teacher.name}
          name="name"
          onChange={handleChange}
          placeholder="Name"
          className="mb-3"
        />
        <br />

        <input
          type="text"
          name="subject"
          value={teacher.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="mb-3"
        />
        <br />

        <input
          type="number"
          name="experience"
          value={teacher.experience}
          onChange={handleChange}
          placeholder="Experience (years)"
          className="mb-3"
        />
        <br />

        <div className="d-flex gap-3 mb-3">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={teacher.gender === 'Male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={teacher.gender === 'Female'}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default AddNewTeacher;
