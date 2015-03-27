// Establishing connections with MySQL
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database:  'sakila'

});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//and pass it into the node-mysql-wrap constructor
var createMySQLWrap = require('mysql-wrap');
sql = createMySQLWrap(connection);