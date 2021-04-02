import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/movieApi/movieApi';
import hps from '../HomePage/HomePage.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Searchbar from '../../components/Searchbar/Searchbar';
import Button from '../../components/Button/Button';

class MoviesPage extends Component {
  state = {
    movies: [],
    page: 1,
    query: '',
    error: false,
    fetchLength: 0,
    isLoading: false,
  };
  componentDidMount() {
    // console.log('Я родился MoviesPage!');
    const searchQuery = this.props.location.search;
    const query = searchQuery.slice(7);
    // console.log(query);

    if (query) {
      this.setState({ query: query, page: 1 });
    }
    // console.log(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('Я обновился MoviesPage!');
    // console.log(this.state);

    const { query, page } = this.state;
    if (query !== prevState.query && query !== '') {
      this.getMoviesByQuery(query);
    } else if (query === prevState.query && page !== prevState.page) {
      this.getMoviesByQuery(query);
    }
  }

  // componentWillUnmount() {}

  getQueryByForm = ({ query }) => {
    // console.log(query);
    query && this.setState({ query: query, page: 1 });
    // console.log('this.props.location', this.props.location);
    this.props.history.push({
      // pathname: this.props.location.pathname,
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  getMoviesByQuery = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    fetchMoviesByQuery(query, page)
      .then(({ results }) => {
        // console.log(results);
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
          fetchLength: results.length,
        }));
      })
      .catch(error => {
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };
  setNewPage = e => {
    e.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { movies, isLoading, fetchLength } = this.state;
    // console.log(this.props.match.url);
    const { location } = this.props;
    return (
      <div>
        <Searchbar onSubmit={this.getQueryByForm} />
        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#3f51b5"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        <ul className={hps.movieList}>
          {movies &&
            movies.map(movie => {
              // console.log(movie.id);
              return (
                <li className={hps.movieItem} key={movie.id}>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/${movie.id}`,
                      state: { from: location },
                    }}
                  >
                    {movie.title}
                  </Link>
                </li>
              );
            })}
        </ul>

        {fetchLength === 20 && !isLoading && (
          <Button getNewPage={this.setNewPage} />
        )}
      </div>
    );
  }
}
// MoviesPage.propTypes = {
//   gallery: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//     }),
//   ).isRequired,
// };
export default MoviesPage;
