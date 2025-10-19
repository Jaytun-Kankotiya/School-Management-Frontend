import { useState } from 'react';
import NavBar from '../../components/Navbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStudentAsync } from './studentsSlice';

const AddNewStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    age: '',
    grade: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(student);

    dispatch(addStudentAsync(student));
    alert(`Student with name ${student.name} added successfully`);
    navigate('/students');
  };

  return (
    <>
      <NavBar />

      <form onSubmit={handleSubmit} className="container">
        <h2 className="py-3">Add Student</h2>
        <input
          type="text"
          value={student.name}
          name="name"
          onChange={handleChange}
          placeholder="Name"
        />
        <br />
        <br />
        <input
          type="number"
          name="age"
          value={student.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <br />
        <br />
        <input
          type="text"
          name="grade"
          value={student.grade}
          onChange={handleChange}
          placeholder="Grade"
        />
        <br />
        <br />
        <div>
          <div className="d-flex gap-2">
            <label>Gender: </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>
        <br />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default AddNewStudent;
