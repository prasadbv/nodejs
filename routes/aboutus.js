var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	res.render('aboutus',{title:'About Us','page_name':'about'});
});

module.exports = router;
