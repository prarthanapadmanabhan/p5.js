function setup() {
  createCanvas(500, 300);
  background(220);

  // Main bus body
  fill(240, 210, 100); // yellow
  rect(50, 100, 400, 100, 20); // x, y, w, h, rounded corners

  // Windows
  fill(200); // light gray
  rect(120, 120, 60, 40, 5);
  rect(320, 120, 60, 40, 5);

  // Wheels
  fill(0); // black
  ellipse(150, 220, 60, 60);
  ellipse(350, 220, 60, 60);

  // Side lights
  fill(255, 255, 150); // pale yellow
  ellipse(50, 150, 20, 20);
  ellipse(450, 150, 20, 20);
}