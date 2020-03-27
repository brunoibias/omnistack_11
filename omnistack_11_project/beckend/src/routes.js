const express = require('express')
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const { celebrate, Segments, Joi } = require('celebrate')

const routes = express.Router();

routes.post('/session', SessionController.create)

routes.get('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object()({ //verificaçao
        authorization: Joi.string().require(),
    }).unknown(),
}), ProfileController.index)

routes.get('/incidents', IncidentController.index)

routes.post('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().required(),
    })
}), IncidentController.create)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number(),
    })
}), IncidentController.delete)

module.exports = routes;