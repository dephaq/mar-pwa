import React from 'react';
import {
  Router,
  Route,
  RootRoute,
  Outlet,
  Link,
  createHashHistory,
} from '@tanstack/react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Studies from './pages/Studies';
import Rewards from './pages/Rewards';
import Support from './pages/Support';
import Privacy from './pages/Privacy';
import Consent from './pages/Consent';

const rootRoute = new RootRoute({
  component: () => (
    <div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/home">Главная</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/studies">Исследования</Link>
        <Link to="/rewards">Награды</Link>
        <Link to="/support">Поддержка</Link>
      </nav>
      <Outlet />
    </div>
  ),
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: Home,
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});

const studiesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/studies',
  component: Studies,
});

const rewardsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/rewards',
  component: Rewards,
});

const supportRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/support',
  component: Support,
});

const privacyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/legal/privacy',
  component: Privacy,
});

const consentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/legal/consent',
  component: Consent,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  profileRoute,
  studiesRoute,
  rewardsRoute,
  supportRoute,
  privacyRoute,
  consentRoute,
]);

export const router = new Router({
  routeTree,
  history: createHashHistory(),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
