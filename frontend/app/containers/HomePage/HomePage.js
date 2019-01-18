/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import MovieList from 'components/MovieList';
import debounce from 'lodash/debounce';
import Select from 'react-select';

import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.debouncedLoadData;
    this.defaultMovieTitle = 'rock';
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  // when component is mounted load movies with the default title
  // and set up debouncing for the data load
  componentDidMount() {
    this.props.onChangeMovieTitle(null, this.defaultMovieTitle);
    this.props.loadData(this.defaultMovieTitle);
    this.debouncedLoadData = debounce(this.props.loadData, 300);
  }
  handleInputChange(e) {
    this.props.onChangeMovieTitle(e);
    // debouncing the data load
    this.debouncedLoadData(this.props.currentMovieTitle);
  }

  render() {
    const { loading, error, movies } = this.props;
    const movieListProps = {
      loading,
      error,
      movies,
    };

    const colourStyles = {
      control: styles => ({ ...styles, backgroundColor: 'white' }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
          ...styles,
          backgroundColor: isDisabled
            ? null
            : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
          color: isDisabled
            ? '#ccc'
            : isSelected
              ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
              : data.color,
          cursor: isDisabled ? 'not-allowed' : 'default',
        };
      },
      input: styles => ({ ...styles, ...dot() }),
      placeholder: styles => ({ ...styles, ...dot() }),
      singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h2>Movie Search Boxxxx</h2>
          </section>
          <section className="centered">
            <form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="currentMovieTitle">
              Type in a movie title to look for:
                <br />
                <input
                  id="currentMovieTitle"
                  type="text"
                  placeholder="movie title"
                  value={this.props.currentMovieTitle}
                  onChange={this.handleInputChange}
                />
              </label>
            </form>
            <Select
              defaultValue={options[2]}
              label="Single select"
              options={options}
              styles={colourStyles}
            />
            <MovieList {...movieListProps} />
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  movies: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  currentMovieTitle: PropTypes.string,
  onChangeMovieTitle: PropTypes.func,
};
