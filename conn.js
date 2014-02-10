var mysql = require('mysql');
var conn = mysql.createConnection({
  database : 'wishSocial',
  host     : 'localhost',
  user     : 'root',
  password : 'jack',
  multipleStatements: true,
  dateStrings: true
});
exports.conn = conn;
