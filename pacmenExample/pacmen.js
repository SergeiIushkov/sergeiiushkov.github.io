let pos = 0;
const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];
let direction = 1;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "./images/PacMan1.png";
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left = setToRandom(window.innerWidth);
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });

  setTimeout(update, 20);
}

function update_mouth() {
  pacMen.forEach((item) => {
    if (item.newimg.src.indexOf("PacMan1.png") != -1) {
      item.newimg.src = "./images/PacMan2.png";
    } else if (item.newimg.src.indexOf("PacMan2.png") != -1) {
      item.newimg.src = "./images/PacMan1.png";
    } else if (item.newimg.src.indexOf("PacMan3.png") != -1) {
      item.newimg.src = "./images/PacMan4.png";
    } else if (item.newimg.src.indexOf("PacMan4.png") != -1) {
      item.newimg.src = "./images/PacMan3.png";
    }
  });

  setTimeout(update_mouth, 200);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  let width = item.newimg.width;
  let height = item.newimg.height;

  if (item.position.x + width >= window.innerWidth) {
    if (item.newimg.src.indexOf("PacMan1.png") != -1) {
      item.newimg.src = "./images/PacMan4.png";
    }
    if (item.newimg.src.indexOf("PacMan2.png") != -1) {
      item.newimg.src = "./images/PacMan3.png";
    }
    item.velocity.x = -item.velocity.x;
  } else if (item.position.x <= 0) {
    if (item.newimg.src.indexOf("PacMan3.png") != -1) {
      item.newimg.src = "./images/PacMan2.png";
    }
    if (item.newimg.src.indexOf("PacMan4.png") != -1) {
      item.newimg.src = "./images/PacMan1.png";
    }
    item.velocity.x = item.velocity.x * -1;
  }

  if (item.position.y + height >= window.innerHeight) {
    item.velocity.y = -item.velocity.y;
  } else if (item.position.y <= 0) {
    item.velocity.y = item.velocity.y * -1;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== "undefined") {
  module.exports = { checkCollisions, update, pacMen };
}
