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
    getAllFavorites((err, data) => {
        if (err) res.send(err)
        else res.send(data);
    })
});

app.post('/faves', (req, res) => {
    let movie = req.body.movie;
    // console.log('faves route post', movie)
    saveFavorite(movie, (err, data) => {
        if (err) res.send('already saved')
        else res.status(200).send(data);
    });
});

app.delete('/faves', (req, res) => {
    // console.log('deleting', req.query, req.data, req.body, req);
    let movieId = req.body.id;
    console.log(movieId);
    deleteFavorite(movieId, (err, data) => {
        if (err) res.send('already deleted')
        else res.status(200).send(data);
    })
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
