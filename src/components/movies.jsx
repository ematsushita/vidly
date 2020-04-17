import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './like';

class Movie extends Component {
  state = { 
    movies: getMovies()
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

  renderMovies() {
    if (this.state.movies.length === 0) {
      return <p>There are no movies in the database</p>
    } else if (this.state.movies.length === 1) {
      return <p>Showing 1 movie in the database</p>
    } else {
      return <p>Showing {this.state.movies.length} movies in the database</p>
    }
  }

  renderMoviesTable() {
    return (
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
          {this.state.movies.map(movie => (
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
    )
  }

  render() { 
    return ( 
      <>
        {this.renderMovies()}
        {this.state.movies.length !== 0 && this.renderMoviesTable()}
      </>
     );
  }
}
 
export default Movie;