import { ImageGalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const GalleryItem = ({ items, toggleModal }) => {
  return items.map(el => {
    return (
      <ImageGalleryItem
        key={el.id}
        onClick={({ target: { alt, src } }) => {
          toggleModal(alt, src);
        }}
      >
        <Image src={el.largeImageURL} alt={el.tags} />
      </ImageGalleryItem>
    );
  });
};

GalleryItem.propTypes = {
  items: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
