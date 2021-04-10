const systemApi = require('express').Router();
const systemController = require('../controllers/system.controller');

systemApi.get('/dash', systemController.getStatisticDash);

systemApi.get('/user-list', systemController.getUserList);

systemApi.get('/user', systemController.getDetailUser);

systemApi.get('/sys-init', systemController.getSystemInitVal);

systemApi.get('/user-role-priv', systemController.getUserRolePriv);

systemApi.get('/brief-user', systemController.getBriefUserInfo);

systemApi.delete('/user', systemController.delUser);

systemApi.put('/user/pw', systemController.putChangePassword);

systemApi.post('/create-user', systemController.postCreateUser);

systemApi.post('/create-role', systemController.postCreateRole);

module.exports = systemApi;
