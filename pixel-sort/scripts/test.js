var img;
function preload() {
	createCanvas(600,600);
  img = loadImage("assets/arches2.jpg");
}

function setup() {
  image(img, 0, 0);
  var halfImage = 4 * (img.width * pixelDensity()) *
    (img.height * pixelDensity()/2);
  loadPixels();
  for (var i = 0; i < halfImage; i++) {
    pixels[i+halfImage] = pixels[i];
  }
  updatePixels();
}
