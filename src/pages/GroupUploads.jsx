import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFile,
  deleteLesson,
  groupEContent,
  resetDeleteUploadFile,
} from '../redux/slices/uploads/groupUploads';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';
import { domain } from '../utils/domain';
import { Helmet } from 'react-helmet-async';

const GroupUploads = () => {
  const dispatch = useDispatch();
  const { id: groupId } = useParams();
  const { error, loading, groupUploads, message } = useSelector(
    (state) => state.groupUploads
  );
  useEffect(() => {
    let timer;
    if (message === 'تم نقل الطالب بنجاح') {
      timer = setTimeout(() => {
        window.location.reload();
      }, 2500);
    } else {
      timer = setTimeout(() => {
        dispatch(resetDeleteUploadFile());
      }, 2500);
    }
    dispatch(groupEContent(groupId));

    return () => clearTimeout(timer);
  }, [dispatch, groupId, message]);

  const handleDeleteFile = (fileName, lessonName) => {
    dispatch(
      deleteFile({
        groupId,
        fileName,
        lessonName,
      })
    );
  };

  const handleDeleteLesson = (lessonName) => {
    dispatch(
      deleteLesson({
        groupId,
        lessonName,
      })
    );
  };

  return (
    <Container>
      <Helmet>
        <title>المحتوى الالكترونى</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <AlertMessage type="error" msg={error} />
      ) : null}
      {message && <AlertMessage type="success" msg={message} />}
      {groupUploads.length ? (
        groupUploads.map((upload) => (
          <div className="my-4 p-4 shadow-sm" key={upload._id}>
            <h4 className="text-primary">{upload.lessonName}</h4>

            <div>
              {upload.videos.length ? (
                upload.videos.map((v) => (
                  <div
                    key={v}
                    className="mt-5 d-flex justify-content-between align-items-center shadow-sm p-3"
                  >
                    <video controls width="150px" height="150px">
                      <source
                        src={`${domain}/${upload.teacherOwner}/videos/${v}`}
                      />
                    </video>

                    <Button
                      className="d-block mt-2"
                      size="sm"
                      variant="outline-danger"
                      style={{ width: '110px' }}
                      onClick={() => handleDeleteFile(v, upload.lessonName)}
                    >
                      حذف
                    </Button>
                  </div>
                ))
              ) : (
                <div className="mt-4">
                  <AlertMessage
                    type="error"
                    msg="لم يتم رفع اى فيديوهات حتى الان"
                  />
                </div>
              )}
            </div>

            <div>
              {upload.pdfs.length ? (
                upload.pdfs.map((pdf) => (
                  <div
                    key={pdf}
                    className="mt-5 d-flex justify-content-between align-items-center shadow-sm p-3"
                  >
                    <p className="mb-0">{pdf}</p>
                    <Button
                      onClick={() => handleDeleteFile(pdf, upload.lessonName)}
                      size="sm"
                      variant="outline-danger"
                      style={{ width: '110px' }}
                    >
                      حذف
                    </Button>
                  </div>
                ))
              ) : (
                <div className="mt-4">
                  <AlertMessage
                    type="error"
                    msg="لم يتم رفع اى ملفات حتى الان"
                  />
                </div>
              )}
            </div>

            {upload.videos.length || upload.pdfs.length ? (
              <Button
                variant="outline-danger"
                onClick={() => handleDeleteLesson(upload.lessonName)}
                size="sm"
                className="mt-4"
              >
                حذف الدرس كاملا
              </Button>
            ) : null}
          </div>
        ))
      ) : (
        <div className="mt-4">
          <AlertMessage
            type="error"
            msg="لم يتم رفع اى ملفات اى ملفات حتى الان"
          />
        </div>
      )}
    </Container>
  );
};

export default GroupUploads;
