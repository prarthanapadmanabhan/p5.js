function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noStroke();
  drawPattern();
}

function draw() {
  // Intentionally left blank
}

function drawPattern() {
  background("#F0F0F0");

  let cols = 12;
  let rows = 12;
  let w = width / cols;
  let h = height / rows;

  for (let i = 0; i < cols; i++) {
	for (let j = 0; j < rows; j++) {
  	let x = i * w + w / 2;
  	let y = j * h + h / 2;

  	push();
  	translate(x, y);

  	if ((i + j) % 2 == 0) {
    	fill(random(100, 255), random(100, 200), random(100, 255), 180);
    	let radius = min(w, h) * 0.4 * random(0.5, 1);
    	ellipse(0, 0, radius, radius);
  	} else {
    	fill(random(100, 255), random(100, 255), random(100, 200), 180);
    	rotate(radians(random(0, 360)));
    	let size = min(w, h) * 0.5 * random(0.5, 1);
    	rectMode(CENTER);
    	rect(0, 0, size, size);
  	}

  	pop();
	}
  }
}

function mousePressed() {
  drawPattern();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawPattern();
}
