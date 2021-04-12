import React, { Component } from 'react';
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
  }
  // componentDidUpdate() {
  //   // console.log('Я обновился Cast!');
  //   // const { cast } = this.state;
  //   // console.log(cast);
  // }
  // componentWillUnmount() {
  //   this.setState({
  //     cast: [],
  //     error: false,
  //   });
  // }
  getCastOfMovie = () => {
    const { movieId } = this.props.match.params;
    // console.log(movieId);
    fetchCastOfMovie(movieId)
      .then(result => {
        // console.log(result);
        this.setState({
          cast: result.cast,
        });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };
  render() {
    const { cast } = this.state;
    // console.log(cast);
    if (cast.length > 0) {
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
    } else {
      return <p>We don't have cast for this movie.</p>;
    }
  }
}
export default Cast;
