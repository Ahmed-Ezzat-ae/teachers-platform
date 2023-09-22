import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import AlertMessage from '../AlertMessage';
import {
  Button,
  ListGroup,
  OverlayTrigger,
  Stack,
  Tooltip,
} from 'react-bootstrap';
import {
  FaDownload,
  FaEdit,
  FaQuestion,
  FaTrash,
  FaUpload,
} from 'react-icons/fa';
import { deleteGroupLevel3, resetLevel3 } from '../../redux/slices/groupsLevels/groupsLevel3';
import { useNavigate } from 'react-router-dom';

const GroupsLevelThree = () => {
  const { loading, error, groupsLevelThree, message } = useSelector(
    (state) => state.levelThreeSlice
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        dispatch(resetLevel3());
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [message, dispatch]);

  return (
    <Fragment>
      {loading && <Loading />}

      {error ? (
        <AlertMessage type="error" msg={error} />
      ) : groupsLevelThree?.length ? (
        <ListGroup as="ul">
          <ListGroup.Item
            as="li"
            active
            className="text-center fs-4 fw-semibold"
          >
            المستوى الثالث
          </ListGroup.Item>
          {message && (

              <AlertMessage type="success" msg={message} />
          
          )}
          {groupsLevelThree.map((group) => (
            <ListGroup.Item
              as="li"
              key={group._id}
              className="my-2 d-flex justify-content-between flex-wrap align-items-center"
              action
              onClick={() => navigate(`/groups/${group._id}`)}
            >
              <p className="mb-0">{group.name}</p>
              <Stack
                gap={2}
                className="me-auto flex-row justify-content-end align-items-center"
              >
                <OverlayTrigger overlay={<Tooltip>رفع ملفات</Tooltip>}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/upload-files/${group._id}`);
                    }}
                  >
                    <FaUpload />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger overlay={<Tooltip>الملفات المحملة</Tooltip>}>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/groups/${group._id}/uploads`);
                    }}
                  >
                    <FaDownload />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger overlay={<Tooltip>تفاصيل المجموعة</Tooltip>}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/groups/${group._id}`);
                    }}
                  >
                    <FaQuestion />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger overlay={<Tooltip>تعديل</Tooltip>}>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/create-group', { state: group });
                    }}
                  >
                    <FaEdit />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger overlay={<Tooltip>حذف</Tooltip>}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteGroupLevel3(group._id));
                    }}
                  >
                    <FaTrash />
                  </Button>
                </OverlayTrigger>
              </Stack>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : null}
    </Fragment>
  );
};

export default GroupsLevelThree;
