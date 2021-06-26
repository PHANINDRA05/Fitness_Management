const express=require('express');
const cors=require('cors');
const path=require('path');
const winston=require('winston');
const bodyParser=require('body-parser');
const config=require('./startup/config');
const app=express();
const err=require('./middleware/errors');
const customerRoutes=require('./routes/customer_routes');

const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');


require('./startup/db')();
require('./startup/logging')();
require('./startup/validations')();


const PORT=process.env.port || 3000;
//passport config

require('./confignew/passport') (passport);
//db 

app.use(express.static( 'public'));

// const db=require('./confignew/keys').MongoURI;
// mongoose.connect(db, {useNewUrlParser: true})
//   .then(()=>console.log("MongoDb connected"))
//   .catch(err => console.log(err));

//ejs

app.use(expressLayouts);
app.set('view engine','ejs');


//BodyParser

app.use(express.urlencoded({ extended:false}));
app.use(cors());
app.use(bodyParser.json());
//express session

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  //passport middleware

  app.use(passport.initialize());
  app.use(passport.session());
//connect flash
app.use(flash());

//gloval variables
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');

    next();
});

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));




app.use(express.static('proj'));
app.use('/home',require('./routes/index'));
app.get('/',(req,res) =>
{
    res.sendFile('./views/newproj.html',{ root: __dirname});
 
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "newcss.css");
  });


  app.use(express.static('proj'));
  app.use('/contact',require('./routes/index'));
  app.get('/',(req,res) =>
  {
      res.sendFile('./views/newproj.html',{ root: __dirname});
   
  });

//app.listen(PORT,console.log(`Server started on PORT ${PORT}`));
app.use(customerRoutes.routes);
app.use(err);

app.listen(config.port,()=>winston.info('app is listineing on url http://localhost:' + config.port));
