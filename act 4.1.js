let img;
let posterizedImg;

function preload() {
  img = loadImage('https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww');
}

function setup() {
  createCanvas(800, 600);
  posterizedImg = createGraphics(img.width, img.height);

  applyPosterization(posterizedImg, img, 4); // using 4 levels
}

function draw() {
  background(255);
  image(posterizedImg, 0, 0, 800, 600);
}

// Posterization function
function applyPosterization(gfx, sourceImg, levels) {
  gfx.image(sourceImg, 0, 0);
  gfx.loadPixels();

  for (let y = 0; y < gfx.height; y++) {
	for (let x = 0; x < gfx.width; x++) {
  	let index = (x + y * gfx.width) * 4;
  	gfx.pixels[index] = floor(gfx.pixels[index] / (256 / levels)) * (256 / levels);
  	gfx.pixels[index + 1] = floor(gfx.pixels[index + 1] / (256 / levels)) * (256 / levels);
  	gfx.pixels[index + 2] = floor(gfx.pixels[index + 2] / (256 / levels)) * (256 / levels);
	}
  }

  gfx.updatePixels();
}

