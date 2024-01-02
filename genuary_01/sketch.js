let gfx, seed;

const startupParameters = {
  xSize: 600,
  ySize: 600,
  resizeCanvas: function() {
    createCanvas(startupParameters.xSize, startupParameters.ySize, WEBGL);
    frameRate(60);
    pixelDensity(1);
    
    background(options.background);
    angleMode(DEGREES);
    brush.scaleBrushes(1.5);
    brush.field("waves"); //curved, truncated, zigzag, seabed, waves
    // brush.noField();
  }
}

const options = {
  background: '#464343',
  foreground: '#464343',
  color1: "#FF8360",
  color2: "#E8E288",
  color3: "#7DCE82",
  color4: "#3CDBD3",
  color5: "#00FFF5",
  restart: function () {
    seed = Math.random() * 100000;
    randomSeed(seed);
    background(options.background);
    subloop = false;
    loop();
  },
  save: function () {
    saveCanvas(`${new Date().getFullYear()}_Genuary01_seed-${seed}_date-${Date.now()}`, 'png');
  },
  loadImage: function() {
    document.getElementById('fileselector').click();
  }
}

// Creating a GUI with options.
let gui = new dat.GUI({name: 'Customization'});
let startupParameterFolder = gui.addFolder('canvas options');
gui.remember(startupParameters);
startupParameterFolder.add(startupParameters, 'xSize', 200);
startupParameterFolder.add(startupParameters, 'ySize', 200);
startupParameterFolder.add(startupParameters, 'resizeCanvas');
let folder1 = gui.addFolder('Setup options');
gui.remember(options);
folder1.addColor(options, 'background');
folder1.addColor(options, 'foreground');
folder1.addColor(options, 'color1');
folder1.addColor(options, 'color2');
folder1.addColor(options, 'color3');
folder1.addColor(options, 'color4');
folder1.addColor(options, 'color5');
folder1.open();
gui.add(options, 'restart');
gui.add(options, 'save');

function setup() {
  startupParameters.resizeCanvas();
  options.restart();
}

let subloop = false;
let currentY = 0;
function draw() {
  if (!subloop) {
    background(options.background);
    subloop = true;
    currentY = 0;
  }
  let palette = [options.color1, options.color2, options.color3, options.color4, options.color5];
  translate(-width/2,-height/2);
  brush.noStroke();
  brush.noHatch();
  let randY = random(40, 60);
  randY = random(30, 70);
  let randX = random(20, 50);
  for (let x = 0; x < startupParameters.ySize; x += randX) {
    brush.fill(random(palette), random(60, 100));
    brush.rect(x, currentY, randY, randX, CENTER);
    // fill(random(palette));
    // rect(x, y, randY, randX);
    randX = random(20, 50);
  }
  currentY += randY;

  if (currentY >= startupParameters.xSize + randY) {
    noLoop();
  }
}