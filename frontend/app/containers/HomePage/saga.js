/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_MOVIES } from 'containers/App/constants';
import { moviesLoaded, movieLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectMovieTitle } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getMovies() {
  // Select username from store
  const username = yield select(makeSelectMovieTitle());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call the request helper (see 'utils/request')
    const movies = yield call(request, requestURL);
    yield put(moviesLoaded(movies, currentMovieTitle));
  } catch (err) {
    yield put(movieLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_MOVIES actions and calls getMovies when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_MOVIES, getMovies);
}
