var express = require('express');
var request = require('request');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/starwars/people', function(req, res, next) {
  var search = req.body.search;
  var searchURl="https://swapi.co/api/people/?search="+search;

		request(searchURl, function(error, response, html) {
			var resData = JSON.parse(html);
			
			console.log(resData);
			
			res.send({
			  flag:true,
	    data:resData
			});
		});
});

router.post('/planet/data', function(req, res, next) {

  var searchURl=req.body.url;
console.log(searchURl);

		request(searchURl, function(error, response, html) {
			var resData = JSON.parse(html);
			
			console.log(resData);
			var datam={};
			
			for(var i=0;i<resData.results.length;i++){
			datam[resData.results[i].name]=resData.results[i].residents;
			//var detail=JSON.stringify(response.results[i]);
			}
			
			console.log(datam);
			
			
			
			res.send({
			  flag:true,
	    data:datam,
	    next:resData.next,
	    prev:resData.previous
			});
		});
});


module.exports = router;
