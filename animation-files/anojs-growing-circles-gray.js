let canvasDiv = document.querySelector("#anojs-growing-circles-gray")

canvasDiv.innerHTML += "<canvas id='anojs-growing-circles-gray-canvas'></canvas>"

let canvas = document.querySelector("#anojs-growing-circles-gray-canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
})

var x = 700;
var y = 300;
var dx = 10;
var dy = 10;
var radius = 30;

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.origRadius = radius;
  this.color = color;

  this.draw = function() {
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // Interactivity
    if (mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100 && this.radius < 40) {
      this.radius += 1.5;
    }
    else if (this.radius > this.origRadius) {
      this.radius -= 1.5;
    }

    this.draw();
  }
}

var circle = new Circle(x, y, dx, dy, radius);

var colorArray = ["rgb(100, 100, 100)", "rgb(70, 70, 70)", "rgb(85, 85, 85)"];

var circles = [];

for (var i = 0; i < 400; i++) {
  var x = Math.random() * window.innerWidth + radius;
  var y = Math.random() * window.innerHeight + radius;
  var dx = (Math.random() - 0.5) * 1.5;
  var dy = (Math.random() - 0.5) * 1.5;
  var radius = (Math.random() * 5) + 5;
  var color = colorArray[Math.floor(Math.random() * colorArray.length)];

  circles.push(new Circle(x, y, dx, dy, radius, color));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (circle of circles) {
    circle.update();
  }
}

animate();
