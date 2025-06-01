let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  // Gradient background: orange at bottom to deep purple at top
  setGradient(0, 0, width, height, color(230, 100, 40), color(90, 30, 70));

  // Add new square particle at mouse
  particles.push(new Particle(mouseX, mouseY));

  // Update and draw particles (backwards loop to remove finished)
  for (let i = particles.length - 1; i >= 0; i--) {
	particles[i].update();
	particles[i].show();

	if (particles[i].isFinished()) {
  	particles.splice(i, 1);
	}
  }
}

// Particle class - squares now
class Particle {
  constructor(x, y) {
	this.x = x;
	this.y = y;
	this.vx = random(-1.5, 1.5);
	this.vy = random(-1.5, 1.5);
	this.alpha = 255;
	this.size = random(15, 40);
	// Fiery orange-ish colors with random saturation & brightness for variety
	this.color = color(
  	random(30, 40),  // Hue around orange
  	random(80, 100), // High saturation
  	random(70, 90),  // Brightness
  	this.alpha
	);
  }

  update() {
	this.x += this.vx;
	this.y += this.vy;
	this.alpha -= 4; // fade out a bit faster
  }

  isFinished() {
	return this.alpha < 0;
  }

  show() {
	fill(hue(this.color), saturation(this.color), brightness(this.color), this.alpha);
	rect(this.x, this.y, this.size, this.size);
  }
}

// Helper function to draw vertical gradient
function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
	let inter = map(i, y, y + h, 0, 1);
	let c = lerpColor(c2, c1, inter); // from top to bottom
	stroke(c);
	line(x, i, x + w, i);
  }
}

