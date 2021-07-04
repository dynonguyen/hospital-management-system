const manageApi = require('express').Router();
const manageController = require('../controllers/manage.controller');

manageApi.get('/emp-stat', manageController.getEmployeeStatistic);

module.exports = manageApi;
