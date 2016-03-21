var img;
var column = 0;
var row = 0;
// var blackValue = 777216;
var blackValue;
// var brightnessValue = 50; //0-255
var brightnessValue = 25; //0-255
var brightnessValueUp = true;

var imgBuffer;
var imgDisplay;

var mode=1;

function preload() {
	img = loadImage("assets/arches2.jpg");
	// blackValue = color(11, 220, 0, 255);
	blackValue = color(175, 175, 0, 255);
}

function setup() {
	createCanvas(img.width, img.height);
	imgBuffer = createImage(img.width, img.height);
	imgDisplay = createImage(img.width, img.height);
	copyImage(img, imgBuffer);
	copyImage(imgBuffer, imgDisplay);

	image(imgDisplay,0,0);
}

function draw() {
	//need to use an image buffer for this
	// copyImage(img, imgBuffer);
	// imgBuffer.loadPixels();
	if (brightnessValueUp) {
		brightnessValue++;
	}
	else {
		brightnessValue--;
	}
	if (brightnessValue > 255) {
		brightnessValue = 255;
		brightnessValueUp = false;
	}
	if (brightnessValue < 0) {
		brightnessValue = 0;
		brightnessValueUp = true;
	}
	// console.log(brightnessValue);
	while (column < width-1) {
		imgBuffer.loadPixels();
		sortColumn(imgBuffer);
		column++;
		imgBuffer.updatePixels();
	}

	while (row < height-1) {
		imgBuffer.loadPixels();
		sortRow(imgBuffer);
		row++;
		imgBuffer.updatePixels();
	}
	
	copyImage(imgBuffer, imgDisplay);
	image(imgDisplay, 0, 0);
}

function sortColumn(image) {
	var x = column;
	var y = 0;
	var yend = 0;

	while (yend < height - 1) {
		switch(mode) {
			case 0:
				y = getFirstNotBlackY(image,x, y);
		    yend = getNextBlackY(image,x, y);
		    break;
		  case 1:
		  	y = getFirstBrightY(image,x, y);
        yend = getNextDarkY(image,x, y);
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
			unsorted[i] = getColorAtPixel(image,x,y+i);
			// unsorted[i] = color(img.pixels[4*x + 4*(y+i)*img.width],
			// 										img.pixels[4*x + 4*(y+i)*img.width + 1],
			// 										img.pixels[4*x + 4*(y+i)*img.width + 2],
			// 										img.pixels[4*x + 4*(y+i)*img.width + 3]);
		}

		sorted = unsorted.sort(function(c1, c2) {
			if (brightness(c1) < brightness(c2)) {
				return -1;
			}
			if (brightness(c1) > brightness(c2)) {
				return 1;
			}
			return 0;
		});

		for (var i = 0; i < sortLength; i++) {
			image.pixels[4*x + 4*(y+i)*image.width] = red(sorted[i]);
			image.pixels[4*x + 4*(y+i)*image.width + 1] = green(sorted[i]);
			image.pixels[4*x + 4*(y+i)*image.width + 2] = blue(sorted[i]);
			image.pixels[4*x + 4*(y+i)*image.width + 3] = alpha(sorted[i]);
		}
		image.updatePixels();

		y = yend + 1;
	}
}

function sortRow(image) {
	var x = 0;
	var y = row;
	var xend = 0;
	while (xend < width-1) {
		switch(mode) {
			case 0:
				x = getFirstNotBlackX(image,x, y);
		    xend = getNextBlackX(image,x, y);
		    break;
		  case 1:
		  	x = getFirstBrightX(image,x, y);
        xend = getNextDarkX(image,x, y);
       	break;
      default:
      	break;
		}

		if (x < 0 || xend < 0) break;

		var sortLength = xend -x;
		var unsorted = new Array(sortLength);

		for (var i = 0; i < sortLength; i++) {
			unsorted[i] = getColorAtPixel(image,x+i, y);
			// unsorted[i] = color(img.pixels[4*(x+i) + 4*y*img.width],
			// 										img.pixels[4*(x+i) + 4*y*img.width + 1],
			// 										img.pixels[4*(x+i) + 4*y*img.width + 2],
			// 										img.pixels[4*(x+i) + 4*y*img.width + 3]);
		}

		var sorted = sort(unsorted);
		
		for (var i = 0; i < sortLength; i++) {
			image.pixels[4*(x+i) + 4*y*image.width] = red(sorted[i]);
			image.pixels[4*(x+i) + 4*y*image.width + 1] = green(sorted[i]);
			image.pixels[4*(x+i) + 4*y*image.width + 2] = blue(sorted[i]);
			image.pixels[4*(x+i) + 4*y*image.width + 3] = alpha(sorted[i]);
		}
		image.updatePixels();

		x = xend + 1;
	}
}

function getFirstNotBlackY(image, x, y) {
	if (y < height) {
		var c = getColorAtPixel(image,x,y);
		while (c > blackValue) {
			y++;
			if(y >= height) return height-1;
			var c = getColorAtPixel(image,x,y);
		}
	}
	return y-1;
}

function getNextBlackY(image, x, y) {
  y++;
  if (y < height) {
  	var c = getColorAtPixel(image,x,y);
		while (c < blackValue) {
			y++;
			if(y >= height) return height-1;
			var c = getColorAtPixel(image,x,y);
		} 
	}
	return y-1;
}

function getFirstNotBlackX(image, x, y) {
	var c = getColorAtPixel(image,x,y);
	while (c > blackValue) {
		x++;
		if (x >= width) return -1;
		var c = getColorAtPixel(image,x,y);
	} 
	return x;
}

function getNextBlackX(image, x, y) {
	x++;
	var c = getColorAtPixel(image,x,y);
	while (c < blackValue) {
		x++;
		if (x >= width) return -1;
		var c = getColorAtPixel(image,x,y);
	}
	return x-1;
}

//brightness
function getFirstBrightX(image, x, y) {
	var c = getColorAtPixel(image,x,y);
	while (brightness(c) < brightnessValue) {
		x++;
		if (x >= width) return -1;
		c = getColorAtPixel(image,x,y);
	}
	return x;
}

function getNextDarkX(image, x, y) {
	x++;
	c = getColorAtPixel(image,x,y);
	while (brightness(c) > brightnessValue) {
		x++;
		if (x >= width) return width-1;
		c = getColorAtPixel(image,x,y);
	}
	return x-1;
}

function getFirstBrightY(image, x, y) {
	c = getColorAtPixel(image,x,y);
	if (y < height) {
		while (brightness(c) < brightnessValue) {
			y++;
			if (y >= height) return -1;
			c = getColorAtPixel(image,x,y);
		}
	}
	return y;
}

function getNextDarkY(image, x, y) {
	y++;
	c = getColorAtPixel(image,x,y);
	if (y < height) {
		while (brightness(c) > brightnessValue) {
			y++;
			if (y >= height) return height-1;
			c = getColorAtPixel(image,x,y);
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

function copyImage(imageSrc, imageDest) {
	imageSrc.loadPixels();
	imageDest.loadPixels();

	for (var i = 0; i < imageSrc.pixels.length; i++) {
		imageDest.pixels[i] = imageSrc.pixels[i];
	}

	imageDest.updatePixels();
}
