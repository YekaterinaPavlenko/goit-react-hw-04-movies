import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { fetchReviewsOfMovie } from '../../services/movieApi/movieApi';
import rs from './Reviews.module.css';
class Reviews extends Component {
  state = {
    reviews: [],
    error: false,
  };
  componentDidMount() {
    // console.log('Я родился Reviews!');
    this.getReviewsOfMovie();
    // console.log(this.state);
  }
  componentDidUpdate() {
    // console.log('Я обновился Reviews!');
    // const { cast } = this.state;
    // console.log(cast);
  }
  componentWillUnmount() {
    this.setState({
      reviews: [],
      error: false,
      // fetchLength: result.length,
    });
  }
  getReviewsOfMovie = (prevProps, prevState) => {
    const { movieId } = this.props.match.params;
    // console.log(movieId);
    // this.setState({ isLoading: true });
    fetchReviewsOfMovie(movieId)
      .then(result => {
        // console.log(result);
        this.setState({
          reviews: result.results,
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
    const { reviews } = this.state;
    console.log(reviews);
    if (reviews.length > 0) {
      return (
        <div>
          <h3>Reviews</h3>
          <ul className={rs.reviewsList}>
            {reviews.map(el => {
              // console.log(el);
              const { author, content, id } = el;
              return (
                <li key={id} className={rs.reviewsItem}>
                  <h3>{author}</h3>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <p>We don't have any reviews for this movie.</p>;
    }
  }
}
export default Reviews;
