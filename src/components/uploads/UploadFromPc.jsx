import React, { Fragment, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../TextField';
import { Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetUploadMsg,
  uploadMyFiles,
} from '../../redux/slices/uploads/uploadSlice';
import { useParams } from 'react-router-dom';
import AlertMessage from '../AlertMessage';

const UploadFromPc = () => {
  const dispatch = useDispatch();
  const { id: groupId } = useParams();
  const { loading, error, message } = useSelector((state) => state.uploadSlice);

  const initialValues = {
    lessonName: '',
    filePath: '',
  };

  const validationSchema = Yup.object().shape({
    lessonName: Yup.string()
      .matches(
        /^(Lesson|الدرس) [\wء-ي]+(\s[\wء-ي]+)*: [\wء-ي]+(\s[\wء-ي]+)*$/,
        'اسم الدرس يجب ان يكون مطابق لهذا  (Lesson one: Greeting) او (الدرس الاول: العلم)'
      )
      .required('اسم الدرس مطلوب'),
    filePath: Yup.mixed()
      .test(
        'fileType',
        'يجب أن يكون الملف ملف فيديو (MP4) أو ملف PDF',
        (value) => {
          if (!value) return true; // If no file is selected, validation passes.

          // Check if the selected file's type is either video (MP4) or PDF.
          return (
            value &&
            (value.type === 'video/mp4' || value.type === 'application/pdf')
          );
        }
      )
      .required('يجب اختيار ملف فيديو (MP4) أو ملف PDF.'),
  });

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        dispatch(resetUploadMsg());
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [dispatch, message]);

  const handleSubmit = (values, formProps) => {
    formProps.setSubmitting(false);
    let formData = new FormData();
    formData.append('file', values.filePath);
    formData.append('lessonName', values.lessonName);
    dispatch(
      uploadMyFiles({
        groupId,
        formData,
      })
    );
    formProps.resetForm();
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {({ isValid, isSubmitting, setFieldValue }) => (
        <Fragment>
          {message && <AlertMessage type="success" msg={message} />}
          {error ? (
            <AlertMessage type="error" msg={error} />
          ) : (
            <Form
              className="shadow-sm p-4"
              encType="multipart/form-data"
              method="post"
              action="/groups/uploads"
            >
              <h4 className="text-primary mb-4 fw-semibold">
                رفع الملفات من جهازى
              </h4>
              <TextField name="lessonName" label="اسم الدرس" />
              <input
                name="filePath"
                type="file"
                label="مسار الملف"
                accept=".mp4,.pdf"
                onChange={(e) => setFieldValue('filePath', e.target.files[0])}
              />
              <Col xs={12} className="mt-4">
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  size="sm"
                >
                  {loading ? 'جارى الارسال' : 'رفع الملف'}
                </Button>
              </Col>
            </Form>
          )}
        </Fragment>
      )}
    </Formik>
  );
};

export default UploadFromPc;
