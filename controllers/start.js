'use strict';


const logger = require('../utils/logger');
const filmStore = require('../models/film-store.js');
const accounts = require ('./accounts.js');


const start = {

  
  index(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    
    if(loggedInUser){
    const films = filmStore.getAllFilms();

      let numFilms = films.length;
      let numItems = 0;
      for (let item of films) {
    numItems += item.items.length;
}
      
   
    const viewData = {
      title: 'Welcome to My App',
      totalFilms: numFilms,
    totalItems: numItems,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };

    
    response.render('start', viewData);
    }
    else response.redirect('/');
  },
};


module.exports = start;