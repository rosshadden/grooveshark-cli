#!/usr/local/bin/node

var io = require('socket.io-client')
  , cli = require('cli')
  , chalk = require('chalk')
  , forever = require('forever')
  , tools = require('./tools');

String.prototype.is = tools.is;

cli.parse({
  port:  ['p', 'Listen on this port', 'number', 47254],
  host: ['h', 'Listen on this host name', 'string', 'localhost']
}, ["play", "pause", "restore", "next", "prev", "stop", "clear", "volume", "mute", 
    "shuffle", "status", "queue", "start-server", "stop-server"]);


// TODO better option parsing
// TODO help
// TODO implement options

cli.main(function(args, options) {
  var socket = io.connect( options.host, { port: options.port });

  var command = cli.command;
  
  // When the socket connects to the server, fire off the command we passed in. The 
  // socket server will issue the disconnect depending on the command. The reason it 
  // doesn't disconnect right away is because `status` and `queue` need to wait and 
  // get a response back from the server and display that response in the terminal.
  if (command.is("play", "pause", "restore", "next", "prev", "stop", "clear", "volume", 
                 "mute", "shuffle", "status", "queue")) {
    socket.on('connect', function () { 
      var data = {
        command: command,
        args: args
      };
      socket.emit('gs-command', data);
    });
  }
  // to start the server, use forever to start the server as a daemon.
  // TODO make sure server isn't already running
  else if (command == "start-server") {
    forever.startDaemon('server.js', {port: options.port})
    process.exit(0);
  }
  // TODO actually stop the server. forever can't do this if the server
  // is running as a daemon apparently. forever is shit.
  else if (command == "stop-server") {
    var a = forever.list()
    console.log(a)
    process.exit(0);
  }

  socket.on('cli-status', function(info) {
    // if there is nothing in the queue, grooveshark will return
    // null for info.
    if (info) {
      var playerStatus = {
        0: "Stopped",
        1: "unknown",
        2: "unknown",
        3: "Playing",
        4: "Paused",
        5: "unknown",
        6: "unknown",
        7: "Stopped"
      }[info.status];

      // print out player status and current time
      var status = chalk.green(playerStatus);
      if (playerStatus.is("Playing", "Paused")) {
        status += " " + tools.formatTime(info.position) 
               + " / " + tools.formatTime(info.duration);
      }
      console.log(status);
      console.log(chalk.blue("Artist") + ":", info.activeSong.ArtistName);
      console.log(chalk.blue("Song") + ":", info.activeSong.SongName);
    }
    // if there is nothing to print out, print stopped
    else {
      console.log("Stopped");
    }
    process.exit(0);
  });


  socket.on('cli-queue', function(queue) {
    console.log("Number of Songs:", queue.songs.length, "\n");
    var activeSongIndex = (queue.activeSong) ? queue.activeSong.index : null;
    if (queue.songs.length) {
      var start = (activeSongIndex > 10) ? activeSongIndex - 10 : 0;
      var end = (queue.songs.length > activeSongIndex + 10) ? activeSongIndex + 10 : queue.songs.length;
      for (var i = start, j = end; i < j; i++) {
        var song = queue.songs[i];
        var songPrefix = " ";
        if (activeSongIndex && i == activeSongIndex)
          songPrefix = ">";
        console.log(songPrefix, i+1+".", song.SongName, "by", song.ArtistName);
      }
      if (end != queue.songs.length)
        console.log("\n...", queue.songs.length - end, "More Songs ...");
    }
    process.exit(0);
  });


  socket.on('disconnect', function() {
    process.exit(0);
  });
});
