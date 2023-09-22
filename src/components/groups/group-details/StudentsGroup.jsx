import React, { useEffect, useState } from 'react';
import { Button, Form, Stack, Table } from 'react-bootstrap';
import TableItems from './TableItems';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  deleteAllStudentsFromGroup,
  updateAbsence,
} from '../../../redux/slices/groupDetails';
import AlertMessage from '../../AlertMessage';
import AvailableGroups from '../group-details/Availablegroups';

const StudentsGroup = ({ groupDetails }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [studentName, setStudentName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [move, setMove] = useState(false);
  const [moveStudentId, setMoveStudentId] = useState(null);
  const { message } = useSelector((state) => state.groupDetails);
  const { error, groups } = useSelector((state) => state.availableGroups);

  const handleCheckboxChange = (studentId, isChecked) => {
    if (isChecked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    }
  };

  const handleSubmit = () => {
    dispatch(
      updateAbsence({
        id,
        absenceData: selectedStudents,
      })
    );
  };

  const handleStudentMove = (studentId) => {
    setMove((prev) => !prev);
    setMoveStudentId(studentId);
  };

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        window.location.reload();
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div>
      {message && <AlertMessage type="success" msg={message} />}

      {/* search input  */}
      <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="search"
          placeholder="ابحث عن طالب"
          onChange={(e) => setStudentName(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover size="lg" responsive>
        <thead>
          <tr className={styles.tr}>
            <th className="text-primary py-3">العدد</th>
            <th className="text-primary py-3">البروفايل</th>
            <th className="text-primary py-3">اسم الطالب</th>
            <th className="text-primary py-3">رقم الهاتف</th>
            <th className="text-primary py-3">الغياب</th>
            <th className="text-primary py-3">النوع</th>
            <th className="text-primary py-3">غائب</th>
            <th className="text-primary py-3">حذف</th>
            <th className="text-primary py-3">نقل</th>
          </tr>
        </thead>
        <tbody>
          {groupDetails?.students.length
            ? groupDetails.students
                .filter((student) => {
                  if (studentName !== '') {
                    return student.name.includes(studentName);
                  } else {
                    return student;
                  }
                })
                .map((student, index) => (
                  <TableItems
                    student={student}
                    key={student._id}
                    index={index + 1}
                    move={move}
                    absentStudents={groupDetails.absentStudents}
                    handleStudentMove={handleStudentMove}
                    handleChange={(isChecked) => {
                      handleCheckboxChange(student._id, isChecked);
                    }}
                  />
                ))
            : null}
        </tbody>
      </Table>
      <Stack
        direction="horizontal"
        className="justify-content-between flex-wrap my-4"
      >
        <Button
          onClick={handleSubmit}
          disabled={!selectedStudents.length}
          size="sm"
        >
          حفظ الغياب
        </Button>

        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => dispatch(deleteAllStudentsFromGroup(id))}
          disabled
        >
          حذف جميع الطلاب
        </Button>
      </Stack>

      {move ? (
        <AvailableGroups
          groups={groups}
          error={error}
          moveStudentId={moveStudentId}
          setMove={setMove}
        />
      ) : null}
    </div>
  );
};

export default StudentsGroup;
