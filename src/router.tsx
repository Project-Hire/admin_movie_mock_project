import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Movie = Loader(lazy(() => import('src/content/applications/Movie')));
const Category = Loader(
  lazy(() => import('src/content/applications/Category'))
);
const Actor = Loader(lazy(() => import('src/content/applications/Actor')));
// Create Pages
const CreateCategoryPage = Loader(
  lazy(() => import('src/content/create/CreateCategory'))
);
const CreateActorPage = Loader(
  lazy(() => import('src/content/create/CreateActor'))
);
const CreateMoviePage = Loader(
  lazy(() => import('src/content/create/CreateMovie'))
);
// Detail Pages
const DetailCategoryPage = Loader(
  lazy(() => import('src/content/detail/DetailCategory'))
);
const DetailActorPage = Loader(
  lazy(() => import('src/content/detail/DetailActor'))
);
const DetailMoviePage = Loader(
  lazy(() => import('src/content/detail/DetailMovie'))
);
// Edit Pages
const EditCategoryPage = Loader(
  lazy(() => import('src/content/edit/EditCategory'))
);
const EditActorPage = Loader(lazy(() => import('src/content/edit/EditActor')));
const EditMoviePage = Loader(lazy(() => import('src/content/edit/EditMovie')));

const LoginPage = Loader(lazy(() => import('src/content/pages/Auth/Login')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/management/category" replace />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="movie" replace />
      },
      {
        path: 'movie',
        element: <Movie />
      },
      {
        path: 'category',
        element: <Category />
      },
      {
        path: 'actor',
        element: <Actor />
      }
    ]
  },
  {
    path: 'create',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="category" replace />
      },
      {
        path: 'category',
        element: <CreateCategoryPage />
      },
      {
        path: 'actor',
        element: <CreateActorPage />
      },
      {
        path: 'movie',
        element: <CreateMoviePage />
      }
    ]
  },
  {
    path: 'detail',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="category" replace />
      },
      {
        path: 'category/:id',
        element: <DetailCategoryPage />
      },
      {
        path: 'actor/:id',
        element: <DetailActorPage />
      },
      {
        path: 'movie/:id',
        element: <DetailMoviePage />
      }
    ]
  },
  {
    path: 'edit',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="category" replace />
      },
      {
        path: 'category/:id',
        element: <EditCategoryPage />
      },
      {
        path: 'actor/:id',
        element: <EditActorPage />
      },
      {
        path: 'movie/:id',
        element: <EditMoviePage />
      }
    ]
  }
];

export default routes;
