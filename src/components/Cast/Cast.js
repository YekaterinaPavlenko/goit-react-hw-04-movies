import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { fetchCastOfMovie } from '../../services/movieApi/movieApi';
import cs from './Cast.module.css';
class Cast extends Component {
  state = {
    cast: [],
    error: false,
  };
  componentDidMount() {
    // console.log('Я родился Cast!');
    this.getCastOfMovie();
    // console.log(this.state);
  }
  componentDidUpdate() {
    // console.log('Я обновился Cast!');
    // const { cast } = this.state;
    // console.log(cast);
  }
  componentWillUnmount() {
    this.setState({
      cast: [],
      error: false,
      // fetchLength: result.length,
    });
  }
  getCastOfMovie = (prevProps, prevState) => {
    const { movieId } = this.props.match.params;
    // console.log(movieId);
    // this.setState({ isLoading: true });
    fetchCastOfMovie(movieId)
      .then(result => {
        // console.log(result);
        this.setState({
          cast: result.cast,
          // fetchLength: result.length,
        });
      })
      .catch(error => {
        this.setState({ error: true });
      })
      .finally(() => {
        // this.setState({ isLoading: false });
        // window.scrollTo({
        //   top: document.documentElement.scrollHeight,
        //   behavior: 'smooth',
        // });
      });
    // }
  };
  render() {
    // console.log(this.state);
    const { cast } = this.state;
    // console.log(cast);
    return (
      <div>
        <h3>Cast</h3>
        <ul className={cs.castList}>
          {cast &&
            cast.map(el => {
              // console.log(el);
              const { id, name, profile_path, character } = el;
              return (
                <li key={id} className={cs.castItem}>
                  {profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${profile_path}`}
                      alt={name}
                      className={cs.castImage}
                    />
                  )}

                  <h3>{name}</h3>
                  <p>Character: {character}</p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default Cast;
