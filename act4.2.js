let img;
let processedImg;

function preload() {
  img = loadImage('https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww');
}

function setup() {
  createCanvas(800, 600);
  processedImg = createImage(img.width, img.height);

  img.loadPixels();
  processedImg.loadPixels();

  for (let y = 0; y < img.height; y++) {
	for (let x = 0; x < img.width; x++) {
  	let index = (x + y * img.width) * 4;

  	let r = img.pixels[index];
  	let g = img.pixels[index + 1];
  	let b = img.pixels[index + 2];

  	// Invert the colors
  	processedImg.pixels[index] = 255 - r;
  	processedImg.pixels[index + 1] = 255 - g;
  	processedImg.pixels[index + 2] = 255 - b;
  	processedImg.pixels[index + 3] = 255; // alpha stays full
	}
  }

  processedImg.updatePixels();
}

function draw() {
  background(255);
  image(processedImg, 0, 0, 800, 600);
}
