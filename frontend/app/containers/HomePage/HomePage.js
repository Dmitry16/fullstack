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
      control: styles => ({ ...styles, backgroundColor: 'white',
       width: '150px', textOverflow: 'ellipsis',
       whiteSpace: 'nowrap',
       overflow: 'hidden',
     }),
      input: styles => ({ ...styles }),
      placeholder: styles => ({ ...styles }),
      singleValue: (styles, { data }) => ({ ...styles, color: 'steelblue' })
    };

    const options = [
      { value: 'chocolate', label: 'Chocolate bla bla bla', color: 'brown' },
      { value: 'strawberry', label: 'Strawberry bla bla bla', color: 'red' },
      { value: 'vanilla', label: 'Vanilla bla bla bla', color: 'darkorange' }
    ]

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h2>Movie Search Box</h2>
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
