let gfx, seed, of;

function drawTriangle(fountain, particle) {
  // fill(fountain.colors[Math.floor(particle.life*fountain.colors.length)]);
  // noStroke();
  let r = particle.partSize/2, x=particle.location.x, y=particle.location.y;
  if (particle.angle == undefined) {
    particle.angle = random(0, 360);
  }
  // triangle(x-r,y-r, x+r,y-r, x,y+r);
  let p = new brush.Polygon([
    [x-r, y-r],
    [x+r, y-r],
    [x, y+r],  
  ]);
  let polygons = [p];
  // brush.stroke("red");
  
  // brush.fill(fountain.colors[Math.floor(particle.life*fountain.colors.length)]);
  // brush.triangle(x-r,y-r, x+r,y-r, x,y+r);
  brush.setHatch("rotring", options.foreground, 3);
  push();
  brush.rotate(particle.angle);
  // console.log(particle);
  brush.hatchArray(polygons);
  pop();
}

const startupParameters = {
  xSize: 600,
  ySize: 600,
  resizeCanvas: function() {
    createCanvas(startupParameters.xSize, startupParameters.ySize, WEBGL);
    frameRate(30);
    pixelDensity(1);
    angleMode(DEGREES);
    brush.scaleBrushes(1.5);
    brush.field("zigzag"); //curved, truncated, zigzag, seabed, waves
    console.log(brush.box());
    // brush.pick("rotring");
    
    // let p = { color:["blue"], angle: [-50, 50] };
    // of = new Fountain(null, p, 40, 100);
    Fountain_display("triangle", drawTriangle);
    let p = {
      color:['yellow', 'blue'],
      angle: [0, 360],
      shape: 'triangle',
      size: [80,90],
      sizePercent: 0.99,
      lifetime: 30,
      acceleration: 1,
      speed: 10,
      rate: [1, 1]
    };
    of = new Fountain(null, p, 0, 0); //origin for the Fountain
  }
}

const options = {
  background: '#585B56',
  foreground: '#D7AF70',
  restart: function () {
    seed = Math.random() * 100000;
    randomSeed(seed);
    // reset();
    background(options.background);
  },
  save: function () {
    saveCanvas(`${new Date().getFullYear()}_Genuary01_seed-${seed}_date-${Date.now()}`, 'png');
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
folder1.add(options, 'loadImage');
folder1.addColor(options, 'background');
folder1.addColor(options, 'foreground');
folder1.open();
gui.add(options, 'restart');
gui.add(options, 'save');

function setup() {
  startupParameters.resizeCanvas();
  options.restart();
}

function draw() {
  // gfx.background(111);
  // gfx.fill(255,0,0);
  // gfx.box();
  background(options.background);
  push();
  of.CreateN();
  // of.Create();
  of.Step();
  of.Draw();
  pop();
  // image(gfx, -(startupParameters.xSize / 2), -(startupParameters.ySize / 2));
}