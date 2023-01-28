'use strict';
const uuid = require('uuid');

const logger = require('../utils/logger');
const filmStore = require('../models/film-store');
const accounts = require ('./accounts.js');

const filmlist = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request); 
    const filmlistId = request.params.id;
    logger.debug('Filmlist id = ' + filmlistId);
    if (loggedInUser) {
    const viewData = {
      title: 'Filmlist',
      filmlist: filmStore.getFilmlist(filmlistId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('filmlist', viewData);
    }
    else response.redirect('/');
  },
   deleteItem(request, response) {
    const filmlistId = request.params.id;
    const itemId = request.params.itemid;
    logger.debug(`Deleting Item ${itemId} from Filmlist ${filmlistId}`);
    filmStore.removeItem(filmlistId, itemId);
    response.redirect('/filmlist/' + filmlistId);
  },
  addItem(request, response) {
    const filmlistId = request.params.id;
    const filmlist = filmStore.getFilmlist(filmlistId);
    const newItem = {
      id: uuid(),
      title: request.body.title,
      director: request.body.director,
      actor: request.body.actor,
      duration: request.body.duration
    };
    filmStore.addItem(filmlistId, newItem);
    response.redirect('/filmlist/' + filmlistId);
  },
  updateItem(request, response) {
    const filmlistId = request.params.id;
    const itemId = request.params.itemid;
    logger.debug("updating item " + itemId);
    const updatedItem = {
      title: request.body.title,
      director: request.body.director,
      actor: request.body.actor,
      duration: request.body.duration
    };
    filmStore.editItem(filmlistId, itemId, updatedItem);
    response.redirect('/filmlist/' + filmlistId);
  },
};

module.exports = filmlist;