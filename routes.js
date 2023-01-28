'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const film = require('./controllers/film.js');
const game = require('./controllers/game.js');
const start = require('./controllers/start.js');
const filmlist = require('./controllers/filmlist.js')
const about = require('./controllers/about.js');
const accounts = require ('./controllers/accounts.js');


// connect routes to controllers
router.get('/start', start.index);
router.get('/film', film.index);
router.get('/game', game.index);
router.get('/about', about.index);
router.get('/filmlist/:id', filmlist.index);


router.get('/filmlist/:id/deleteItem/:itemid', filmlist.deleteItem);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/filmlist/:id/additem', filmlist.addItem);
router.post('/filmlist/:id/updateitem/:itemid', filmlist.updateItem);

router.get('/film/deletefilm/:filmid', film.deleteFilm);
router.post('/film/addfilm', film.addFilm);

// export router module
module.exports = router;