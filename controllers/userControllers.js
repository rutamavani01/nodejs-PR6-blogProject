const loginModel = require('../models/loginModel');
const fs = require('fs');

const login = (req, res) => {
    if(req.cookies.auth){
        return res.redirect('dashboard');
    }
    return res.render('login');
}

const register = (req, res) => {
    return res.render('register');
}

const registerRecord = async (req, res) => {
    if(req.body.password != req.body.cpassword) {
        console.log("both passwords are not same");   
        return res.redirect('back');
    }

    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        const registerData = await loginModel.create({
            name: name, email: email, password: password
        })
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const loginRecord =async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await loginModel.findOne({email:email});
        if(!user || user.password != password){
            console.log("email and password are not valid");
            return res.redirect('/');
        }
        res.cookie('auth',user);
        return res.redirect('dashboard');
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

const dashboard = (req,res) => {
    if(!req.cookies.auth){
        return res.redirect('/');
    }
    return res.render('dashboard');
}

const logout =(req,res)=>{
    res.clearCookie('auth');
    return res.redirect('/');
}


module.exports = {
    login, register, registerRecord , loginRecord , dashboard,logout
}