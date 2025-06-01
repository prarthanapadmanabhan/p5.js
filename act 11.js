let font;
let fontPoints = [];
let fontSize = 120;
let stars = [];

function preload() {
  font = loadFont('SourceSansPro-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(fontSize);

  fontPoints = font.textToPoints('BATH SPA UNIVERSITY', width / 2 - 400, height / 2, fontSize, {
    sampleFactor: 0.2,
  });

  for (let i = 0; i < 300; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(10);

  // draw stars
  for (let s of stars) {
    s.update();
    s.show();
  }

  // glowing text
  let time = millis() / 1000;
  noStroke();
  for (let i = 0; i < fontPoints.length; i++) {
    let pt = fontPoints[i];
    let glow = sin(time * 2 + i * 0.1) * 50 + 150;
    fill(glow, glow, 255, 200);
    ellipse(pt.x, pt.y, 3);
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.speed = random(0.5, 2);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
