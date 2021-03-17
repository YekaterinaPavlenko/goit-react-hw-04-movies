import React, { Component } from 'react';
import sbs from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    query: '',
  };
  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSubmit({ query });
    this.setState({ query: '' });
  };
  render() {
    const { query } = this.state;
    // console.log(query);
    return (
      <header className={sbs.Searchbar}>
        <form className={sbs.SearchForm} onSubmit={this.handleSubmit}>
          <input
            className={sbs.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            name="query"
            value={query}
          />
          <button type="submit" className={sbs.button}>
            <span className={sbs.button_label}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
