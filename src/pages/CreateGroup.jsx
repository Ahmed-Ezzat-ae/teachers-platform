import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextField from '../components/TextField';
import SelectBox from '../components/SelectBox';
import { useDispatch, useSelector } from 'react-redux';
import { createGrope, resetCreateMsg } from '../redux/slices/gruopsSlice';
import AlertMessage from '../components/AlertMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { resetGroupMessage, updateGroup } from '../redux/slices/groupDetails';
import DatePicker from '../components/DatePicker';

const CreateGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.group);
  const {
    loading: updateLoad,
    error: updateError,
    message: updateMsg,
  } = useSelector((state) => state.groupDetails);

  const { state: group } = useLocation();
  const [groupState, setGroupState] = useState('create');

  const initialValues = {
    name: group?.name || '',
    time: group?.time || '',
    day: group?.day || '',
    level: group?.level || '',
    gender: group?.gender || '',
    maxStudent: group?.maxStudent || 1,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('اسم المجموعة مطلوب'),
    time: Yup.string().required('ميعاد المجموعة مطلوب'),
    day: Yup.string().required('يوم المجموعة مطلوب '),
    level: Yup.string().required('حدد المستوى الدراسى'),
    gender: Yup.string().required('حدد النوع'),
    maxStudent: Yup.number()

      .min(1, 'اقل عدد هو 1')
      .max(120, 'الحد الاقصى 120'),
  });

  const days = [
    'السبت',
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الاربعاء',
    'الخميس',
    'الجمعة',
  ];
  const levels = ['المستوى الاول', 'المستوى الثانى', 'المستوى الثالث'];
  const genders = ['ذكر', 'أنثى'];

  const handleSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);

    const date = new Date(values.time);
    const time = date.toLocaleTimeString();

    if (groupState === 'create') {
      dispatch(
        createGrope({
          ...values,
          time,
        })
      );
    } else {
      const info = {
        groupId: group._id,
        updatedData: {
          ...values,
          time,
        },
      };

      dispatch(updateGroup(info));
    }

    submitProps.resetForm();
  };

  useEffect(() => {
    let timer = null;
    if (message || updateMsg) {
      timer = setTimeout(() => {
        dispatch(resetGroupMessage());
        dispatch(resetCreateMsg());
        navigate('/groups');
      }, 2500);
    }

    if (group) {
      setGroupState('update');
    }

    return () => {
      clearTimeout(timer);
    };
  }, [message, dispatch, updateMsg, group, navigate]);

  return (
    <Container>
      <Helmet>
        <title>{group ? 'تعديل بيانات المجموعة' : 'انشاء مجموعة جديدة'}</title>
      </Helmet>
      <h2 className="text-primary fs-2 fw-semibold text-center mb-3">
        {group ? 'تعديل بيانات المجموعة' : 'انشاء مجموعة جديدة'}
      </h2>
      {error ? (
        <AlertMessage type="error" msg={error} />
      ) : (
        message && <AlertMessage type="success" msg={message} />
      )}

      {updateError && <AlertMessage type="error" msg={updateError} />}
      {updateMsg && <AlertMessage type="success" msg={updateMsg} />}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form className="shadow-sm p-4">
            <Row>
              <TextField
                name="name"
                label="اسم المجموعة"
                xs={12}
                md={6}
                type="text"
              />
              <TextField
                name="maxStudent"
                label="الحد الاقصى لعدد الطلاب"
                xs={12}
                md={6}
                type="number"
                min={1}
                max={120}
              />

              <SelectBox
                name="day"
                options={days}
                label="اليوم"
                xs={12}
                md={6}
              />

              <Col md={6} >
                <DatePicker name="time" label="الوقت"  />
              </Col>

              <SelectBox
                options={levels}
                name="level"
                label="اختر المرحلة الدراسية"
                xs={12}
                md={6}
              />

              <SelectBox
                options={genders}
                name="gender"
                label="اختر النوع"
                xs={12}
                md={6}
              />

              <Col xs={12} className="mt-3">
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  {loading || updateLoad ? (
                    <Fragment>
                      <Spinner animation="border" role="status" size="sm" />{' '}
                      &nbsp; جارى الارسال
                    </Fragment>
                  ) : group ? (
                    'تعديل بيانات المجموعة'
                  ) : (
                    'انشاء مجموعة جديدة'
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateGroup;
