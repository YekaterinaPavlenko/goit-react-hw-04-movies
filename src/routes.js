// import { lazy } from 'react';
// import { v4 as uuid } from 'uuid';
const routes = {
  home: '/',
  movies: '/movies',
  details: '/movies/:movieId',
};
// const routes = [
//   {
//     key: uuid(),
//     exact: true,
//     path: '/',
//     component: lazy(() => import('./pages/HomePage/HomePage')),
//   },
//   {
//     key: uuid(),
//     exact: true,
//     path: '/movies',
//     component: lazy(() => import('./pages/MoviesPage/MoviesPage')),
//   },
//   {
//     key: uuid(),
//     exact: true,
//     path: '/movies/:movieId',
//     component: lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage')),
//   },
// ];

export default routes;
