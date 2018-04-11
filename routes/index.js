var express = require('express'),
	request = require('request'),
	http = require('http'),
	router = express.Router(),
    path = require('path'),
	nodeMailer = require('nodemailer');

var config =require('../config/config');
var transporter = nodeMailer.createTransport({
    type: 'smtp',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: config.gmail.username,
        pass: config.gmail.password
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('home', {
		title : 'Express'
	});
});

router.post('/contact/mail', function(req, res, next) {
	var email = req.body.email;
	var number = req.body.number;

    var mailOptions = {
        from: req.body.name, // sender address
        to: config.gmail.toEmail, // list of receivers
        subject: 'Contact message from Customer', // Subject line
        html: '<div style="border: 2px solid #1ed5e2;padding: 20px;width: 600px;overflow: hidden;"><div style="margin-bottom:20px"><b>Name: </b>'+req.body.name+'</div><div style="margin-bottom:20px"><b>Phone Number: </b>'+req.body.number+'</div><div style="margin-bottom:20px"><b>Email: </b>'+req.body.email+'</div><div style="margin-bottom:20px"><b>Message: </b></div><div style="margin-bottom:20px">'+req.body.msg+'</div></div>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.send({
                flag : false
            });
        }else{
            console.log('Message sent: ' + info.response);
            res.send({
                flag : true
            });
        };
    });
});

module.exports = router;
