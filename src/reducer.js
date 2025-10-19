const initialValue = { students: [] };

const studentReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'FETCH_STUDENTS':
      return {
        ...state,
        students: action.payload,
      };
    case 'ADD_STUDENTS':
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.find(
          (student) => student.id === action.payload.id
        )
          ? { ...students, ...action.payload.updatedData }
          : students,
      };
    default:
      return state;
  }
};
