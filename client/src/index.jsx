import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [dummyData],
      favorites: [dummyData],
      showFaves: false,
    };
    
    // you might have to do something important here!
  }

  getGenres() {
    axios.get('/genres')
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  getMovies(movieId) {
    axios.get('/moviesByGenre')
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  getFaves(movie) {
    axios.get('/faves')
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  saveFave(movie) {
    axios.post('/faves')
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  deleteFave(id) {
    axios.delete('/faves')
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  swapFavorites() {
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

let dummyData = { vote_count: 214,
    id: 59468,
    video: false,
    vote_average: 7.2,
    title: 'The Way',
    popularity: 5.218321,
    poster_path: '/k2BroLReul6LIAzcO6rdmTmcKAP.jpg',
    original_language: 'en',
    original_title: 'The Way',
    genre_ids: [ 12, 35, 18 ],
    backdrop_path: '/fAHiRloxmgoYAQajqbZHJfl51v4.jpg',
    adult: false,
    overview: 'When his son dies while hiking the famed Camino de Santiago pilgrimage route in the Pyrenees, Tom flies to France to claim the remains. Looking for insights into his estranged child’s life, he decides to complete the 500-mile mountain trek to Spain. Tom soon joins up with other travelers and realizes they’re all searching for something.',
    release_date: '2010-09-10' }