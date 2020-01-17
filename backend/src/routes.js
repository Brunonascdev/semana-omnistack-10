const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index);
// aqui \/
// routes.get('/delete', DevController.delete);
// routes.post('/update', DevController.update);

module.exports = routes;