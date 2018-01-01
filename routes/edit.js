var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = "mongodb://localhost:27017/players"

router.get('/:id/',function(req,res,next){
	var resultArray = [];
	mongo.connect(url,function(err,db){
		assert.equal(null,err);
		var cursor = db.collection('players').findOne({"_id":objectId(req.params.id)},function(err,result){
			resultArray.push(result);
			res.render('edit',{'title':'Edit Form','page_name':'Edit','item':resultArray});
		});
	});
	
});

router.post('/',function(req,res,nex){
	var id = req.body.objid;
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
		var cursor = db.collection('players').updateOne({"_id":objectId(id)},{$set:item},function(err,result){
			assert.equal(null,err);
			db.close();
			res.redirect("http://localhost:3000/players");
		});
	});
});

module.exports = router;