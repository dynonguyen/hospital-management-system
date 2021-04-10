const systemApi = require('express').Router();
const systemController = require('../controllers/system.controller');

systemApi.get('/dash', systemController.getStatisticDash);

systemApi.get('/user-list', systemController.getUserList);

systemApi.get('/user', systemController.getDetailUser);

systemApi.get('/sys-init', systemController.getSystemInitVal);

systemApi.delete('/user', systemController.delUser);

systemApi.put('/user/pw', systemController.putChangePassword);

systemApi.post('/create-user', systemController.postCreateUser);

module.exports = systemApi;
