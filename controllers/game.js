'use strict';

const logger = require('../utils/logger');
const gameStore = require('../models/game-store.js');
const accounts = require ('./accounts.js');

const game = {

  index(request, response) {
 const loggedInUser = accounts.getCurrentUser(request);
    // display confirmation message in log
    logger.info('about rendering');
   if (loggedInUser) {
    const viewData = {
      title: 'My App games',
      game: gameStore.getAllGames(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };

    response.render('game', viewData);
   }
  },
};

module.exports = game;