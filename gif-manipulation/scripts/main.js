var gif;

function preload() {
	gif = loadGif('assets/shaq.gif');
	noStroke();
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	if (gif.loaded()) {
		image(gif,0,0);
		gif.loadPixels();
		var offset = 2
		blend(gif, 0, 0, gif.width-offset, gif.height-offset, offset, offset, gif.width, gif.height-offset, "difference");
		// filter(POSTERIZE, 4);
	}
	// if (gif.loaded()) {
	// 	image(gif,0,0);
	// 	var frame = Math.floor(Math.random() * gif.totalFrames());
	// 	gif.frame(frame);
	// }

}

// function mouseMoved() {
// 	var frame = int(map(mouseX, 0, width, 0, gif.totalFrames()));
//   gif.frame(frame);
// }