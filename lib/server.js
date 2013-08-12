var	app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , cli = require('cli')

cli.parse({
  port:  ['p', 'Listen on this port', 'number', 47254],
  host: ['h', 'Listen on this host name', 'string', 'localhost']
});

// generic http handler
function handler (req, res) {
  res.writeHead(200);
  res.end();
}

cli.main(function(args, options) {
  app.listen(options.port);

  io.sockets.on('connection', function(socket) {
    socket.on('gs-command', function(data) {
      // transmit command to all chrome extension clients
      io.sockets.emit(data.command, data.options);

      if (['status', 'queue'].indexOf(data.command) == -1)
        socket.disconnect();
    });

    socket.on('cli-command', function(data) {
      console.log(data);
      io.sockets.emit(data.type, data.data);
    });
      
  });
});
