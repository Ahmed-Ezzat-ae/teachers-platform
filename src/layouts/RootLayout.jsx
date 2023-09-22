import React, { Fragment, useEffect, useState, useContext } from 'react';
import Header from '../components/navbar/Header';
import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';
import { fetchContent } from '../redux/slices/content';
import { TeacherContext } from '../context/teacherContext';
import { teacherLogout } from '../redux/slices/teacherLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const RootLayout = () => {
  const { teacherData } = useContext(TeacherContext);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (teacherData?.token) {
        const tokenData = atob(teacherData?.token.split('.')[1]);
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if (currentTimeInSeconds >= tokenData.exp) {
          dispatch(teacherLogout());
          window.location.href = '/login';
          return;
        }
      }
    };
    setLoading(false);
    checkTokenExpiration();
    dispatch(fetchContent());
  }, [dispatch, teacherData?.token]);

  return (
    <div dir="auto">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Header />
          <main className="main">
            <Outlet />
          </main>
        </Fragment>
      )}
    </div>
  );
};

export default RootLayout;
