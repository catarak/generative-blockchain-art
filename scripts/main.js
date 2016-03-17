// var latestTx;

// $(function() {
// 	setInterval(checkForLatestTransaction, 1000);
// });

// function checkForLatestTransaction() {
// 	$.getJSON("https://counterpartychain.io/api/transactions", function(data) {
// 		if(latestTx !== data.data[0].tx_hash) {
// 			latestTx = data.data[0].tx_hash;
// 			$.getJSON("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat", function(response) {
// 				var gifUrl = response.data.image_url;
// 				$("body").html("<img src='" + gifUrl + "'>");
// 			});
// 		}
// 	});
// }

var eventToListenTo = 'tx';
var room = 'inv';

var socket = io("https://blockexplorer.com/");
socket.on('connect', function() {
  // Join the room.
  socket.emit('subscribe', room);
})
socket.on(eventToListenTo, function(data) {
  console.log("New transaction received: " + data.txid)
  $.getJSON("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat", function(response) {
		var gifUrl = response.data.image_url;
		var randomX = Math.floor(Math.random()*$(window).width())-200;
		var randomY = Math.floor(Math.random()*$(window).height())-200;
		$("body").append("<img src='" + gifUrl + "' style='position: absolute; top: " + randomY + "px; left: " + randomX + "px;'>");
		if ($("body").children().length > 30) {
			$("body img:first-of-type").remove();
		}
	});
})