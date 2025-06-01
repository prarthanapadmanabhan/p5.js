function setup() {
  createCanvas(400, 400);
  background(220);

  // Car body (main rectangle)
  fill(139, 0, 0); // dark red
  rect(100, 200, 200, 50, 15); // x, y, w, h, rounded corners

  // Car cabin (rectangle)
  fill(178, 34, 34); // red
  rect(130, 150, 140, 50);

  // Car top (semi-circle)
  fill(178, 34, 34); // red
  arc(200, 150, 140, 70, PI, 0);

  // Windows
  fill(173, 216, 230); // light blue
  rect(140, 160, 30, 30);
  rect(230, 160, 30, 30);

  // Wheels
  fill(0); // black
  ellipse(150, 250, 50, 50);
  ellipse(250, 250, 50, 50);

  // Wheel hubs
  fill(169, 169, 169); // grey
  ellipse(150, 250, 20, 20);
  ellipse(250, 250, 20, 20);
}
