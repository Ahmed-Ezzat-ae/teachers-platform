import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import GroupsLevelOne from '../components/groups/GroupsLevelOne';
import GroupsLevelTwo from '../components/groups/GroupsLevelTwo';
import GroupsLevelThree from '../components/groups/GroupsLevelThree';
import { useDispatch } from 'react-redux';
import { getGroupsLevel1 } from '../redux/slices/groupsLevels/groupsLevel1';
import { getGroupsLevel2 } from '../redux/slices/groupsLevels/groupsLevel2';
import { getGroupsLevel3 } from '../redux/slices/groupsLevels/groupsLevel3';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Groups = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroupsLevel1());
    dispatch(getGroupsLevel2());
    dispatch(getGroupsLevel3());
  }, [dispatch]);

  return (
    <Container>
      <Helmet>
        <title>المجموعات التى تم انشاؤها</title>
      </Helmet>
      <div className="my-4">
        <Button as={Link} to="/create-group" variant="outline-primary">
          انشاء مجموعة جديدة
        </Button>
      </div>

      <GroupsLevelOne />
      <GroupsLevelTwo />
      <GroupsLevelThree />
    </Container>
  );
};

export default Groups;
