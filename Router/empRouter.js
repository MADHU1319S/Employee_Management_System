const express = require('express');
const empRouter = express.Router();
const customMiddleware = require('../middleware/middleware');
const { ControlEmp, ControlView, Controlupdate, Controldelete } = require('../Controller/empController');

empRouter.post('/addEmployee', customMiddleware, ControlEmp);
empRouter.get('/viewEmployee', customMiddleware, ControlView);
empRouter.put('/updateEmployee/:id', customMiddleware, Controlupdate); 
empRouter.delete('/deleteEmployee/:id', customMiddleware, Controldelete)


module.exports = empRouter;
