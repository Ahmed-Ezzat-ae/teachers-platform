import React, { createContext } from 'react';

export const TeacherContext = createContext();
const TeacherContextProvider = ({ children }) => {
  const teacherData = JSON.parse(localStorage.getItem('teacherData'));
  return (
    <TeacherContext.Provider value={{ teacherData }}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherContextProvider;
