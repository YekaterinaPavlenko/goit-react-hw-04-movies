import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendingMovies } from '../../services/movieApi/movieApi';
import hps from './HomePage.module.css';

class HomePage extends Component {
  state = {
    movies: [],
    page: 1,
    error: false,
  };
  componentDidMount() {
    // console.log('Я родился!');
    this.getTrendingMovies();
    // console.log(this.state);
  }
  // componentDidUpdate() {
  //   console.log('Я обновился!');
  //   // const { movies } = this.state;
  //   // console.log(movies);
  // }
  // componentWillUnmount() {
  //   console.log('Я умер!');
  // }
  getTrendingMovies = (prevProps, prevState) => {
    const { page } = this.state;

    // this.setState({ isLoading: true });
    fetchTrendingMovies(page)
      .then(({ results }) => {
        // console.log(results);
        this.setState({
          movies: results,
          // fetchLength: result.length,
        });
      })
      .catch(error => {
        this.setState({ error: true });
      })
      .finally(() => {
        // this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
    // }
  };
  render() {
    const { movies } = this.state;
    const { location } = this.props;
    console.log(location);
    return (
      <div>
        <h1>Trending today</h1>
        <ul className={hps.movieList}>
          {movies &&
            movies.map(movie => {
              // console.log(location);
              return (
                <li className={hps.movieItem} key={movie.id}>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}movies/${movie.id}`,
                      state: { from: location },
                    }}
                  >
                    {movie.title}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default HomePage;
