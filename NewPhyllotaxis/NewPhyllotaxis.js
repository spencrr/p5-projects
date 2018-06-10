let t = 0;

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB);
}

function draw() {
  var gold = PI * (3 - sqrt(5));
  var c = map(sin(t), -1, 1, 1, 20);
  var n = 500;
  
  background(51);
  translate(width/2, height/2);

  for (var i = 0; i < n; i++)
  {
    var a = i * gold;
    var r = c * sqrt(i);

    var x = r * cos(a);
    var y = r * sin(a);
    
    var s = map(r, 0, c * sqrt(n), 10, 20);
    var hu = map(i, 0, n, 0, 255);
    
    fill(hu, 255, 255);
    stroke(hu, 255, 255);
    line(0, 0, x, y);
    noStroke();
    ellipse(x, y, s, s);
  }
  t+= 0.01;
}
