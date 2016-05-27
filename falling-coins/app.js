var express = require('express');
var app = express();
var path = require('path');
var loki = require('lokijs');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var fs = require('fs');

app.use(express.static('public'));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var db = new loki('dividend.json', {autoload: true});
var totalTransactions;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/currentVideo', function(req, res) {
	res.send(db.getCollection('videos').findOne({})[0]);
});

app.post('/api/currentVideo', function(req, res) {
	var Videos = db.getCollection('videos');
	var videoUrl = req.body.url;
	Videos.removeWhere({});
	Videos.insert({url: videoUrl});
	db.saveDatabase();
	console.log(Videos.data);
	res.send(Videos.get(1));
});

app.get('/api/videos', function(req, res) {
	var Videos = db.getCollection('videos');
	res.send(Videos.find({}));
});

app.post('/api/videos', function(req, res) {
	var Videos = db.getCollection('videos');
	var videoUrl = req.body.url;
	var newVideo = Videos.insert({url: videoUrl});
	db.saveDatabase();
	res.send(newVideo);
});

app.delete('/api/videos/:id', function(req, res) {
  var videoId = req.params.id;
  // console.log(videoId);
  var Videos = db.getCollection('videos');
  Videos.remove(parseInt(videoId));
  db.saveDatabase();
  res.send({success: true});
});

//polling for transactions stuff
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('render-frame', function (data) {
      data.file = data.file.split(',')[1]; // Get rid of the data:image/png;base64 at the beginning of the file data
      var buffer = new Buffer(data.file, 'base64');
      fs.writeFile(__dirname + '/tmp/frame-' + data.frame + '.png', buffer.toString('binary'), 'binary');
  });
});

// function pollForTransactions() {
// 	request("https://counterpartychain.io/api/sends/dividendplus", function(err, response) {
// 		if (!err && response.statusCode == 200) {
// 			var body = JSON.parse(response.body);
// 	    var total = parseInt(body.total)
// 	    if (totalTransactions === undefined) {
// 	    	totalTransactions = total;
// 	    }

// 	    if (total > totalTransactions) {
// 	    	for (var i = 0; i < total - totalTransactions; i++) {
// 	    		io.emit('tx');
// 	    	}
// 	    }
// 	    totalTransactions = total;
// 	  }
// 	});
// }

// setInterval(pollForTransactions, 5000);

function fakeTransaction() {
	io.emit('tx');
}

setInterval(fakeTransaction, 35000);

http.listen(8080, function() {
	console.log('Listening on port 8080!');
});