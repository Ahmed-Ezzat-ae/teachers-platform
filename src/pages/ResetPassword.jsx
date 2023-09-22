import React, { Fragment, useContext, useEffect } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import TextField from '../components/TextField';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/slices/resetPassword';
import AlertMessage from '../components/AlertMessage';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { TeacherContext } from '../context/teacherContext';

const ResetPassword = () => {
  const { teacherData } = useContext(TeacherContext);
  const navigate = useNavigate();
  const { error, loading, message } = useSelector(
    (state) => state.resetPasswordSlice
  );
  const dispatch = useDispatch();
  const initialValues = {
    code: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required('كود المعلم مطلوب')
      .matches(/^(Mr\.|Mrs\.)/, 'يجب ان يبدأ ب Mr او Mrs ')
      .length(12, 'يجب ان يكون 12 أحرف او أرقام'),
    password: Yup.string().required('كلمة المرور مطلوبة'),
  });

  const handleSubmit = (values, props) => {
    props.setSubmitting(false);
    dispatch(resetPassword(values));
  };

  useEffect(() => {
    if (teacherData?.token) {
      return navigate('/');
    }
    let timer;
    if (message) {
      timer = setTimeout(() => {
        window.location.href = '/login';
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [message, teacherData, navigate]);

  return (
    <Container>
      <Helmet>
        <title>استعادة كلمة المرور</title>
      </Helmet>
      {error && (
       
          <AlertMessage type="error" msg={error} />
      
      )}
      {message && (
  
          <AlertMessage type="success" msg={message} />
     
      )}
      <h2 className="fs-3 text-primary fw-semibold mb-5">
        اكتب الكود لاستعادة كلمة المرور
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isValid, isSubmitting }) => (
          <Form className="p-3 mt-3 shadow-sm">
            <TextField name="code" label="الكود" />
            <TextField
              name="password"
              type="password"
              label="كلمة المرور الجديدة"
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              {loading ? (
                <Fragment>
                  <Spinner animation="border" role="status" size="sm" /> &nbsp;
                  جارى الارسال
                </Fragment>
              ) : (
                'ارسال'
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPassword;
