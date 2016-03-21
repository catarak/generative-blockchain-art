var img;
var imgDisplay;
var imgBuffer;
var column = 0;
var row = 0;
// var blackValue = 777216;
var blackValue;
var brightnessValue = 60; //0-255

var mode=1;

function preload() {
	img = loadImage("assets/arches2.jpg");
	// blackValue = color(11, 220, 0, 255);
	blackValue = color(175, 175, 0, 255);
	pixelDensity(1);
}

function setup() {
	imgBuffer = createImage(img.width, img.height);
	imgDisplay = createImage(img.width, img.height);
	createCanvas(img.width, img.height);
	// image(img, 0, 0);

	loadBuffer(img);
	displayBuffer();

	image(imgDisplay, 0, 0);
}

function draw() {
	imgBuffer.loadPixels();
	while (column < width-1) {
		sortColumn();
		column++;
	}

	while (row < height-1) {
		sortRow();
		row++;
	}
}

function sortColumn() {
	var x = column;
	var y = 0;
	var yend = 0;

	while (yend < height - 1) {
		switch(mode) {
			case 0:
				y = getFirstNotBlackY(x, y);
		    yend = getNextBlackY(x, y);
		    break;
		  case 1:
		  	y = getFirstBrightY(x, y);
        yend = getNextDarkY(x, y);
       	break;
      default:
      	break;
		}

		if (y < 0 || yend < 0) break;

		var sortLength = yend-y;

		var unsorted = new Array(sortLength);
		// var sorted = new Array(sortLength);

		for (var i = 0; i < sortLength; i++) {
			// unsorted[i] = img.pixels[x + (y+i) * img.width];
			unsorted[i] = getColorAtPixel(imgBuffer,x,y+i);
			// unsorted[i] = color(img.pixels[4*x + 4*(y+i)*img.width],
			// 										img.pixels[4*x + 4*(y+i)*img.width + 1],
			// 										img.pixels[4*x + 4*(y+i)*img.width + 2],
			// 										img.pixels[4*x + 4*(y+i)*img.width + 3]);
		}

		sorted = sort(unsorted);

		for (var i = 0; i < sortLength; i++) {
			img.pixels[4*x + 4*(y+i)*img.width] = red(sorted[i]);
			img.pixels[4*x + 4*(y+i)*img.width + 1] = green(sorted[i]);
			img.pixels[4*x + 4*(y+i)*img.width + 2] = blue(sorted[i]);
			img.pixels[4*x + 4*(y+i)*img.width + 3] = alpha(sorted[i]);
		}
		img.updatePixels();

		y = yend + 1;
	}
}

function sortRow() {
	var x = 0;
	var y = row;
	var xend = 0;
	while (xend < width-1) {
		switch(mode) {
			case 0:
				x = getFirstNotBlackX(x, y);
		    xend = getNextBlackX(x, y);
		    break;
		  case 1:
		  	x = getFirstBrightX(x, y);
        xend = getNextDarkX(x, y);
       	break;
      default:
      	break;
		}

		if (x < 0 || xend < 0) break;

		var sortLength = xend -x;
		var unsorted = new Array(sortLength);

		for (var i = 0; i < sortLength; i++) {
			unsorted[i] = getColorAtPixel(x+i, y);
			// unsorted[i] = color(img.pixels[4*(x+i) + 4*y*img.width],
			// 										img.pixels[4*(x+i) + 4*y*img.width + 1],
			// 										img.pixels[4*(x+i) + 4*y*img.width + 2],
			// 										img.pixels[4*(x+i) + 4*y*img.width + 3]);
		}

		var sorted = sort(unsorted);
		
		for (var i = 0; i < sortLength; i++) {
			img.pixels[4*(x+i) + 4*y*img.width] = red(sorted[i]);
			img.pixels[4*(x+i) + 4*y*img.width + 1] = green(sorted[i]);
			img.pixels[4*(x+i) + 4*y*img.width + 2] = blue(sorted[i]);
			img.pixels[4*(x+i) + 4*y*img.width + 3] = alpha(sorted[i]);
		}
		img.updatePixels();

		x = xend + 1;
	}
}

function getFirstNotBlackY(x, y) {
	if (y < height) {
		var c = getColorAtPixel(imgBuffer,x,y);
		while (c > blackValue) {
			y++;
			if(y >= height) return height-1;
			var c = getColorAtPixel(imgBuffer,x,y);
		}
	}
	return y-1;
}

function getNextBlackY(x, y) {
  y++;
  if (y < height) {
  	var c = getColorAtPixel(imgBuffer,x,y);
		while (c < blackValue) {
			y++;
			if(y >= height) return height-1;
			var c = getColorAtPixel(imgBuffer,x,y);
		} 
	}
	return y-1;
}

function getFirstNotBlackX(x, y) {
	var c = getColorAtPixel(imgBuffer,x,y);
	while (c > blackValue) {
		x++;
		if (x >= width) return -1;
		var c = getColorAtPixel(imgBuffer,x,y);
	} 
	return x;
}

function getNextBlackX(x,y) {
	x++;
	var c = getColorAtPixel(imgBuffer,x,y);
	while (c < blackValue) {
		x++;
		if (x >= width) return -1;
		var c = getColorAtPixel(imgBuffer,x,y);
	}
	return x-1;
}

//brightness
function getFirstBrightX(x,y) {
	var c = getColorAtPixel(imgBuffer,x,y);
	while (brightness(c) < brightnessValue) {
		x++;
		if (x >= width) return -1;
		c = getColorAtPixel(imgBuffer,x,y);
	}
	return x;
}

function getNextDarkX(x,y) {
	x++;
	c = getColorAtPixel(imgBuffer,x,y);
	while (brightness(c) > brightnessValue) {
		x++;
		if (x >= width) return width-1;
		c = getColorAtPixel(imgBuffer,x,y);
	}
	return x-1;
}

function getFirstBrightY(x,y) {
	c = getColorAtPixel(imgBuffer,x,y);
	if (y < height) {
		while (brightness(c) < brightnessValue) {
			y++;
			if (y >= height) return -1;
			c = getColorAtPixel(imgBuffer,x,y);
		}
	}
	return y;
}

function getNextDarkY(x,y) {
	y++;
	c = getColorAtPixel(imgBuffer,x,y);
	if (y < height) {
		while (brightness(c) > brightnessValue) {
			y++;
			if (y >= height) return height-1;
			c = getColorAtPixel(imgBuffer,x,y);
		}
	}
	return y-1;
}

function getColorAtPixel(image,x,y) {
	var c = color(image.pixels[4*x + 4*y*image.width],    	  //r
									image.pixels[4*x + 4*y*image.width + 1],	//g
									image.pixels[4*x + 4*y*image.width + 2],  //b
									image.pixels[4*x + 4*y*image.width + 3]); //a
	return c;
}

function loadBuffer(image) {
	image.loadPixels();
	imgBuffer.loadPixels();

	for (var i = 0; i < image.pixels.length; i++) {
		imgBuffer.pixels[i] = image.pixels[i];
	}

	imgBuffer.updatePixels();
}

function displayBuffer() {
	imgDisplay.loadPixels();
	imgBuffer.loadPixels();

	for(var i = 0 ; i < img.pixels.length ; i++){
		imgDisplay.pixels[i] = imgBuffer.pixels[i];	
	}
	imgDisplay.updatePixels();
}