function setup() {
  createCanvas(400, 400);
  background(220);

  // Head
  fill(150, 50, 200); // purple
  ellipse(200, 200, 200, 200);

  // Wider Ears
  fill(100, 50, 100); // darker purple
  ellipse(110, 200, 50, 30); // left ear
  ellipse(290, 200, 50, 30); // right ear

  // Antennas
  fill(150, 50, 200); // same purple
  triangle(130, 130, 80, 60, 110, 100);
  triangle(270, 130, 320, 60, 290, 100);

  // Eye
  fill(255); // white
  ellipse(200, 180, 70, 70);
  fill(0); // black
  ellipse(200, 180, 40, 40);
  fill(255); // small highlight
  ellipse(210, 170, 10, 10);

  // Mouth
  fill(60, 20, 40); // dark mouth
  ellipse(200, 240, 40, 15);
}
