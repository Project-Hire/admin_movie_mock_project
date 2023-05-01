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

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Movie = Loader(lazy(() => import('src/content/applications/Movie')));
const Category = Loader(
  lazy(() => import('src/content/applications/Category'))
);
const Actor = Loader(lazy(() => import('src/content/applications/Actor')));

const CreateCategoryPage = Loader(
  lazy(() => import('src/content/create/CreateCategory'))
);
const CreateActorPage = Loader(
  lazy(() => import('src/content/create/CreateActor'))
);
const CreateMoviePage = Loader(
  lazy(() => import('src/content/create/CreateMovie'))
);

const DetailCategoryPage = Loader(
  lazy(() => import('src/content/detail/DetailCategory'))
);
const DetailActorPage = Loader(
  lazy(() => import('src/content/detail/DetailActor'))
);
const DetailMoviePage = Loader(
  lazy(() => import('src/content/detail/DetailMovie'))
);

const EditCategoryPage = Loader(
  lazy(() => import('src/content/edit/EditCategory'))
);
const EditActorPage = Loader(lazy(() => import('src/content/edit/EditActor')));
const EditMoviePage = Loader(lazy(() => import('src/content/edit/EditMovie')));

const LoginPage = Loader(lazy(() => import('src/content/pages/Auth/Login')));

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
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
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
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
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
