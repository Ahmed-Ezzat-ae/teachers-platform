import React from 'react';
import AlertMessage from '../../AlertMessage';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { moveStudent } from '../../../redux/slices/groupDetails';

const Availablegroups = ({ groups, error, moveStudentId, setMove }) => {
  const { id: currentGroup } = useParams();
  const dispatch = useDispatch();

  const handleMove = (newGroup) => {
    dispatch(
      moveStudent({
        studentId: moveStudentId,
        oldGroupId: currentGroup,
        newGroupId: newGroup,
      })
    );

    setMove(false);
  };

  return (
    <div className="my-5">
      {error ? (
        <AlertMessage type="error" msg={error} />
      ) : groups?.length ? (
        groups?.map((g) => (
          <div key={g?._id} className="my-5 shadow-sm p-3">
            <h4 className="text-primary fw-bold">{g?.name}</h4>
            <p className="mt-5">
              <strong>التاريخ / &nbsp; </strong>
              {g?.day} &nbsp; &nbsp; &nbsp; <strong>الساعة </strong> &nbsp;
              &nbsp;{g?.time}
            </p>
            <p>
              <strong>عدد الطلاب / &nbsp; </strong>
              {g?.studentsNumber}
            </p>
            <Button size="sm" onClick={() => handleMove(g?._id)}>
              نقل الى هنا
            </Button>
          </div>
        ))
      ) : <AlertMessage type="error" msg="لا توجد مجموعات مناسبة  لنقل الطالب"  />}
    </div>
  );
};

export default Availablegroups;
