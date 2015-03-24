var passwordHash = require('password-hash');
var async = require("async");
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
        var hashpwd = passwordHash.generate(password);
        item.password = hashpwd;
        item.secgroup = "user";
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
        if(passwordHash.verify(password, res.password)){
          var secgroups = res.secgroup.split(",");
          var apikeys = "";

          // 1st parameter in async.each() is the array of items
          async.each(secgroups,
            // 2nd parameter is the function that each item is passed into
            function(secgroup, callback){
              console.log("secgroup:"+secgroup);
              var secitem = {secgroup: secgroup};
              dyno.getItem(secitem, {table:'secgroup'}, function(err, resp) {
                if (resp == undefined){ //no such row in db
                  console.log("SECGROUP NOT FOUND.");
                }else{
                  console.log("resp=" + JSON.stringify(resp));
                  apikeys += resp.apikey + ",";
                }
                callback();
              });
            },
            // 3rd parameter is the function call when everything is done
            function(err){
              item.apikey = apikeys;
              onSucc(item);
            }
          );
        }else{
          onErr("PASSWORD INCORRECT.");
        }
    }
  });
}

dyno.apikeysAuth = function (pi, apikeys, onSucc, onErr) {
  console.log("enter dyno.apikeysAuth,pi=" + pi + " apikeys="+apikeys);

  dyno.getItem(pi, {table:'pitable'}, function(err, resp) {
    if (resp == undefined){ //no such row in db
      console.log("PI NOT FOUND.");
    }else{
      console.log("resp=" + JSON.stringify(resp));
      var requiredKey= resp.apikey;
      var tempapikey = apikeys.split(",");
      var hasKey = 0;
      //loop through apikeys
      for (i = 0; i < tempapikey.length; i++) { 
        //if any apikey opens this pi, return pi
        if(tempapikey[i] == requiredKey){
          var item = {pi: pi};
          hasKey = 1;
          onSucc(item);
        }
      }
      if(hasKey == 0){
        onErr("UNAUTHORIZED ACCESS.");
      }
    }       
  });
}

dyno.createSecApikey = function (secgroup, apikey, onSucc, onErr) {
  var item = {secgroup: secgroup};

  dyno.getItem(item, {table:'secgroup'}, function(err, res) {
    if (res == undefined){ //no such row in db
        var hashapikey = passwordHash.generate(password);
        item.apikey = hashapikey;

        dyno.putItem(item, {table:'secgroup'}, function(err, resp){
          if (resp != null){
              console.log("SUCCESSFULLY CREATE SECGROUP API KEY BLINDING.");
              onSucc(item);
          }else {
              onErr("DATABASE ERROR.");
          }
        });
    }else{
        onErr("SECGROUP IS NOT AVAILABLE.");
    }
  });
}


dyno.createPIApikey= function (pi, apikey, onSucc, onErr) {
  var item = {pi: pi};

  dyno.getItem(item, {table:'pitable'}, function(err, res) {
    if (res == undefined){ //no such row in db
        var hashapikey = passwordHash.generate(password);
        item.apikey = hashapikey;

        dyno.putItem(item, {table:'secgroup'}, function(err, resp){
          if (resp != null){
              console.log("SUCCESSFULLY CREATE PI API KEY BLINDING.");
              onSucc(item);
          }else {
              onErr("DATABASE ERROR.");
          }
        });
    }else{
        onErr("SECGROUP IS NOT AVAILABLE.");
    }
  });
}
module.exports = dyno;
