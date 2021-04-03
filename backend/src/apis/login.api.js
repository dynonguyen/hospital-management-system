const loginApi = require('express').Router();
const loginController = require('../controllers/login.controller');
const authMiddleware = require('../middlewares/auth.middleware');

loginApi.post('/', loginController.postLogin);

loginApi.post('/logout', loginController.postLogout);

loginApi.get('/', loginController.getUser);

module.exports = loginApi;
