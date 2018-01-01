var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');


var url = "mongodb://localhost:27017/players";

router.get('/',function(req,res,next){
	res.render('add-player',{'title':'Add Player form','page_name':'Add'});
});

router.post('/',function(req,res,next){
	var item = {
		position:req.body.position,
		name: req.body.name,
		weight : req.body.weight,
		height: req.body.height,
		birthplace : req.body.birthplace,
		age:req.body.age,
		birthdate:req.body.birthdate,
		number:req.body.number
	}
	mongo.connect(url, function(err,db){
		assert.equal(null,err);
		var cursor = db.collection('players').insertOne(item,function(err,result){
			assert.equal(null,err);
			db.close();
			res.redirect("http://localhost:3000/players");
		});
	});
});

module.exports = router;