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
import CampaignsList from './routes/campaigns';
import NewCampaign from './routes/campaigns/NewCampaign';
import ViewCampaign from './routes/campaigns/ViewCampaign';
import { t } from './i18n';

const rootRoute = new RootRoute({
  component: () => (
    <div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/studies">{t('sections.studies')}</Link>
        <Link to="/campaigns">{t('sections.campaigns')}</Link>
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

const campaignsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/campaigns',
  component: CampaignsList,
});

const newCampaignRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/campaigns/new',
  component: NewCampaign,
});

const viewCampaignRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/campaigns/$id',
  component: ViewCampaign,
});

const routeTree = rootRoute.addChildren([
  studiesRoute,
  newStudyRoute,
  editStudyRoute,
  campaignsRoute,
  newCampaignRoute,
  viewCampaignRoute,
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
