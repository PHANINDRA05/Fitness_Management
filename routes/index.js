const express=require('express');
const router=express.Router();
const {ensureAuthenticated}=require('../confignew/auth');
//routes
//welcome page
router.get('/',(req,res) => res.render("newproj"));
router.get('/home',(req,res)=> res.render("welcome"));
router.get('/login',(req,res) => res.render("login"));
router.get('/contact',(req,res)=> res.render("contact"));
//dashboard
router.get('/dashboard',ensureAuthenticated,(req,res) => res.render('dashboard',{

    name:req.user.name
}));
module.exports=router;

