var express = require('express');
var request = require('request');
var http = require('http');
var router = express.Router();
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title : 'Express'
	});
});

router.post('/starwars/people', function(req, res, next) {
	var search = req.body.search;
	var searchURl = "https://swapi.co/api/people/?search=" + search;

	request(searchURl, function(error, response, html) {
		if (error) {
			console.log('Error:', error);
			res.send({
				flag : false
			});
		} else {
			var resData = JSON.parse(html);
			res.send({
				flag : true,
				data : resData
			});
		}
	});
});
router.post('/character/json', function(req, res, next) {

	var limit = req.body.limit;
	var pagecount = 50 / 10;

	var i = 1;
	var characterArray = [];

	async.whilst(function() {
		return i <= pagecount;
	}, function(searchIndexLoop) {
		var url = "https://swapi.co/api/people/?page=" + i;
		console.log(url);
		request(url, function(error, response, html) {
			if (error) {
				console.log('Error:', error);
			} else {
				var result=JSON.parse(html);
				characterArray.push(result.results);
				i++;
				searchIndexLoop();
			}
		});
	}, function(err, reult) {
		console.log(characterArray);
		console.log('Search index completed');
		res.send({
			flag : true,
			data : characterArray
		});
	});

});

router.post('/planet/data', function(req, res, next) {
	var searchURl = req.body.url;
	request(searchURl, function(error, response, html) {

		if (error) {
			console.log('Error:', error);
			res.send({
				flag : false
			});
		} else {
			var resData = JSON.parse(html);
			var datam = {};

			for (var i = 0; i < resData.results.length; i++) {
				datam[resData.results[i].name] = resData.results[i].residents;
			}
			res.send({
				flag : true,
				data : datam,
				next : resData.next,
				prev : resData.previous
			});
		}

	});
});

module.exports = router;
