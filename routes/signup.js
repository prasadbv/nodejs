var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var bcrypt = require('bcrypt-nodejs');




var userSchema = {	email:{type:String,required:true},
					password:{type:String,required:true,
					name:{type:String,required:true}
					}
};
var encryptPassword = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
}
// console.log(encryptPassword('prasad'));

var validPassword = function(password,dbpassword){
	return bcrypt.compareSync(password,dbpassword);
}


router.get('/',function(req,res,next){
	res.render('signup',{title:'Sign UP','page_name':'signup','success':false,'errors':req.session.errors});
	// console.log(req.session.errors);
	req.session.errors=null;
});


module.exports = router;