import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      currentId: 12,
    };
    this.getGenres = this.getGenres.bind(this);
    this.updateGenre = this.updateGenre.bind(this);
  }
  componentDidMount() {
    this.getGenres();
  }
  getGenres() {
    axios.get('/genres')
    .then(data => this.setState({genres: data.data}))
    .catch(err => console.log(err))
  }
  updateGenre(e) {
    this.setState({currentId: e.target.value});
  }
  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        <select onChange={e => this.updateGenre(e)}>
          {this.state.genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
        </select>
        <br/><br/>

        <button onClick={() => this.props.getMovies(this.state.currentId)}>Search</button>

      </div>
    );
  }
}

export default Search;