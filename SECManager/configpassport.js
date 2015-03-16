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
          console.log("LOGGED IN AS: " + user.username);
          done(null, user, "LOGGED IN AS: " + user.username);
        }
      }, function (err){
        console.log("ERR:" + err);
        done(null, false, err);
      });
  }
));

// passport.use('apikeys', new LocalStrategy(
//   function(apikeys, pi) {
//     dynamoDB.apikeysAuth(apikeys, pi)
//     .then(function (pi) {
//       if (pi) {
//         console.log("At least one API key has authorization.");
//         done(null, pi);
//       }
//       if (!pi) {
//         console.log("None API key has authorization.");
//         done(null, false);
//       }
//     })
//     .fail(function (err){
//       console.log(err.body);
//     });
//   }
// ));

module.exports = passport;
