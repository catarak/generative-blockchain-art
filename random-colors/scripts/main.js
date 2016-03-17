function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();

}

var eventToListenTo = 'tx';
var room = 'inv';

var socket = io("https://blockexplorer.com/");
socket.on('connect', function() {
  // Join the room.
  socket.emit('subscribe', room);
})
socket.on(eventToListenTo, function(data) {
  console.log("New transaction received: " + data.txid);
	var c1 = color(parseInt(data.txid.slice(0,2), 16), 
								parseInt(data.txid.slice(2,4), 16), 
								parseInt(data.txid.slice(4,6), 16));
	fill(c1);
	for (var i = 0; i < 50; i++) {
		ellipse(Math.floor(Math.random()*windowWidth), Math.floor(Math.random()*windowWidth), 20, 20);
	}
})