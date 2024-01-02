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
    brush.field("waves");
  }
}

const options = {
  background: '#212121',
  foreground: '#ffae23',
  color1: "#2c695a",
  color2: "#4ad6af",
  color3: "#7facc6",
  color4: "#4e93cc",
  color5: "#f6684f",
  color6: "#ffd300",
  restart: function () {
    seed = Math.random() * 100000;
    randomSeed(seed);
    background(options.background);
  },
  save: function () {
    saveCanvas(`${new Date().getFullYear()}_seed-${seed}_date-${Date.now()}`, 'png');
  },
  loadImage: function() {
    document.getElementById('fileselector').click();
  }
}

// Creating a GUI with options.
var gui = new dat.GUI({name: 'Customization'});
var startupParameterFolder = gui.addFolder('canvas options');
gui.remember(startupParameters);
startupParameterFolder.add(startupParameters, 'xSize', 200);
startupParameterFolder.add(startupParameters, 'ySize', 200);
startupParameterFolder.add(startupParameters, 'resizeCanvas');
var folder1 = gui.addFolder('Setup options');
gui.remember(options);
folder1.addColor(options, 'background');
folder1.addColor(options, 'foreground');
folder1.addColor(options, 'color1');
folder1.addColor(options, 'color2');
folder1.addColor(options, 'color3');
folder1.addColor(options, 'color4');
folder1.addColor(options, 'color5');
folder1.addColor(options, 'color6');
folder1.open();
gui.add(options, 'restart');
gui.add(options, 'save');

function setup() {
  startupParameters.resizeCanvas();
  options.restart();
}

function draw() {
  let palette = [options.color1, options.color2, options.color3, options.color4, options.color5, options.color6];
  translate(-width/2,-height/2);
  
  // brush.box() returns an array with available brushes
  let available_brushes = brush.box();
  console.log(available_brushes);
  
  // Set the stroke to a random brush, color, and weight = 1
  // You set a brush like this: brush.set(name_brush, color, weight)  
  brush.set(random(available_brushes), random(palette), 1);
  // brush.set("hatch_brush", random(palette), 1);

  // Draw a random flowLine (x, y, length, direction)
  brush.flowLine(random(width), random(height), random(300,800), random(0,360))

  // image(gfx, 0, 0);
}