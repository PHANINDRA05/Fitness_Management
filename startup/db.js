const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () =>{   
    const dburl = 'mongodb+srv://phani:test123@nodeone.tz1c8.mongodb.net/Employee-DB?retryWrites=true&w=majority';
    mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true },(err)=>{
        if(!err) console.log('connected')
    });
}