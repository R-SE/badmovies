import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false
    };
    
    this.getMovies = this.getMovies.bind(this);
    this.getFaves = this.getFaves.bind(this);
    this.saveFave = this.saveFave.bind(this);
    this.deleteFave = this.deleteFave.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }
  componentDidMount() {
    this.getMovies(12);
    this.getFaves();
  }
  getMovies(genreId) {
    axios.get('/moviesByGenre', {params: {genreId}})
    .then(data => this.setState({movies: data.data}))
    .catch(err => console.log(err))
  }
  getFaves() {
    axios.get('/faves')
    .then(data => this.setState({favorites: data.data}))
    .catch(err => console.log(err))
  }
  saveFave(movie) {
    axios.post('/faves', {movie})
    .then(() => this.getFaves())
    .catch(err => console.log(err))
  }
  deleteFave(id) {
    axios.delete('/faves', {data: {id}})
    .then(() => this.getFaves())
    .catch(err => console.log(err))
  }
  swapFavorites() {
    this.setState({
      showFaves: !this.state.showFaves
    });
  }
  render() {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header>
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} deleteFave={this.deleteFave} saveFave={this.saveFave}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

