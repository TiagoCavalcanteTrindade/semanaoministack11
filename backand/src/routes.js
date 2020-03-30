const express = require('express');
const {celebrate, Segments,	Joi} = require('celebrate')
const routes = express.Router();
const ongController = require('./controllers/ongController');
const incidentsController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

// rota, recurso
routes.post('/sessions', celebrate({
	[Segments.BODY]: Joi.object().keys({
		id: Joi.string().required().length(8)
	})
}), sessionController.create);

routes.get('/ongs', ongController.index);
routes.post('/ongs', celebrate({
	[Segments.BODY]: Joi.object().keys({
		nome: Joi.string().required(),
		email: Joi.string().required().email(),
		number: Joi.string().required().min(11).max(14),
		city: Joi.string().required(),
		uf: Joi.string().length(2)
	})
}), ongController.create);

routes.get('/profile', celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required().length(8)
	}).unknown()
}), profileController.index)

routes.get('/incidents', celebrate({
	[Segments.QUERY]: Joi.object().keys({
		page: Joi.number().min(1)
	})
}), incidentsController.index);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required().min(1)
	})
}), incidentsController.delete);

module.exports = routes;