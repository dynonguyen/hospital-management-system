const systemApi = require('express').Router();
const systemController = require('../controllers/system.controller');

systemApi.get('/dash', systemController.getStatisticDash);

module.exports = systemApi;
