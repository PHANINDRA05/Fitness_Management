const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const passport=require('passport');
//routes
router.use(express.static(__dirname + '/public'));
router.get('/login',(req,res) => res.render('login'));
router.get('/register',(req,res) => res.render('register'));


const User=require('../models/User');
//regiser handle

router.post('/register', (req,res) => {
    const { name,email,password,password2 }=req.body;
    let errors=[];

    //check all fields are filled
    if(!name || !password || !email ||!password2){
        errors.push({msg:'Please make sure that you fill all the fields'});
    }
    //check if password and password 2 are matching

    if(password!==password2){
        errors.push({msg:' Passwords arent matching'});
    }

    //check password length
if(password.length <6){
    errors.push({msg:'Password length should be greater than 6'});
}

if(errors.length >0){
    res.render('register',{
        errors,name,password,password2,email
    });

}
else{
    //validation passed
User.findOne({ email:email })
.then(user=> {
if(user)  {
    //user exists
    errors.push({msg:'This E-mail is already taken'});
    res.render('register',{
        errors,name,email,password,password2
    });
} else
{
const newUser= new User({
    errors,
    name,
    email,
    password
});

//Hash Passwords
bcrypt.genSalt(10, (err,salt) =>
 bcrypt.hash(newUser.password, salt, (err,hash) =>{
     if(err) throw err;
     newUser.password=hash;
     //save user
newUser.save()
.then(user => {
    req.flash('success_msg','You are now registered successfully and can log in');
    res.redirect('/users/login');
})
.catch(err =>console.log(err));

 }) )

}




});




}


});

//login handle
router.post('/login',(req,res,next) => {
passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/users/login',
    failureFlash:true
})(req,res,next)
})

//logout handle
router.get('/logout', (req,res)=>{
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login');
});



module.exports=router;