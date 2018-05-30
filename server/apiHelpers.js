
const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../server/config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover

// Don't forget to export your functions and require them within your server file

const getGenres = () => {
    return axios.get('https://api.themoviedb.org/3/genre/movie/list',
    {params: {language: 'en-US', api_key: API_KEY }})
    .then(data => data.data.genres)
}

const getMovies = (genreId) => {
    let params = {language: 'en-US', api_key: API_KEY, 'vote_count.gte': 100, sort_by: 'popularity.asc', with_genres: genreId};
    return axios.get('https://api.themoviedb.org/3/discover/movie', {params})
    .then(data => data.data.results)
}

/*testing*/
// getGenres()
// .then((genres) => console.log(genres))
// .catch(err => console.log('errored: ', err));

getMovies(12)
.then((genres) => console.log(genres))
.catch(err => console.log('errored: ', err));


module.exports.getGenres = getGenres;
module.exports.getMovies = getMovies;