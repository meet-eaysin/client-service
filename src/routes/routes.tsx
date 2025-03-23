// src/routes/index.tsx
import PageNotFound from '@/components/not-found/page-not-found';
import { RouteObject } from 'react-router-dom';
import privateRoutes from './private-route';
import publicRoutes from './public-route';

const routes: RouteObject[] = [
  ...privateRoutes,
  ...publicRoutes,
  {
    path: '*',
    element: <PageNotFound />,
  },
];

export default routes;
