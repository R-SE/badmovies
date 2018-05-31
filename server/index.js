var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();

var {getGenres, getMovies} = require('./apiHelpers.js');
var {getAllFavorites, saveFavorite, deleteFavorite} = require('./database.js');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/moviesByGenre', (req, res) => {
    let genreId = req.query.genreId;
    getMovies(genreId)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.get('/genres', (req, res) => {
    getGenres().then(data => res.send(data)).catch(err => res.send(err));
});

app.get('/faves', (req, res) => {
    getAllFavorites();
});

app.post('/faves', (req, res) => {
    saveFavorite()
});

app.delete('/faves', (req, res) => {
    deleteFavorite()
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
