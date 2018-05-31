const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const con = mysql.createConnection(mysqlConfig);

const getAllFavorites = (callback) => {
  let query = 'SELECT * from favorites';
  con.query(query, (err, data) => {
    if (err) callback(err);
    else callback(null, data);
  })
};

const saveFavorite = (movie, callback) => {
  let query = 'INSERT INTO favorites (id, title, vote_average, vote_count, poster_path, backdrop_path, release_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
  let {id, title, vote_average, vote_count, poster_path, backdrop_path, release_date} = movie;
  let params = [id, title, vote_average, vote_count, poster_path, backdrop_path, release_date];
  con.query(query, params, (err, data) => {
    if (err) callback(err);
    else callback(null, data);
  });
};

const deleteFavorite = (id, callback) => {
  let query = 'DELETE FROM favorites WHERE id=id'
  con.query(query, (err, data) => {
    if (err) callback(err);
    else callback(null, data);
  })
};


module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};

///////////////////////////////////////

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

// saveFavorite(dummyData, (err, data) => console.log(err, data));
// deleteFavorite(59468, (err, data) => console.log(err, data));