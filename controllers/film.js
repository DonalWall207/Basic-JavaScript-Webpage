'use strict';
const uuid = require('uuid');

const logger = require('../utils/logger');
const filmStore = require('../models/film-store.js');
const accounts = require ('./accounts.js');


const film = {

  
 index(request, response) {
    logger.info('film rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Film List',
      films: filmStore.getUserFilms(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    logger.info('about to render' + viewData.films);
    response.render('film', viewData);
    }
    else response.redirect('/');
  },
  deleteFilm(request, response) {
    const filmId = request.params.id;
    logger.debug(`Deleting Film ${filmId}`);
    filmStore.removeFilm(filmId);
    response.redirect('/film');
  },
  
 addFilm(request, response) {
   const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newFilm = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      items: [],
    };
    logger.debug('Creating a new Film list' + newFilm);
    filmStore.addFilm(newFilm, function(){
      response.redirect('/film');                                        
    });
  },
};


module.exports = film;