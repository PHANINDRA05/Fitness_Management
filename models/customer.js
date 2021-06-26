const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    firstname:{
        type: String,
        minlength:1,
        maxlength:50,
        required:true
    },
    lastname:{
        type: String,
        minlength:1,
        maxlength:50,
        required:true
    },
    phonenumber:{
        type:String,
        minlength:10,
        required:true
    },
    packagedetails:{
        type:String,
        required:true
    },
    amountpaid:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        require:true
    },
    dateofpayment:{
        type:String,
        required:true
    },
    enddateofpayment:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
});

const Customer = mongoose.model('Customer',customerSchema);

const validateCustomer = (customer) =>{
    const schema = {
        firstname:Joi.string().min(1).max(50).required(),
        lastname:Joi.string().min(1).max(50).required(),
        phonenumber:Joi.string().min(10).required(),
        packagedetails:Joi.string().required(),
        amountpaid:Joi.string().required(),
        gender:Joi.string().required(),
        dateofpayment:Joi.string().required(),
        enddateofpayment:Joi.string().required(),
        address:Joi.string().required()
    }
    return Joi.validate(customer,schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;