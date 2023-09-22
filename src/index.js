import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import './utils/global-api';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TeacherContextProvider from './context/teacherContext';
import { HelmetProvider } from 'react-helmet-async';
import Loading from './components/Loading';
import Protected from './components/Protected';
import './App.css';
const RootLayout = React.lazy(() => import('./layouts/RootLayout'));
const Register = React.lazy(() => import('./pages/Register'));
const Login = React.lazy(() => import('./pages/Login'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Home = React.lazy(() => import('./pages/Home'));
const CreateGroup = React.lazy(() => import('./pages/CreateGroup'));
const Groups = React.lazy(() => import('./pages/Groups'));
const GroupDetails = React.lazy(() => import('./pages/GroupDetails'));
const UploadFiles = React.lazy(() => import('./pages/UploadFiles'));
const GroupUploads = React.lazy(() => import('./pages/GroupUploads'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'create-group',
        element: (
          <Protected>
            <CreateGroup />
          </Protected>
        ),
      },
      {
        path: 'profile',
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        path: 'groups',
        children: [
          {
            index: true,
            element: (
              <Protected>
                <Groups />
              </Protected>
            ),
          },

          {
            path: ':id',
            children: [
              {
                index: true,
                element: (
                  <Protected>
                    <GroupDetails />
                  </Protected>
                ),
              },

              {
                path: 'uploads',
                element: (
                  <Protected>
                    <GroupUploads />
                  </Protected>
                ),
              },
            ],
          },
        ],
      },

      {
        path: 'upload-files/:id',
        element: (
          <Protected>
            <UploadFiles />
          </Protected>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <Provider store={store}>
          <TeacherContextProvider>
            <RouterProvider router={router} />
          </TeacherContextProvider>
        </Provider>
      </HelmetProvider>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
