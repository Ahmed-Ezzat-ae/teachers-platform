import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupDetails } from '../redux/slices/groupDetails';
import GroupInfo from '../components/groups/group-details/GroupInfo';
import StudentsGroup from '../components/groups/group-details/StudentsGroup';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';
import { Helmet } from 'react-helmet-async';

const GroupDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, groupDetails } = useSelector(
    (state) => state.groupDetails
  );

  useEffect(() => {
    dispatch(getGroupDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Helmet>
        <title>تفاصيل المجموعة</title>
      </Helmet>
      {loading && <Loading />}
      {error ? (
        <AlertMessage type="error" msg={error} />
      ) : (
        <Row>
          <Col xs={12} className="mb-5 shadow-sm p-4">
            <GroupInfo groupDetails={groupDetails} />
          </Col>
          {groupDetails?.students?.length ? (
            <Col xs={12} className="mt-4">
              <StudentsGroup groupDetails={groupDetails} />
            </Col>
          ) : (
            <AlertMessage type="error" msg={'لا يوجد اى طلاب حتى الان'} />
          )}
        </Row>
      )}
    </Container>
  );
};

export default GroupDetails;
