var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');


var connection = mysql.createConnection({

  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodedb'

});

connection.connect(function(error){
	if(!!error){
		console.log("DB connection error");
	}else{
		console.log("DB connected");
	}
});

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


// console.log(validPassword('123456','$2a$05$JRFPXXiVv5u5Qnc.0JR6tu9uHktY2TZikMC0vsEplALr7qrAT4sKW'));




router.get('/',function(req,res,next){
	res.render('signup',{title:'Sign UP','page_name':'signup','success':false,'errors':req.session.errors});
	// console.log(req.session.errors);
	req.sesrtsion.errors=null;
});

router.post('/',function(req,res,next){
	req.check('name','Invalid name').isLength({min:4});
	req.check('email','Invalid email address').isEmail();	
	req.check('password','Password is Invalid').isLength({min:6});
	var errors = req.validationErrors();
	if(errors){
		req.session.errors = errors;
		res.redirect('/signup');
	}else{
		if(req.body.email){
			var query = "select email from users where email='"+req.body.email+"'";
			connection.query(query,function(err,user){
				if(error) throw error;
			})
		}
		var cpass = encryptPassword(req.body.password);
	var sql = "insert into users (name,email,password) values ('"+req.body.name+"','"+req.body.email+"','"+cpass+"')";
	// console.log(sql);
	connection.query(sql,function(error,result){
		if(error) throw error;
		console.log("Record inserted");
	});
	res.render('signup',{title:'Sign Up','page_name':'signup','output':req.body,'query':sql});
	}
});
module.exports = router;