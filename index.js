const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const server = http.createServer(app); // create a http server

const io = socketIO(server);  // connect the server to socketIO by binding it

app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', socket => {
  socket.on('message', body => {
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(9)
    });
  });
});

server.listen(3002); //start server
