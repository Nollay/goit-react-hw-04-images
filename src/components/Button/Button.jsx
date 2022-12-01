import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';
export const LoadMore = ({handleLoadMore}) => {
    return (
      
    <LoadMoreBtn type="button" onClick={handleLoadMore}>
      Load more
    </LoadMoreBtn>
  );
};
LoadMore.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};