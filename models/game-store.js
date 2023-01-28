'use strict';

const gameStore = {

  game: require('./game-store.json').game,

  getAllGames() {
    return this.game;
  },

};

module.exports = gameStore;