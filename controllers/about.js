'use strict';


const logger = require('../utils/logger');

// create about object
const about = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    
    logger.info('about rendering');
    
    
    const viewData = {
      title: 'About Me',
    };
    
    
    response.render('about', viewData);
  },
};


module.exports = about;