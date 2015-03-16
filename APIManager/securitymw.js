var http = require('http');
var express = require('express');
var querystring = require('query-string');
var router = express.Router();

router.get('/signin', function (req, res) {
  res.render('signin');
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
      secgroup: req.body.secgroup
  });

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
    console.log('STATUS: ' + httpRes.statusCode);
    console.log('HEADERS: ' + JSON.stringify(httpRes.headers));
    httpRes.setEncoding('utf8');
    httpRes.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      res.send(chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    res.send('problem with request: ' + e.message);
  });

  req.write(postData);
  req.end();
});

router.post('/signin', function (req, res) {
  console.log(req.body);
  //user signing up, give req.body to sec manager
  var postData = querystring.stringify({
      username: req.body.username,
      password: req.body.password,
  });

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

  var req = http.request(options, function(httpRes) {
    console.log('STATUS: ' + httpRes.statusCode);
    console.log('HEADERS: ' + JSON.stringify(httpRes.headers));
    httpRes.setEncoding('utf8');
    httpRes.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      res.send(chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    res.send('problem with request: ' + e.message);
  });

  req.write(postData);
  req.end();
})

// router.get('/', function (req, res) {
//     // console.log(req.body);
//   //req.query.apikeys
//   //user using apikeys, give req.body to sec manager
//   res.send("Hello! This is homepage.");
// })

module.exports = router;
