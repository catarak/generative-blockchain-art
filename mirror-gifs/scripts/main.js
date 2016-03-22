var gif;
var cellSize = 10;
var cellOverlap = 3;
var cols;
var rows;

function preload() {
	gif = loadGif('assets/yelle.gif');
}

function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(480, 270);
	frameRate(30);
	cols = int(width/cellSize);
	rows = int(height/cellSize);

	background(0);
}

function draw() {

	if (gif.loaded()) {
		gif.loadPixels();
		// image(gif,0,0);

		for (var i = 0; i < cols; i++) {
			for (var j = 0; j < rows; j++) {
				var x = i*cellSize;
				var y = j*cellSize;
				// var d = getColorAtPixel(gif, gif.width - x - 1, y*gif.width);
				var d = getColorAtPixel(gif, x, y);
				var c = color(red(d), green(d), blue(d), 75);

				push();
				translate(x+cellSize/2, y+cellSize/2);
				rotate((2 * PI * brightness(c) / 255.0));
				rectMode(CENTER);
				fill(c);
				noStroke();
				rect(0,0,cellSize+cellOverlap, cellSize+cellOverlap);
				pop();

				// rectMode(CENTER);
				// fill(c);
				// noStroke();
				// rect(x,y,cellSize+6, cellSize+6);
			}
		}
	}
}

function getColorAtPixel(image,x,y) {
	var c = color(image.pixels[4*x + 4*y*image.width],    	  //r
									image.pixels[4*x + 4*y*image.width + 1],	//g
									image.pixels[4*x + 4*y*image.width + 2],  //b
									image.pixels[4*x + 4*y*image.width + 3]); //a
	return c;
}