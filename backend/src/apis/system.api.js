const systemApi = require('express').Router();
const systemController = require('../controllers/system.controller');

systemApi.get('/dash', systemController.getStatisticDash);

systemApi.get('/user-list', systemController.getUserList);

systemApi.get('/user', systemController.getDetailUser);

systemApi.delete('/user', systemController.delUser);

systemApi.put('/user/pw', systemController.putChangePassword);

module.exports = systemApi;
