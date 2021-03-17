import React from 'react';
import gis from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ elem, getImgForModal }) => {
  // console.log(elem);
  const { webformatURL, tags } = elem;
  // console.log(largeImageURL);
  return (
    <li className={gis.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={gis.image}
        onClick={() => getImgForModal({ elem })}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  elem: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  getImgForModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
