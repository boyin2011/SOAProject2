var express = require('express');
var router = express.Router();

router.get('/signin', function (req, res) {
  res.render('signin');
})

router.post('/signin', function (req, res) {
  //user signing in, give req.body to sec manager
  console.log(req.body);

})

router.get('/signup', function (req, res) {
  res.render('signup');
})

router.post('/signup', function (req, res) {
  console.log(req.body);
  //user signing up, give req.body to sec manager

})

router.get('/', function (req, res) {
  console.log(req.body);
  // req.query.apikeys
  //user using apikeys, give req.body to sec manager

})


module.exports = router;