var bcrypt = require('bcryptjs');
// var Q = require('q'); 
// var config = require('./config.js');
// var db = require('orchestrate')(PIsAPIKeys.db);  
var awsCredentials = require('./aws.credentials.json');

var dyno = module.exports.dyno = require('dyno')({
    accessKeyId: awsCredentials.accessKeyId ,
    secretAccessKey: awsCredentials.secretAccessKey ,
    region: awsCredentials.region ,
    table: 'usertable'
});
 
userReg = function (username, password) {

  var item = {username: username};
  dyno.getItem(item, {table:'usertable'}, function(err, res) {
    if (res.body.message == null){
          console.log("username is available.");
          var hashpwd = bcrypt.hashSync(password, 8);
              dyno.putItem(item, {table:'usertable'}, function(err, resp){
                if (result.body.message == 'success'){
                    //notify API Manager successfully registered
                    console.log("successfully registered.");
                }else {
                    //notify API Manager database error
                    console.log("database error.");
                }
              });
      }else{
          //notify API Manager username is not available
          console.log("username is not available.");
      }
  });
}


loginAuth = function (username, password) {
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

apikeysAuth = function (apikeys, pi) {
  //loop through apikeys


  //if any apikey opens this pi, return pi 


}
