var bcrypt = require('bcryptjs');
// var Q = require('q');
// var config = require('./config.js');
// var db = require('orchestrate')(PIsAPIKeys.db);
var awsCredentials = require('./aws.credentials.json');

var dyno = require('dyno')({
    accessKeyId: awsCredentials.accessKeyId ,
    secretAccessKey: awsCredentials.secretAccessKey ,
    region: awsCredentials.region ,
    table: 'usertable'
});

dyno.userReg = function (username, password, onSucc, onErr) {
  console.log("enter dyno.userReg,username=" + username + " pw="+password);
  var item = {username: username};
  dyno.getItem(item, {table:'usertable'}, function(err, res) {
    console.log(res);
    if (res == undefined){ //no such row in db
        console.log("username is available.");
        var hashpwd = bcrypt.hashSync(password, 8);
        item.password = hashpwd;
        dyno.putItem(item, {table:'usertable'}, function(err, resp){
          console.log("resp=" + JSON.stringify(resp));
          if (resp != null){
              //notify API Manager successfully registered
              console.log("successfully registered.");
              onSucc(item);
          }else {
              //notify API Manager database error
              console.log("database error.");
              onErr(err);
          }
        });
    }else{
        //notify API Manager username is not available
        onSucc(null);
        console.log("username is not available.");
    }
  });
}


dyno.loginAuth = function (username, password) {
  var item = {username: username, password: password};
  dyno.getItem(item, {table:'usertable'}, function(err, res) {
    if (res.body.message == null){
          //notify API Manager username password not found
          console.log("username password not found.");
      }else{
          //notify API Manager the APIKeys for this user
      }
  });

}

dyno.apikeysAuth = function (apikeys, pi) {
  //loop through apikeys


  //if any apikey opens this pi, return pi


}

module.exports = dyno;
