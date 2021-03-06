import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick(movie) {
    if (this.props.showFaves) this.props.deleteFave(movie.id);
    else this.props.saveFave(movie);
  }
  render() {
    let {movies} = this.props;
    return (
    <ul className="movies">
      {movies.map(movie => (
          <li key={movie.id} className="movie_item" onClick={() => this.handleClick(movie)}>
            <img src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path} />
            <div className="movie_description">
              <h2>{movie.title}</h2>
              <section className="movie_details">
                <div className="movie_year">
                  <span className="title">Year</span>
                  <span>{movie.release_date.slice(0, 4)}</span>
                </div>
                <div className="movie_rating">
                  <span className="title">Rating</span>
                  <span>{movie.vote_average}</span>
                </div>
              </section>
            </div>
          </li>
          )
        )}
      </ul>
    )
  }
}

export default Movies;