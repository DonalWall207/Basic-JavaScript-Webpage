'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const filmStore = {

  store: new JsonStore('./models/film-store.json', { filmCollection: [] }),
  collection: 'filmCollection',

  getAllFilms() {
    return this.store.findAll(this.collection);
  },

  getFilmlist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addFilm(filmlist, response) {
   filmlist.picture.mv('tempimage', err => {
       if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            filmlist.picture = result.url;
            response();
          });
       }
   });
   this.store.add(this.collection, filmlist);
},

  removeFilm(id) {
    const film = this.getFilm(id);
    this.store.remove(this.collection, film);
  },

  removeAllFilms() {
    this.store.removeAll(this.collection);
  },

  addItem(id, item) {
    const filmlist = this.getFilmlist(id);
    filmlist.items.push(item);
  },
  getUserFilms(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  removeItem(id, itemId) {
    const filmlist = this.getFilmlist(id);
    const items = filmlist.items;
    _.remove(items, { id: itemId});
  },
  editItem(id, itemId, updatedItem) {
    const filmlist = this.getFilmlist(id);
    const items = filmlist.items;
    const index = items.findIndex(item => item.id === itemId);
    items[index].title = updatedItem.title;
    items[index].director = updatedItem.director;
    items[index].actor = updatedItem.actor;
    items[index].duration = updatedItem.duration;
  }
};

module.exports = filmStore;