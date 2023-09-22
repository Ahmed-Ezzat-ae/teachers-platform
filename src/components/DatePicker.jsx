import { ErrorMessage, Field } from 'formik';
import React, { Fragment } from 'react';
import { Col, Form } from 'react-bootstrap';
import DateView from 'react-datepicker';

const DatePicker = ({ label, name, ...rest }) => {
  return (
    <Form.Group as={Col} md={12} controlId={label} className="mb-3 d-flex flex-column">
      <Form.Label>{label}</Form.Label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <Fragment>
              <DateView
                {...field}
                {...rest}
                showIcon
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                selected={value}
                onChange={(val) => setFieldValue(name, val)}
        
              />
            </Fragment>
          );
        }}
      </Field>
      <ErrorMessage name={name} component="div" className="errorMsg" />
    </Form.Group>
  );
};

export default DatePicker;
