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

passport.use('signin', new LocalStrategy(
  function(req, username, password, done) {
    console.log(req.body);
    dynamoDB.loginAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        done(null, false);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

// passport.use('signup', new LocalStrategy(
//   function(username, password, done) {
//     console.log("in config signup");
//     dynamoDB.userReg(username, password)
//     .then(function (user) {
//       if (user) {
//         console.log("SUCCESS REGISTERED: " + user.username);
//         done(null, user);
//       }
//       if (!user) {
//         console.log("COULD NOT REGISTER");
//         done(null, false);
//       }
//     })
//     .fail(function (err){
//       console.log(err.body);
//     });
//   }
// ));
passport.use('signup', new LocalStrategy(
  function(username, password, done) {
    console.log("in config signup");
    dynamoDB.userReg(username, password,
      function (user) {
        if (user) {
          console.log("SUCCESS REGISTERED: " + user.username);
          done(null, user);
        }
        if (!user) {
          console.log("COULD NOT REGISTER");
          done(null, false);
        }
      }, function (err){
        console.log("err in config signup:" + err.body);
      });
  }
));

passport.use('apikeys', new LocalStrategy(
  function(apikeys, pi) {
    dynamoDB.apikeysAuth(apikeys, pi)
    .then(function (pi) {
      if (pi) {
        console.log("At least one API key has authorization.");
        done(null, pi);
      }
      if (!pi) {
        console.log("None API key has authorization.");
        done(null, false);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

module.exports = passport;
