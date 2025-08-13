import React from 'react';
import {
  Router,
  Route,
  RootRoute,
  Outlet,
  Link,
  createHashHistory,
} from '@tanstack/react-router';
import StudiesList from './routes/studies';
import NewStudy from './routes/studies/NewStudy';
import EditStudy from './routes/studies/EditStudy';

const rootRoute = new RootRoute({
  component: () => (
    <div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/studies">Исследования</Link>
      </nav>
      <Outlet />
    </div>
  ),
});

const studiesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/studies',
  component: StudiesList,
});

const newStudyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/studies/new',
  component: NewStudy,
});

const editStudyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/studies/$id/edit',
  component: EditStudy,
});

const routeTree = rootRoute.addChildren([
  studiesRoute,
  newStudyRoute,
  editStudyRoute,
]);

export const router = new Router({
  routeTree,
  history: createHashHistory(),
  basepath: '/admin',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
