let font;
let points;
let fontSize = 65;
let amplitude = 10;

function preload() {
  font = loadFont('SourceSansPro-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);

  // Get raw points first
  points = font.textToPoints('BATH SPA UNIVERSITY', 0, 0, fontSize, {
    sampleFactor: 0.2,
    simplifyThreshold: 0
  });

  // Calculate bounding box
  let bounds = getBounds(points);

  // Center points on screen
  for (let i = 0; i < points.length; i++) {
    points[i].x += width / 2 - bounds.cx;
    points[i].y += height / 2 - bounds.cy;
  }
}

function draw() {
  background("#FFF4E0");

  let time = millis() / 1000;

  noStroke();
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let angle = atan2(pt.y - height / 2, pt.x - width / 2);
    let offset = sin(time * 2 + i * 0.1) * amplitude;

    let newX = pt.x + cos(angle) * offset;
    let newY = pt.y + sin(angle) * offset;

    let r = map(sin(time + i * 0.05), -1, 1, 100, 255);
    let g = map(cos(time + i * 0.1), -1, 1, 100, 255);
    let b = map(sin(time + i * 0.1), -1, 1, 200, 255);

    fill(r, g, b);
    ellipse(newX, newY, 5, 5);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Helper to get bounding box center
function getBounds(pts) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

  for (let p of pts) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  return {
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2
  };
}
