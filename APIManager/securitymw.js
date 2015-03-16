var http = require('http');
var express = require('express');
var querystring = require('query-string');
var router = express.Router();

router.get('/signin', function (req, res) {
  res.render('signin');
})

router.post('/signin', function (req, res) {
  //user signing in, give req.body to sec manager
    var postData = querystring.stringify({
      username: req.body.username,
      password: req.body.password
  });
  console.log("postData.length");
  console.log(postData.length);

  var options = {
    hostname: 'localhost',
    port: 3001,
    path: '/SECManager/signin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.write(postData);
  req.end();
})

router.get('/signup', function (req, res) {
  res.render('signup');
})

router.post('/signup', function (req, res) {
  console.log(req.body);
  //user signing up, give req.body to sec manager
  var postData = querystring.stringify({
      username: req.body.username,
      password: req.body.password,
      group: req.body.group
  });

  console.log("postData.length");
  console.log(postData.length);

  var options = {
    hostname: 'localhost',
    port: 3001,
    path: '/SECManager/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = http.request(options, function(httpRes) {
    console.log('httpRes: ' + httpRes);
    console.log('STATUS: ' + httpRes.statusCode);
    console.log('HEADERS: ' + JSON.stringify(httpRes.headers));
    httpRes.setEncoding('utf8');
    httpRes.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
    console.log("httpres: " + JSON.stringify(httpRes.user));
    res.send(httpRes.statusCode);
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.write(postData);
  req.end();
});//end post to signup

  router.get('/', function (req, res) {
    // console.log(req.body);
  //req.query.apikeys
  //user using apikeys, give req.body to sec manager
  res.send("Hello! This is homepage.");
})

module.exports = router;
