var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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

router.get('/',function(req,res){
	res.render('signup',{title:'Sign UP','page_name':'signup'});
});

router.post('/',function(req,res,next){
	console.log(req.body);	
	var sql = "insert into users (name,email,password) values ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"')";
	// console.log(sql);
	connection.query(sql,function(error,result){
		if(error) throw error;
		console.log("Record inserted");
	})
	res.render('signup',{title:'Contact Us','output':req.body,'query':sql});
});
module.exports = router;