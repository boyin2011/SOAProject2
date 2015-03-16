var bcrypt = require('bcryptjs');
// var Q = require('q');
// var config = require('./config.js');
// var db = require('orchestrate')(PIsAPIKeys.db);
var awsCredentials = require('./aws.credentials.json');

var dyno = require('dyno')({
    accessKeyId: awsCredentials.accessKeyId ,
    secretAccessKey: awsCredentials.secretAccessKey ,
    region: awsCredentials.region ,
});

dyno.userReg = function (username, password, onSucc, onErr) {
  console.log("enter dyno.userReg,username=" + username + " password="+password);
  var item = {username: username};
  dyno.getItem(item, {table:'usertable'}, function(err, res) {
    console.log(res);
    if (res == undefined){ //no such row in db
        console.log("USERNAME IS AVAILABLE.");
        var hashpwd = bcrypt.hashSync(password, 8);
        item.password = hashpwd;

        dyno.putItem(item, {table:'usertable'}, function(err, resp){
          console.log("resp=" + JSON.stringify(resp));
          if (resp != null){
              console.log("SUCCESSFULLY REGISTERED.");
              onSucc(item);
          }else {
              onErr("DATABASE ERROR.");
          }
        });
    }else{
        onErr("USERNAME IS NOT AVAILABLE.");
    }
  });
}

dyno.loginAuth = function (username, password, onSucc, onErr) {
  console.log("enter dyno.loginAuth,username=" + username + " password="+password);
  var item = {username: username};

  dyno.getItem(item, {table:'usertable'}, function(err, res) {
    console.log(res);
    if (res == undefined){ //no such row in db
        onErr("USERNAME NOT FOUND.");
    }else{
        console.log("res=" + JSON.stringify(res));
        var hashpwd = bcrypt.hashSync(password, 8);
        if(res.password == hashpwd){
        //get secgroup for this user
        var apikeys;
        var secgroup = {secgroup: res.body.secgroup};
        dyno.getItem(secgroup, {table:'secgroup'}, function(err, res) {
          if (res == undefined){ //no such row in db
            onErr("SECGROUP NOT FOUND.");
          }else{
            //notify API Manager the APIKeys for this user
            console.log("res=" + JSON.stringify(resp));
            onSucc(resp.body.apikeys)
          }
        });

        }else{
          console.log("PASSWORD INCORRECT.");
          onErr("PASSWORD INCORRECT.");
        }
    }
  });
}

dyno.apikeysAuth = function (apikeys, pi) {
  //loop through apikeys


  //if any apikey opens this pi, return pi


}

module.exports = dyno;
