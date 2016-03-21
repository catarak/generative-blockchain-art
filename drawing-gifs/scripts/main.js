var gif;
var pointCount = 1;
var x;
var y;
var curvePointX = 0;
var curvePointY = 0;

function preload() {
	gif = loadGif('assets/yelle.gif');
}

function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(480, 270);
	noFill();
	smooth();
	// colorMode(HSB, 360, 100, 100);
}

function draw() {

	if (gif.loaded()) {
		if (x === undefined || y === undefined) {
			x = gif.width/2;
			y = gif.height/2;
		}
		// image(gif, 0, 0);
		gif.loadPixels();
		
		var c = getColorAtPixel(gif, x, y);

		strokeWeight(hue(c)/50);
		stroke(c);

		// diffusion = map(mouseY, 0, height, 5, 100);
		diffusion = 10;

		beginShape();
		curveVertex(x,y);
		curveVertex(x,y);
		for (var i = 0; i < pointCount; i++) {
			var rx = int(random(-diffusion, diffusion));
			curvePointX = constrain(x+rx, 0, width-1);
			var ry = int(random(-diffusion, diffusion));
			curvePointY = constrain(y+ry, 0, height-1);
			curveVertex(curvePointX, curvePointY);
		}
		curveVertex(curvePointX, curvePointY);
		endShape();

		x = curvePointX;
		y = curvePointY;
	}
}

function keyReleased() {
	if (keyCode == UP_ARROW) {
    pointCount = min(pointCount+1, 30);
  } else if (keyCode == DOWN_ARROW) {
    pointCount = max(pointCount-1, 1); 
  }
  console.log(pointCount);
	return false;
}

function getColorAtPixel(image,x,y) {
	var c = color(image.pixels[4*x + 4*y*image.width],    	  //r
									image.pixels[4*x + 4*y*image.width + 1],	//g
									image.pixels[4*x + 4*y*image.width + 2],  //b
									image.pixels[4*x + 4*y*image.width + 3]); //a
	return c;
}