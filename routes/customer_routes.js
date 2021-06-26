const express = require('express');
const {getAllCustomers,getAddCustomerView,addCustomer,getUpdateCustomerView,updateCustomer,getDeleteCustomerView,deleteCustomer} = require('../controllers/customer_controller');

const router = express.Router();

 router.get('/customerlist',getAllCustomers);
 router.get('/',(req,res)=> res.render("dashboard"));

router.get('/addCustomer',getAddCustomerView);
router.post('/addCustomer',addCustomer);
router.get('/updateCustomer/:id',getUpdateCustomerView);
router.post('/updateCustomer/:id',updateCustomer);
router.get('/deleteCustomer/:id',getDeleteCustomerView);
router.post('/deleteCustomer/:id',deleteCustomer);
router.get('/workout_plan',(req,res)=> res.render("workout_plan"));
router.get('/weightgain',(req,res)=> res.render("weightgain"));
router.get('/weightloss',(req,res)=> res.render("weightloss"));
router.get('/about',(req,res)=> res.render("about"));
module.exports = {
    routes:router 
}