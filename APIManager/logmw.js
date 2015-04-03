var http = require('http');

var options = {
  hostname: 'localhost',
  port: 3002,
  method: 'POST',
};

exports.before = function (req, res, next) {
  options.path = '/logging/before';

  var httpReq = http.request(options, function(httpRes) {
    console.log('STATUS: ' + httpRes.statusCode);
    console.log('HEADERS: ' + JSON.stringify(httpRes.headers));
    httpRes.setEncoding('utf8');
    httpRes.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      res.send(chunk);
    });
  });

  httpReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  httpReq.write(JSON.stringify(req.body)); //send req object to loggingServer
  httpReq.end();
  next();
}

exports.after = function (req, res, next) {
  options.path = '/logging/after';
  var httpReq = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  httpReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  httpReq.write({request_obj: req});
  httpReq.end();
  next();
}
