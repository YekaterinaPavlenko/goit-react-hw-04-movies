import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
// import HomePage from './pages/HomePage/HomePage';
// import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
// import MoviesPage from './pages/MoviesPage/MoviesPage';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import routes from './routes';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "details-page" */
  ),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const App = () => {
  return (
    <div>
      <Header />
      <Suspense
        fallback={
          <Loader
            type="ThreeDots"
            color="#3f51b5"
            height={100}
            width={100}
            timeout={3000}
          />
        }
      >
        <Switch>
          {/* {routes.map(route => {
            console.log(route);
            return <Route {...route} />;
          })} */}
          <Route exact path={routes.home} component={HomePage} />
          <Route
            path={routes.details}
            render={props => {
              // console.log(props);
              return <MovieDetailsPage {...props} />;
            }}
          />
          <Route
            path={routes.movies}
            render={props => <MoviesPage {...props} />}
          />
          <Route component={HomePage} />
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
