var gif;
var previousFrame;
var numPixels;

function preload() {
	gif = loadGif('assets/yelle.gif');
}

function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(480, 270);
	frameRate(30);
}

function draw() {

	if (gif.loaded()) {
		gif.loadPixels();
		numPixels = gif.width * gif.height;
		if (!previousFrame) {
			previousFrame = new Array(numPixels*4);
			for (var i = 0; i < previousFrame.length; i++) {
				if (i%4 === 3) {
					previousFrame[i] = 255;
				}
				else {
					previousFrame[i] = 0;
				}
			}
		}
		
		var movementSum = 0;
		for (var i = 0; i < numPixels; i++) {
			var currColor = getColorAtPixel(gif.pixels, i);
			var prevColor = getColorAtPixel(previousFrame, i);

			var currR = red(currColor);
			var currG = green(currColor);
			var currB = blue(currColor);

			var prevR = red(prevColor);
			var prevG = green(prevColor);
			var prevB = blue(prevColor);

			var diffR = abs(currR - prevR);
			var diffG = abs(currG - prevG);
			var diffB = abs(currB - prevB);

			// if (!diffR && diffR !== 0 || !diffG && diffG || !diffB && diffB) {
			// 	debugger;
			// }
			movementSum += diffR + diffG + diffB;
			gif.pixels[4*i] = diffR;
			gif.pixels[4*i+1] = diffG;
			gif.pixels[4*i+2] = diffB;
			gif.pixels[4*i+3] = 255;

			previousFrame[4*i] = red(currColor);
			previousFrame[4*i+1] = green(currColor);
			previousFrame[4*i+2] = blue(currColor);
			previousFrame[4*i+3] = alpha(currColor);
		}

		if (movementSum > 0) {
			gif.updatePixels();
			image(gif,0,0);
		}
	}
}

function getColorAtPixel(pixels,i) {
	var c = color(pixels[4*i],    	  //r
								pixels[4*i + 1],	//g
								pixels[4*i + 2],  //b
								pixels[4*i + 3]); //a
	return c;
}