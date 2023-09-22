import { Button, Container, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { teacherLogout } from '../../redux/slices/teacherLogin';
import { domain } from '../../utils/domain';

const Header = () => {
  const { teacherData } = useSelector((state) => state.teacherLogin);
  const { content } = useSelector((state) => state.contentSlice);
  const dispatch = useDispatch();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary mb-4"
      dir="rtl"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          {content?.logoImg ? (
            <img
              src={`${domain}/images/logo/${content.logoImg}`}
              alt="logo"
              className="logo-img"
            />
          ) : (
            'المتألق'
          )}
        </Navbar.Brand>

        {Object?.keys(teacherData)?.length ? (
          <Stack direction="horizontal" gap={3}>
            <span className="h5 mb-0">{teacherData?.name}</span>

            <Link to="/profile">
              <img
                src={
                  teacherData?.profile
                    ? teacherData?.profile
                    : '/images/avatars/default.png'
                }
                alt="profile"
                className="header-img"
              />
            </Link>

            <Button
              onClick={() => {
                dispatch(teacherLogout());
                window.location.href = '/login';
              }}
            >
              خروج
            </Button>
          </Stack>
        ) : (
          <Button as={Link} to="login">
            تسجيل الدخول
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
