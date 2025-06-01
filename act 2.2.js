let x = -500; // start off-screen

function setup() {
  createCanvas(500, 300);
}

function draw() {
  background(220);

  // Move the bus
  x += 2;
  if (x > width + 100) {
	x = -500; // reset position when off-screen
  }

  // Main bus body
  fill(240, 210, 100); // yellow
  rect(x + 50, 100, 400, 100, 20); // x, y, w, h, rounded corners

  // Windows
  fill(200); // light gray
  rect(x + 120, 120, 60, 40, 5);
  rect(x + 320, 120, 60, 40, 5);

  // Wheels
  fill(0); // black
  ellipse(x + 150, 220, 60, 60);
  ellipse(x + 350, 220, 60, 60);

  // Side lights
  fill(255, 255, 150); // pale yellow
  ellipse(x + 50, 150, 20, 20);
  ellipse(x + 450, 150, 20, 20);
}
