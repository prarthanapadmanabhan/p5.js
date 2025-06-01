let img;
let pointillismImg;

function preload() {
  img = loadImage('https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww');
}

function setup() {
  createCanvas(800, 600);
  pointillismImg = createGraphics(img.width, img.height);

  applyPointillism(pointillismImg, img);
}

function draw() {
  background(255);
  image(pointillismImg, 0, 0, 800, 600);
}

// Pointillism effect function
function applyPointillism(gfx, sourceImg) {
  gfx.loadPixels();
  sourceImg.loadPixels();

  for (let i = 0; i < 10000; i++) { // number of dots
	let x = floor(random(sourceImg.width));
	let y = floor(random(sourceImg.height));
	let index = (x + y * sourceImg.width) * 4;

	let r = sourceImg.pixels[index];
	let g = sourceImg.pixels[index + 1];
	let b = sourceImg.pixels[index + 2];

	gfx.noStroke();
	gfx.fill(r, g, b);
	gfx.ellipse(x, y, 4, 4); // dot size
  }

  gfx.updatePixels();
}

