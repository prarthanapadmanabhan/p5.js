// Declaring variables for the song, FFT (Fast Fourier Transform), and beat detectors
let song;
let fft;
let kickDetector;
let snareDetector;
let voiceDetector;

// Variables for visualization elements
let panels;
let kickBall;
let circle_arr = [];
let sq_arr = [];

// Preload function to load the song
function preload() {
  song = loadSound('Ed Sheeran - Perfect.mp3'); // mp3 file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  // Initializing FFT with the loaded song
  fft = new p5.FFT();
  fft.setInput(song);

  // Initializing beat detectors for kick, snare, and male voice
  kickDetector = new BeatDetect('kick');
  snareDetector = new BeatDetect('snare');
  voiceDetector = new BeatDetect('male');

  // Initializing visualization elements
  panels = new Panels(6);
  kickBall = new BounceBall();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#D4C7D6'); // Pastel background color
  push();
  translate(width * 0.5, height * 0.5);

  // Updating beat detectors and getting beat information
  const kick = kickDetector.update(fft);
  const snare = snareDetector.update(fft);
  const voice = voiceDetector.update(fft);

  // Triggering panel color change on snare beat
  if (snare.isBeat) {
    panels.setColors();
  }
  panels.run();

  // Running bouncing ball animation on kick beat
  kickBall.run(kick.isBeat);

  // Creating beat circles or squares on kick beat
  if (kick.isBeat) {
    if (random(1) <= 0.3) {
      circle_arr.push(new BeatCircle(0, 0));
    } else {
      sq_arr.push(new BeatSquare(0, 0));
    }
  }

  // Updating and displaying beat circles
  for (let i = circle_arr.length - 1; i >= 0; i--) {
    const c = circle_arr[i];
    c.run();
    if (c.isDead()) {
      circle_arr.splice(i, 1);
    }
  }

  // Updating and displaying beat squares
  for (let i = sq_arr.length - 1; i >= 0; i--) {
    const s = sq_arr[i];
    s.run();
    if (s.isDead()) {
      sq_arr.splice(i, 1);
    }
  }

  pop();

  // Displaying spectrum
  showSpectrum(fft);
}

// Function to toggle play/pause on mouse click
function mouseClicked() {
  togglePlay();
}

// Function to toggle play/pause of the song
function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}

// Function to display the audio spectrum
function showSpectrum(fft) {
  let spectrum = fft.analyze();

  noFill();
  strokeWeight(1);
  beginShape();
  stroke(255);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length - 1, 0, width);
    let y = map(spectrum[i], 0, 255, height, height * 0.4);
    vertex(x, y);
  }
  endShape();
}

// Class for bouncing ball animation
class BounceBall {
  constructor() {
    this.maxR = 100;
    this.minR = 10;
    this.r = this.minR;
  }
  run(isBeat = false) {
    this.update(isBeat);
    this.display();
  }
  update(isBeat) {
    if (isBeat) {
      this.r = this.maxR;
    }
    this.r = max(this.r - 2, this.minR);
  }
  display() {
    stroke(240);
    fill(100);
    ellipse(0, 0, this.r, this.r);
  }
}

// Class for color-changing panels
class Panels {
  constructor(n) {
    this.n = n;
    this.lifemax = 300;
    this.life = 0;
    this.colors = [];
    this.setColors(n);
  }
  setColors() {
    this.n = Math.floor(random(5, 9));
    let colors = [];
    for (let i = 0; i < this.n; i++) {
      colors.push(random([
        '#B5C18E', '#EADBC8', '#C7B7A3', '#A87676',
        '#CA8787', '#E1ACAC', '#75A47F', '#B3C8CF',
        '#ffd166', '#A79277'
      ]));
    }
    this.colors = colors;
    this.life = this.lifemax;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.alph = ('0' + Math.floor(map(this.life, this.lifemax, 0, 255, 100)).toString(16)).slice(-2);
    this.life = max(this.life - 4, 0);
  }
  display() {
    push();
    rotate(frameCount * 0.01);
    for (let i = 0; i < this.n; i++) {
      stroke(255);
      strokeWeight(2);
      fill(this.colors[i % this.colors.length] + this.alph);
      arc(0, 0, width + height, width + height,
        ((2 * PI) / this.n) * i,
        ((2 * PI) / this.n) * (i + 1),
        PIE
      );
    }
    pop();
  }
}

// Class for beat squares
class BeatSquare {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.l = 30;
    this.m = 6;
    this.lifespan = 300;
    this.angle = random(PI);
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.l += this.m;
    this.lifespan -= 2.0;
  }
  display() {
    push();
    rotate(this.angle);
    stroke(255, this.lifespan);
    strokeWeight(3);
    noFill();
    square(this.x, this.y, this.l);
    pop();
  }
  isDead() {
    return this.lifespan < 0.0;
  }
}

// Class for beat circles
class BeatCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.m = 6;
    this.lifespan = 300;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.r += this.m;
    this.lifespan -= 2.0;
  }
  display() {
    stroke(255, this.lifespan);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.r, this.r);
  }
  isDead() {
    return this.lifespan < 0.0;
  }
}

// Class for beat detection
class BeatDetect {
  constructor(mode = 'kick', freq2) {
    if (!isNaN(freq2) && !isNaN(mode)) {
      this.freq1 = mode;
      this.freq2 = freq2;
    } else {
      if (mode === 'snare') {
        this.freq1 = 2000;
        this.freq2 = 6000;
      } else if (mode === 'male') {
        this.freq1 = 200;
        this.freq2 = 2000;
      } else {
        // mode === "kick"
        this.freq1 = 20;
        this.freq2 = 80;
      }
    }

    this.time = 0;
    this.threshold = 0;
    this.minThreshold = 0;
    this.decayRate = 0.01;
    this.minThresholdRate = 0.8;
    this.holdTime = 45;
    this.marginThresholdTime = 10;
    this.marginThreshold = 0.06;
  }

  update(fft) {
    const e = fft.getEnergy(this.freq1, this.freq2);
    const level = e / 255.0 || 0.0;
    let isBeat = false;

    if (level > this.threshold && level > this.minThreshold) {
      this.threshold = level * 1.05;
      this.minThreshold = max(this.minThreshold, level * this.minThresholdRate);
      if (this.time > this.marginThresholdTime) {
        isBeat = true;
      }
      this.time = 0;
    } else {
      if (this.time === this.marginThresholdTime) {
        this.threshold -= this.marginThreshold;
      }
      this.time += 1;
      if (this.time > this.holdTime) {
        this.threshold -= this.decayRate;
      }
    }

    return { threshold: this.threshold, level: level, isBeat: isBeat };
  }
}
