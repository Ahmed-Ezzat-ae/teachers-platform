import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UploadFromPc from '../components/uploads/UploadFromPc';
import { Helmet } from 'react-helmet-async';


const UploadFiles = () => {
  return (
    <Container>
      <Helmet>
        <title>رفع الملفات</title>
      </Helmet>
      <Row>
        <Col xs={12} className="mt-5">
          <UploadFromPc />
        </Col>
      </Row>
    </Container>
  );
};

export default UploadFiles;
