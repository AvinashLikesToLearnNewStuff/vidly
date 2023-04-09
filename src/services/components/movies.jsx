// import "./App.css";
import React, { Component } from 'react';
import { getMovies } from "../../services/fakeMovieService";
import Like from '../../common/like';

class Movies extends Component {
  state = {
    movies: getMovies(),
    count: getMovies().length,
  };
  handleLike=(movie)=>{
  const movies = [...this.state.movies];
  const index = movies.indexOf(movie);
  movies[index]={...movies[index]};
  movies[index].liked= !movies[index].liked;
  this.setState({movies});
  }

  handleDecrement = () => {
    this.setState(this.state.movies.splice(0, 1));
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <main className="container">
        <p>we have {this.state.count} movies</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">genre</th>
              <th scope="col">stock</th>
              <th scope="col">rate</th>
        <th/>
        <th/>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr>
                <td> {movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like liked={movie.liked} onClick={()=>this.handleLike(movie)}/></td>
                <td>
                  <button
                    onClick={this.handleDecrement}
                    className="btn-primary"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
  }
}

export default Movies;
