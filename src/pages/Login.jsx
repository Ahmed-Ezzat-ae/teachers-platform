import React, { Fragment, useContext, useEffect } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import TextField from '../components/TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetLogin, teacherLogin } from '../redux/slices/teacherLogin';
import AlertMessage from '../components/AlertMessage';
import { Helmet } from 'react-helmet-async';
import { TeacherContext } from '../context/teacherContext';

const Login = () => {
  const dispatch = useDispatch();
  const { teacherData } = useContext(TeacherContext);
  const { loading, error, message } = useSelector(
    (state) => state.teacherLogin
  );

  const navigate = useNavigate();

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

  const handleSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);
    dispatch(teacherLogin(values));
    submitProps.resetForm();
  };

  useEffect(() => {
    if (teacherData?.token) {
      return navigate('/');
    }
    let timer = null;
    if (message) {
      timer = setTimeout(() => {
        window.location.href = '/';
        dispatch(resetLogin());
      }, 2500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [message, dispatch, navigate, teacherData]);

  return (
    <Container>
      <Helmet>
        <title>تسجيل الدخول</title>
      </Helmet>
      {error && <AlertMessage type="error" msg={error} />}
      {message && <AlertMessage type="success" msg={message} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form className="shadow-sm p-4 mt-5">
            <h2 className="text-center mb-3 text-primary fw-bold">
              تسجيل الدخول
            </h2>
            <Row>
              <TextField label="كود المعلم" type="text" name="code" xs={12} />
              <TextField
                label="كلمة المرور"
                type="password"
                name="password"
                xs={12}
              />

              <Col>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  {loading ? (
                    <Fragment>
                      <Spinner animation="border" role="status" size="sm" />{' '}
                      &nbsp; جارى الارسال
                    </Fragment>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>
              </Col>
              <Col className="mt-3" xs={12}>
                <p>
                  ليس لديك حساب ؟ <Link to="/register">انشاء حساب</Link>
                </p>
              </Col>
              <Col className="mt-1" xs={12}>
                <Link to="/reset-password">نسيت كلمة المرور</Link>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
