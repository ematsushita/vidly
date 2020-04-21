import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import Pagination from './pagination';
import Genres from './genres';
import paginate from '../utils/paginate';
import _ from "lodash";

class Movie extends Component {
  state = { 
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: {path: "title", order: "asc"}
   }

  componentDidMount() {
    const genres = [{_id: "", name: "All Genres"}, ...getGenres()]
    this.setState({movies: getMovies(), genres})
  }
  
  handleDelete = movie => {
    const movies = this.state.movies.filter(moviesItem => moviesItem._id !== movie._id)
    this.setState({movies})
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies})
  }

  handlePageChange = page => {
    this.setState({currentPage: page})
  }

  handleGenreSelect = genre => {
    this.setState({selectedGenre: genre, currentPage: 1})
  }

  handleSort = sortColumn => {
    this.setState({sortColumn})
  }

  getPageData = () => {
    const {pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn} = this.state;
    const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])
    const movies = paginate(sorted, currentPage, pageSize)
    return { totalCount: filteredMovies.length, data: movies}
  }

  render() { 
    const {length: count} = this.state.movies;
    const {pageSize, currentPage, sortColumn} = this.state;

    const {totalCount, data: movies} = this.getPageData();

    const message = count === 0 ? "There are no movies in the database" : `Showing ${totalCount} movie(s) in the database`
    
    return ( 
      <div className="row">
        <div className="col-3">
          <Genres items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre}/>
        </div>
        <div className="col">
          <p>{message}</p>
          <MoviesTable onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} movies={movies} sortColumn={sortColumn}/>
          <Pagination currentPage={currentPage} itemsCount={totalCount} pageSize={pageSize} onPageChange={this.handlePageChange}/>
        </div>
      </div>
     );
  }
}
 
export default Movie;