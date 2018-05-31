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
  }
  componentDidMount() {
    this.getGenres();
  }
  getGenres() {
    axios.get('/genres')
    .then(data => this.setState({genres: data.data}))
    // .then(data => console.log(this.state))
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        <select>
          {this.state.genres.map(genre => <option key={genre.id} value={genre.name}>{genre.name}</option>)}
        </select>
        <br/><br/>

        <button onClick={() => this.props.getMovies(this.state.currentId)}>Search</button>

      </div>
    );
  }
}

export default Search;