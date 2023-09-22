import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { TeacherContext } from '../context/teacherContext';
const Protected = ({ children }) => {
  const { teacherData } = useContext(TeacherContext);
  let token = teacherData?.token;
  return token ? children : <Navigate to="/login" replace />;
};

export default Protected;
