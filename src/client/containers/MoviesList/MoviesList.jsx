import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withDialogContext } from 'utils/dialog';

import Waypoint from 'react-waypoint';
import classNames from 'classnames';

import actionsMovies from 'actions/movies';
import actionsMovieDetails from 'actions/movieDetails';

import ListControls from 'components/ListControls/ListControls';
import MovieGridItem from 'components/MovieGridItem/MovieGridItem';
import MovieListItem from 'components/MovieListItem/MovieListItem';
import Loading from 'components/Loading/Loading';
import Video from 'components/Video/Video';

import { getParam, getSection } from 'utils/url';

import styles from './MoviesList.scss';

class MoviesList extends Component {
  state = {
    gridView: true,
    loading: false,
    trailer: null,
    query: null,
    movie: null,
  };

  componentDidMount = () => {
    const { removeMovies } = this.props;

    removeMovies();
  }

  componentWillReceiveProps(props) {
    const { gridView, trailer, query } = this.state;
    const {
      movie,
      match,
      openDialog,
      closeDialog,
      removeMovies,
    } = this.props;
    const trailerParam = getParam('trailer');
    const movieParam = getParam('movie');
    const gridViewParam = getParam('view') !== 'list';
    const queryParam = getParam('query');

    if (movie.id !== +movieParam) {
      this.setDetailsMovie(props, +movieParam);
    }

    if (gridView !== gridViewParam) {
      this.setState({ gridView: gridViewParam });
    }

    if (match.params.genreId !== props.match.params.genreId) {
      removeMovies();
    }

    if (trailer !== trailerParam) {
      this.setState({ trailer: trailerParam }, () => {
        if (trailer) {
          openDialog(<Video id={ +trailer }/>);
        } else {
          closeDialog();
        }
      });
    }

    if (query !== queryParam) {
      this.setState({ query: queryParam }, () => { removeMovies(); });
    }
  }

  setDetailsMovie = (props, id) => {
    const { movies, setMovieDetails } = this.props;
    const movie = props.movies.find(_movie => id === _movie.id);

    if (id && id !== +movie.id) {
      window.scroll(0, 0);
    }

    setMovieDetails(movie, { movie: movies[0], id });
  }

  enterEndOfList = () => {
    const {
      match,
      listLoaded,
      loadMoviesForSearch,
      loadMoviesForGenre,
      loadMoviesForSections,
    } = this.props;

    if (!listLoaded) {
      const section = getSection(true);
      this.setState({ loading: true });

      switch (section) {
        case '/search': {
          const query = getParam('query');

          loadMoviesForSearch(query);
          break;
        }
        case '/genre': {
          const { genreId } = match.params;

          loadMoviesForGenre(+genreId);
          break;
        }
        default: {
          const map = {
            '/': 'popular',
            '/trading': 'popular',
            '/top-rated': 'top_rated',
            '/coming-soon': 'upcoming',
          };
          const type = map[section];

          loadMoviesForSections(type);
          break;
        }
      }
    }
  }

  leaveEndOfList = () => {
    this.setState({ loading: false });
  }

  loadingRender = () => {
    const { listLoaded, movies } = this.props;

    if (listLoaded) {
      if (movies.length) {
        return <div className={ styles.loaded }>Movies are loaded</div>;
      }

      return <div className={ styles.notFound }>Movies are not found</div>;
    }

    return <Loading/>;
  }

  render() {
    const {
      match,
      genres,
      listLoaded,
      movies,
    } = this.props;
    const { gridView } = this.state;
    const ListItem = gridView ? MovieGridItem : MovieListItem;
    const viewClasses = classNames({ [styles.grid]: gridView }, { [styles.list]: !gridView });

    return (
      <div className={ styles.moviesListWrapper }>
        <div className={ styles.moviesList } onChange={ this.genreChangeHandler }>
          <ListControls match={ match } genres={ genres } gridView={ gridView }/>
          <div className={ viewClasses }>
            { movies.map((_movie, index) => <ListItem key={ index } movie={ _movie }/>) }
          </div>
          { this.loadingRender() }
          { !listLoaded && <Waypoint
            onEnter={ this.enterEndOfList }
            onLeave={ this.leaveEndOfList }
          /> }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadMoviesForSections: type => dispatch(actionsMovies.addMoviesForSections(type)),
  loadMoviesForGenre: genreId => dispatch(actionsMovies.addMoviesForGenre(genreId)),
  loadMoviesForSearch: query => dispatch(actionsMovies.addMoviesForSearch(query)),
  removeMovies: () => dispatch(actionsMovies.remove()),
  setMovieDetails: (movie, defaultValue) => (
    dispatch(actionsMovieDetails.setMovie(movie, defaultValue))
  ),
});

const mapStateToProps = state => ({
  movies: state.movies.list,
  listLoaded: state.movies.loaded,
  movie: state.movieDetails,
  genres: state.genres,
  store: state,
});

export default withDialogContext(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MoviesList),
);