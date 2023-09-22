import React, { Fragment, useEffect, useMemo } from 'react';
import styles from './style.module.css';
import { Button, Form } from 'react-bootstrap';
import { FaReply, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteStudentFromGroup } from '../../../redux/slices/groupDetails';
import { useParams } from 'react-router-dom';
import { availableGroups } from '../../../redux/slices/availableGroups';

const TableItems = ({
  student,
  index,
  handleChange,
  absentStudents,
  move,
  handleStudentMove,
}) => {
  const dispatch = useDispatch();
  const { id: groupId } = useParams();

  const absentIndex = useMemo(() => {
    return absentStudents?.length
      ? absentStudents?.findIndex((s) => s?._id === student?._id)
      : null;
  }, [absentStudents, student?._id]);

  useEffect(() => {
    if (move) {
      dispatch(
        availableGroups({
          _id: student?._id,
          gender: student?.gender,
          level: student?.level,
        })
      );
    }
  }, [dispatch, student, move]);

  return (
    <Fragment>
      <tr className={styles.tr}>
        <td className={styles.td}>{index}</td>
        <td className={styles.td}>
          {student?.profile ? (
            <img
              src={student?.profile}
              alt={student?.name}
              className={`img-fluid ${styles.img}`}
            />
          ) : (
            <img
              src="/images/avatars/s1.png"
              alt={student?.name}
              className={`img-fluid ${styles.img}`}
            />
          )}
        </td>
        <td className={styles.td}>{student?.name}</td>
        <td className={styles.td}>{student?.phone.join(", ")}</td>

        <td className={styles.td}>
          {student?._id === absentStudents[absentIndex]?._id
            ? absentStudents[absentIndex]?.absence
            : 0}
        </td>
        <td className={styles.td}>{student?.gender}</td>
        <td className={styles.td}>
          <Form>
            <Form.Check
              type="checkbox"
              id={student?._id}
              size="lg"
              onChange={(e) => {
                handleChange(e.target.checked);
              }}
            />
          </Form>
        </td>
        <td className={styles.td}>
          <Button
            size="sm"
            variant="danger"
            onClick={() =>
              dispatch(
                deleteStudentFromGroup({
                  groupId: groupId,
                  studentId: student._id,
                })
              )
            }
          >
            <FaTrash />
          </Button>
        </td>

        <td className={styles.td}>
          <Button size="sm" onClick={() => handleStudentMove(student?._id)}>
            <FaReply />
          </Button>
        </td>
      </tr>
    </Fragment>
  );
};

export default TableItems;
