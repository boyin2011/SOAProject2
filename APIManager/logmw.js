var http = require('http');

var options = {
  hostname: 'localhost',
  port: 3002,
  method: 'POST',
};

function getTime() {
  var now = new Date(),
      hh = now.getHours(),
      min = now.getMinutes(),
      sec = now.getSeconds(),
      dd = now.getDate(),
      mm = now.getMonth()+1, //January is 0!
      yyyy = now.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  now = hh+':'+min+':'+sec+' '+mm+'/'+dd+'/'+yyyy;
  return now;
}

exports.before = function (req, res, next) {
  options.path = '/logging/before';

  var post_data = JSON.stringify({
    log_time: getTime(),
    remote_ip: req.ip,
    req_url: req.originalUrl,
    method: req.method
  });

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

  httpReq.write(post_data);
  httpReq.end();

  next();
}

exports.after = function (req, res, next) {
  var status = req.status;

  /* no router handles the req_url */
  if (status === undefined)
    status = 404;

  options.path = '/logging/after';
  var post_data = JSON.stringify({
    log_time: getTime(),
    remote_ip: req.ip,
    req_url: req.originalUrl,
    method: req.method,
    statusCode: status
  });

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

  httpReq.write(post_data);
  httpReq.end();

  /* if no router handlest the req_url, pass to err handler */
  if (req.status === undefined)
    next();
}
