import { Header, Form, SearchButton, SearchInput } from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ handleSubmit }) => {
  // const oonSubmit = e => {
  //   e.preventDefault();
  //   const query = e.target.elements.query;
  //   handleSubmit(query.value);
  //   query.value = '';
  // };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <span>search</span>
        </SearchButton>

        <SearchInput
          name="query"
          type="text"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};
Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
