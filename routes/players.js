var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');


var url = 'mongodb://localhost:27017/players';

router.get('/',function(req,res,next){
	var resultArray = [];
	mongo.connect(url,function(err,db){
		assert.equal(null,err);
		var cursor = db.collection('players').find();
		cursor.forEach(function(doc,err){
			assert.equal(null,err);
			resultArray.push(doc);
		},function(){
			db.close();
			res.render('players',{item:resultArray,title:'Players','page_name':'players','success':false,'errors':req.session.errors});	
			req.session.errors=null;
		});
	});
	
});

module.exports = router;