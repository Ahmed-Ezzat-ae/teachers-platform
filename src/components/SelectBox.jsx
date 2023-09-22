import { useField } from 'formik';
import React from 'react';
import { Col, Form } from 'react-bootstrap';

const SelectBox = ({ label, name, options, xs, md, ...other }) => {
  const [field, meta] = useField(name);
  return (
    <Col xs={xs} md={md}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        {...field}
        {...other}
        aria-label=""
        className="mb-3"
        isInvalid={meta.touched && meta.error}
        isValid={!meta.error && meta.touched}
      >
        <option value="">{label}</option>
        {options.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </Form.Select>

      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </Col>
  );
};

export default SelectBox;
