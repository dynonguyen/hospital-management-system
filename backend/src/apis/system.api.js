const systemApi = require('express').Router();
const systemController = require('../controllers/system.controller');

systemApi.get('/dash', systemController.getStatisticDash);

systemApi.get('/user-list', systemController.getUserList);

module.exports = systemApi;
