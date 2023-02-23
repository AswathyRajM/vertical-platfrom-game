const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
const gravity = 0.45;
const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

class Sprite {
  constructor({ position, imgSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imgSrc;
  }

  draw() {
    if (!this.image) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 100;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 100, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

const player = new Player({
  x: 0,
  y: 0,
});

const bg = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "./img/bg.jpg",
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.scale(0.3, 0.2);
  bg.update();
  c.restore();
  player.update();
  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = 5;
  else if (keys.a.pressed) player.velocity.x = -5;
}
animate();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -15;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
