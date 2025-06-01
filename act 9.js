let danceForms = [
  "Bharatanatyam", "Kathak", "Kathakali", "Kuchipudi", 
  "Mohiniyattam", "Odissi", "Manipuri", "Sattriya", 
  "Bhangra", "Garba", "Lavani", "Ghoomar", "Yakshagana"
];
let values = [85, 75, 70, 65, 60, 80, 55, 50, 90, 85, 60, 70, 45];
let barColors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#F1E5D1');
  generatePastelColors();
}

function draw() {
  background('#F1E5D1');
  drawBarChart();
  noLoop(); // Only draw once
}

function generatePastelColors() {
  for (let i = 0; i < danceForms.length; i++) {
    let r = random(150, 255);
    let g = random(150, 255);
    let b = random(150, 255);
    barColors.push(color(r, g, b));
  }
}

function drawBarChart() {
  let barWidth = (width - 100) / danceForms.length - 10;
  let startX = 50;
  let startY = height - 50;
  let cornerRadius = 10;

  // Draw title
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Favorite Indian Dance Forms", width / 2, 30);

  // Draw bars
  for (let i = 0; i < danceForms.length; i++) {
    let barHeight = map(values[i], 0, 100, 0, height - 120);

    // Draw shadow
    fill(200);
    stroke(1);
    rect(startX + i * (barWidth + 10) + 5, startY - barHeight + 1, barWidth, barHeight, cornerRadius);

    // Draw bar
    noStroke();
    fill(barColors[i]);
    rect(startX + i * (barWidth + 10), startY - barHeight, barWidth, barHeight, cornerRadius);

    // Draw value labels
    textSize(12);
    textAlign(CENTER);
    fill(0);
    text(values[i] + "%", startX + i * (barWidth + 10) + barWidth / 2, startY - barHeight - 10);

    // Draw dance form labels rotated for readability
    push();
    translate(startX + i * (barWidth + 10) + barWidth / 2, startY + 10);
    rotate(-PI / 4);
    textSize(10);
    textAlign(LEFT);
    text(danceForms[i], 0, 0);
    pop();
  }
}
