var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var dynamoDB = require('./dynamoDB');

//===============CONFIG PASSPORT=================
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('signup', new LocalStrategy(
  function(username, password, done) {
    dynamoDB.userReg(username, password, 
      function (user) {
        if (user) {
          console.log("SUCCESS REGISTERED: " + user.username);
          done(null, user, "SUCCESS REGISTERED: " + user.username);
        }
      }, function (err){
        console.log("ERR:" + err);
        done(null, false, err);
      });
  }
));

passport.use('signin', new LocalStrategy(
  function(username, password, done) {
    dynamoDB.loginAuth(username, password, 
      function (user) {
        if (user) {
          console.log("LOGGED IN AS: " + user.username + " with API keys: " + user.apikey);
          done(null, user, "LOGGED IN AS: " + user.username + " with API keys: " + user.apikey);
        }
      }, function (err){
        console.log("ERR:" + err);
        done(null, false, err);
      });
  }
));

passport.use('APIKEYsignin', new LocalStrategy({
    usernameField: 'accessPI',
    passwordField: 'apikeys'
  },
  function(accessPI, apikeys, done) {
    dynamoDB.apikeysAuth(accessPI, apikeys, 
      function (item) {
        if (user) {
          console.log("apikeysAuth PI:" + item.pi);
          done(null, user, "apikeysAuth PI:" + item.pi);
        }
      }, function (err){
        console.log("ERR:" + err);
        done(null, false, err);
      });
  }
));

passport.use('createSecApikey', new LocalStrategy({
    usernameField: 'secgroup',
    passwordField: 'apikey'
  },
  function(secgroup, apikey, done) {
    dynamoDB.createSecApikey(secgroup, apikey, 
      function (item) {
        if (item) {
          console.log("SECGROUP: " + item.secgroup + " with API keys: " + item.apikey);
          done(null, item, "SECGROUP: " + item.secgroup + " with API keys: " + item.apikey);
        }
      }, function (err){
        console.log("ERR:" + err);
        done(null, false, err);
      });
  }
));

passport.use('createPIApikey', new LocalStrategy({
    usernameField: 'pi',
    passwordField: 'apikey'
  },
  function(pi, apikeys, done) {
    dynamoDB.createSecApikey(pi, apikey, 
      function (item) {
        if (item) {
          console.log("PI: " + item.pi + " with API key: " + item.apikey);
          done(null, item, "PI: " + item.pi + " with API key: " + item.apikey);
        }
      }, function (err){
        console.log("ERR:" + err);
        done(null, false, err);
      });
  }
));
module.exports = passport;
