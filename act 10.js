let font;
let letters = [];
let fontSize = 120;

function preload() {
  font = loadFont('SourceSansPro-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(fontSize);

  let points = font.textToPoints('BATH SPA UNIVERSITY', 100, height / 2, fontSize, {
    sampleFactor: 0.2,
  });

  for (let pt of points) {
    letters.push(new Letter(pt.x, pt.y));
  }
}

function draw() {
  background(20);

  for (let l of letters) {
    l.update();
    l.show();
    l.checkMouse();
  }
}

class Letter {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.original = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2));
  }

  update() {
    this.pos.add(this.vel);
    // bounce back towards original position
    let towards = p5.Vector.sub(this.original, this.pos).mult(0.02);
    this.vel.add(towards);
    this.vel.limit(5);
  }

  checkMouse() {
    let mouse = createVector(mouseX, mouseY);
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (d < 50) {
      let away = p5.Vector.sub(this.pos, mouse).setMag(0.5);
      this.vel.add(away);
    }
  }

  show() {
    fill(255, 200, 250);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
