// import "./App.css";
import React, { Component } from 'react';
import { getMovies } from "../../services/fakeMovieService";
import Like from '../../common/like';
import Pagination from './pagination';
import { indexOf } from 'lodash';
import {paginate} from '../../utils/paginate';

class Movies extends Component {
  state = {
    movies: getMovies(),
    count: getMovies().length,
      currentPage:1,
    pageSize: 4,
  };
  handleLike=(movie)=>{
  const movies = [...this.state.movies];
  const index = movies.indexOf(movie);
  movies[index]={...movies[index]};
  movies[index].liked= !movies[index].liked;
  this.setState({movies});
  }

  handlePageChange=page=>{
    this.setState({currentPage:page});
  }

  handleDecrement = () => {
    this.setState(this.state.movies.splice(0, 1));
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    const{length:count}= this.state.movies;  
    const{pageSize,currentPage,movies:allMovies}=this.state;
      if (count===0) return <p>there are no movies in database</p>
    const movies = paginate(allMovies,currentPage, pageSize);

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
            {movies.map((movie) => (
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
        <Pagination onPageChange={this.handlePageChange}
        currentPage = {currentPage}
        itemsCount = {this.state.movies.length} pageSize = {pageSize}/>

      </main>
    );
  }
}

export default Movies;
