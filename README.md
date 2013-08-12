## <img src="https://raw.github.com/L1fescape/grooveshark-cli-chrome/master/images/logo.png" />
> Grooveshark in your terminal.

Uses [socket.io](https://github.com/LearnBoost/socket.io) to pass messages back and forth between an open [Grooveshark](http://grooveshark.com) instance in Google Chrome and your terminal. In order to achieve this, an instance of a socket.io server is spawned as a daemon, serving as the middle-ware between the Chrome Extension and the CLI client. 

Don't limit controlling Grooveshark to just your terminal! You can use any client to connect to the socket.io server to pass commands to Grooveshark (Android app, iOS app, etc).

## Install

#### CLI

Install with [npm](https://npmjs.org/package/grooveshark-cli): `npm install -g grooveshark-cli`

#### Chrome Extension

`git clone git@github.com:L1fescape/grooveshark-cli-chrome.git`

Load the Chrome Extension:

- Open `chrome://extensions` in Chrome
- Click `Load Unpacked Extension`
- Navigate to where you cloned the Grooveshark CLI Chrome Extension repo
- `Open`


That's it!

## Example

```js
// start the server
grooveshark start-server

// restore previous queue
grooveshark restore

// show the queue
grooveshark queue
//=> Number of Songs: 4
//=>
//=>   1. Lower Your Eyelids to Die With the Sun by M83
//=> > 2. Midnight City by M83
//=>   3. Moonchild by M83
//=>   4. Soon, My Friend by M83

// play current song
grooveshark play

// get the status of the player
grooveshark status
//=> Playing 00:02 / 04:04
//=> Artist: M83
//=> Song: Midnight City

// stop playing
grooveshark stop

// kill the server
grooveshark stop-server
```


## API

#### grooveshark start-server

Starts the server component as a daemon if it's not running already.

#### grooveshark stop-server 

**WARNING:** Currently doesn't work. Kill with `ps ax | grep node; kill -9 [process id]`. Super sorry, can't find a way to kill a [forever](https://github.com/nodejitsu/forever) daemon right now.

Stops the server daemon if it's currently running.

#### grooveshark play \[song index\]

Starts playing a song or resumes playback. If an index in the queue is included, play song at that index.

#### grooveshark pause

Pauses currently playing song.

#### grooveshark stop

Stops playback.

#### grooveshark next

Plays next song in queue if there is one.

#### grooveshark prev

Plays previous song in queue if there is one.

#### grooveshark vol \[volume level\]

Sets the volume level of the player (0-100)

#### grooveshark mute

Toggles mute.

#### grooveshark clear

Clears current queue. 

#### grooveshark restore

Restores previous queue if there is one to restore.

## Todo

- Find a better way to start and stop the socket.io server. Currently no way to detect if it is already running or not.
- Make `stop-server` actually do what it's supposed to do.
- Status can accept a format string that returns the status of the player in the format passed in.
- Document Server API so it's easier for people to write clients to connect and use it.

## Contributing

If you see a bug, raise an issue via [GitHub](https://github.com/L1fescape/grooveshark-cli/issues) or better yet, submit a [pull request](https://github.com/L1fescape/grooveshark-cli/pull)!

If there's an issue with the Chrome Extension, open an issue in the [Grooveshark CLI Chrome Extension repo](https://github.com/L1fescape/grooveshark-cli-chrome/issues).

All feedback and suggestions welcome.

## License

MIT License • © [Andrew Kennedy](https://github.com/L1fescape)
