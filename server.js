
var express = require('express');
var path = require('path');
var http = require('http');

var favicon = require('serve-favicon');
var logger = require('morgan');

var app = express();

app.use(favicon(path.join(__dirname, 'build', 'img', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.end(err);
  });
}
else {

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.end(err.message);
  });
}

http.createServer(app).listen(3000, () => console.log("Listening on port 3000..."));