import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './like';
import Pagination from './pagination';
import Genres from './genres';
import paginate from '../utils/paginate';

class Movie extends Component {
  state = { 
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: ""
   }

  componentDidMount() {
    const genres = [{name: "All Genres"}, ...getGenres()]
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

  render() { 
    const {length: count} = this.state.movies;
    const {pageSize, currentPage, movies: allMovies, selectedGenre} = this.state;
    const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const movies = paginate(filteredMovies, currentPage, pageSize)
    const message = count === 0 ? "There are no movies in the database" : `Showing ${filteredMovies.length} movie(s) in the database`

    return ( 
      <div className="row">
        <div className="col-3">
          <Genres items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre}/>
        </div>
        <div className="col">
          <p>{message}</p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <th scope="row">{movie.title}</th>
                  <td>{movie.genre.name}</td><td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                  <td>
                    <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination currentPage={this.state.currentPage} itemsCount={filteredMovies.length} pageSize={this.state.pageSize} onPageChange={this.handlePageChange}/>
        </div>
      </div>
     );
  }
}
 
export default Movie;