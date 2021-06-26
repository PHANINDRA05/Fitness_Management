const {Customer,validate} = require('../models/customer');

const getAllCustomers = async (req,res,next) =>{
    const list = await Customer.find().exec();
    res.render('customerlist',{
        customers:list
    });
}

const getAddCustomerView = (req,res,next) =>{
    res.render('addCustomer');
}

const addCustomer = async(req,res,next) =>{
  

        const data = req.body;
        let customer = await new Customer({
            firstname:data.firstname,
            lastname:data.lastname,
            phonenumber:data.phonenumber,
            packagedetails:data.packagedetails,
            amountpaid:data.amountpaid,
            gender:data.gender,
            dateofpayment:data.dateofpayment,
            enddateofpayment:data.enddateofpayment,
            address:data.address
        });
        customer = await customer.save();
        res.redirect('/customerlist');

   
}

const getUpdateCustomerView = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const onecustomer = await Customer.findById(id).exec();
        res.render('updateCustomer',{
            customer : onecustomer
        });
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const updateCustomer = async(req,res,next)=>{
   
    const id = req.params.id;
    const data = req.body;
    let customer = await Customer.findByIdAndUpdate(id,{
        firstname:data.firstname,
        lastname:data.lastname,
        phonenumber:data.phonenumber,
        packagedetails:data.packagedetails,
        amountpaid:data.amountpaid,
        gender:data.gender,
        dateofpayment:data.dateofpayment,
        enddateofpayment:data.enddateofpayment,
        address:data.address
    },{new:true});
    if(!customer) return res.send('Customer with given id was not found');

    res.redirect('/customerlist');
}

const getDeleteCustomerView = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const onecustomer = await Customer.findById(id).exec();
        res.render('deleteCustomer',{
            customer : onecustomer
        });
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteCustomer = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const customer = await Customer.findByIdAndRemove(id);
        if(!customer) return res.status(404).send('Customer with given id not found');
        res.redirect('/customerlist');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports ={
    getAllCustomers,
    getAddCustomerView,
    addCustomer,
    getUpdateCustomerView,
    updateCustomer,
    getDeleteCustomerView,
    deleteCustomer
}