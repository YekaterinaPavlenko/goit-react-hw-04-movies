import React from 'react';
import PropTypes from 'prop-types';
const Notifications = ({ fetchLength, galleryLength, searchQuery, error }) => {
  if (error) {
    // console.log(error);
    return <p>Oops! Something wrong! Request error!</p>;
  } else if (!error) {
    if (!searchQuery) {
      return <p>Please enter image name!</p>;
    } else if (searchQuery) {
      if (!fetchLength && !galleryLength) {
        return <p>Image not found. Please check your request and try again!</p>;
      } else if (fetchLength < 12 && galleryLength > 0) {
        return <p>These are all the images we found!</p>;
      }
    }
  }

  return <p></p>;
};
Notifications.defaultProps = {
  fetchLength: 0,
  galleryLength: 0,
  searchQuery: '',
  error: false,
};
Notifications.propTypes = {
  fetchLength: PropTypes.number,
  galleryLength: PropTypes.number,
  searchQuery: PropTypes.string,
  error: PropTypes.bool,
};
export default Notifications;
