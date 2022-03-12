var velocidad = 10;

const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = 1100;
canvas.height = 700;

//#region Variables globas
const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const defenders = [];
const enemies = [];
const enemyPosition = [];
const projectiles = [];
let numberOfResource = 300;
let enemiesInterval = 600;
let seeCell = false;
let frame = 0;
let score = 0;
let choosenDefender = 1;
let defenderCostTower = 125;
let defenderCostWall = 500;
let defenderCostTar = 50;

let cardSize = 4;
let towerPositionX = 0;
let towerPositionY = 0;
let gameOver = false;
//#endregion

//#region Sprites
const enemy1 = new Image();
enemy1.src = 'Recursos/Sprites/Usado/enemy.png';
let animationSpeedEnemy = 4;

const tower1 = new Image();
tower1.src = 'Recursos/Sprites/Usado/tower.png';

const wall1 = new Image();
wall1.src = 'Recursos/Sprites/Usado/wall.png';
let animationSpeedWall = 12;

const castillo1 = new Image();
castillo1.src = 'Recursos/Sprites/Usado/castle.png';

const player1 = new Image();
player1.src = 'Recursos/Sprites/Usado/Idle.png';
let animationSpeedPlayer = 25;

const arrow1 = new Image();
arrow1.src = 'Recursos/Sprites/Usado/arrow.png';
//#endregion

//#region Escenario
class constrolsbar {
  constructor() {
    (this.width = cellSize * 2), (this.height = canvas.height);
  }
  draw() {
    c.fillStyle = "Purple";
    c.fillRect(0, 0, this.width, this.height);
  }
}
const controlsbar = new constrolsbar();
controlsbar.draw();

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
  draw() {
    if (seeCell == true && player.health > 0 && collision(this, player)) {
      c.strokeStyle = "rgba(0,0,0,0.3)";
      c.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}

function createGrib() {
  for (let x = cellSize * 2; x < canvas.width; x += cellSize) {
    for (let y = 0; y < canvas.height; y += cellSize) {
      gameGrid.push(new Cell(x, y));
    }
  }
}
createGrib();
function handleGameGrid() {
  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].draw();
  }
}
//#endregion

//#region Proyectiles
class Proyectiles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.power = 20;
    this.speed = 5;
    this.spriteWidth = 23;
    this.spriteHeight = 3;
  }
  update() {
    this.x += this.speed;
  }
  draw() {
    c.drawImage(arrow1,this.x - this.spriteWidth,this.y - this.spriteHeight,this.spriteWidth*2,this.spriteHeight*2);
  }
}
function handleProjectiles() {
  for (let i = 0; i < projectiles.length; i++) {
    projectiles[i].update();
    projectiles[i].draw();

    for (let j = 0; j < enemies.length; j++) {
      if (
        enemies[j] &&
        projectiles[i] &&
        collision(projectiles[i], enemies[j])
      ) {
        enemies[j].health -= projectiles[i].power;
        projectiles.splice(i, 1);
        i--;
      }
    }
    if (projectiles[i] && projectiles[i].x > canvas.width) {
      projectiles.splice(i, 1);
      i--;
    }
  }
}
//#endregion

//#region Defensas
class Tower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.type = "tower";
    this.shooting = false;
    this.health = 100;
    this.projectiles = [];
    this.timer = 0;
    this.frameX = 0;
    this.minFrame = 0;
    this.maxFrame = 7;
    this.spriteWidth = 44;
    this.spriteHeight = 45;
  }
  draw() {
    c.drawImage(tower1, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth * 2, this.spriteHeight * 2);
    c.fillStyle = "gold";
    c.font = "20px Arial";
    c.fillText(Math.floor(this.health), this.x, this.y + this.height);
  }
  update() {
    if (this.shooting == true) {
      this.timer++;
      if (this.timer % 10 === 0) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
        if (this.timer % 80 === 0) {
          projectiles.push(new Proyectiles(this.x + this.width, this.y + 50));
        }
      }
    } else {
      this.timer = 0;
    }
    if (this.shooting == false) { this.frameX = 0 }
  };
}
class Wall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.type = "wall";
    this.health = 500;
    this.frameX = 0;
    this.minFrame = 0;
    this.maxFrame = 3;
    this.spriteWidth = 27;
    this.spriteHeight = 33;
  }
  update() {
    if (frame % animationSpeedWall === 0) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;
    }
  }
  draw() {
    c.drawImage(wall1, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x + this.spriteWidth, this.y, this.spriteWidth * 3, this.spriteHeight * 3);
  }
}
class Tar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.type = "tar";
    this.health = 1;
  }
  draw() {
    c.fillStyle = '#191919' ;
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}

function handleDefenders() {
  for (let i = 0; i < defenders.length; i++) {
    defenders[i].draw();
    if (defenders[i].type === "tower") {
      defenders[i].update();
      if (enemyPosition.indexOf(defenders[i].y) !== -1) {
        defenders[i].shooting = true;
      } else {
        defenders[i].shooting = false;
      }
      for (let j = 0; j < enemies.length; j++) {
        if (defenders[i] && collision(defenders[i], enemies[j])) {
          enemies[j].movementX = 0;
          defenders[i].health -= 1;
        }
        if (defenders[i] && defenders[i].health <= 0) {
          defenders.splice(i, 1);
          i--;
          enemies[j].movementX = enemies[j].speed;
        }
      }
    } else if (defenders[i].type === "tar") {
      for (let j = 0; j < enemies.length; j++) {
        if (defenders[i] && collision(defenders[i], enemies[j])) {
          if (enemies[j].movementX == 0) return;
          enemies[j].movementX = enemies[j].speed / 2;
        }
      }
    } else if (defenders[i].type === "wall") {
      defenders[i].update();
      for (let j = 0; j < enemies.length; j++) {
        if (defenders[i] && collision(defenders[i], enemies[j])) {
          enemies[j].movementX = 0;
        }
        if (defenders[i] && defenders[i].health <= 0) {
          defenders.splice(i, 1);
          i--;
          enemies[j].movementX = enemies[j].speed;
        }
      }
    }
  }
}

const card1 = {
  x: cellGap * 2,
  y: 90,
  width: cellSize - cellGap * 2 - cardSize,
  height: cellSize - cellGap * 2 - cardSize,
  color: "black",
};
const card2 = {
  x: cellGap * 2 + card1.x + card1.width,
  y: 90,
  width: cellSize - cellGap * 2 - cardSize,
  height: cellSize - cellGap * 2 - cardSize,
  color: "black",
};
const card3 = {
  x: cellGap * 2,
  y: 90 + card1.height + cellGap * 2,
  width: cellSize - cellGap * 2 - cardSize,
  height: cellSize - cellGap * 2 - cardSize,
  color: "black",
};

function chooseDefender() {
  if (choosenDefender == 1) {
    card1.color = "gold";
  } else card1.color = "black";
  if (choosenDefender == 2) {
    card2.color = "gold";
  } else card2.color = "black";
  if (choosenDefender == 3) {
    card3.color = "gold";
  } else card3.color = "black";
  c.lineWidth = 1;
  c.fillStyle = "rgba(0,0,0,0.1)";

  (c.strokeStyle = card1.color),
  c.strokeRect(card1.x, card1.y, card1.width, card1.height);
  c.fillRect(card1.x, card1.y, card1.width, card1.height);
  c.drawImage(tower1, 1, 0, 44, 45, card1.x, card1.y-5, card1.width, card1.height);
  c.fillStyle = "gold";
  c.fillText(defenderCostTower, card1.x+5, card1.y+20);

  c.fillStyle = "rgba(0,0,0,0.1)";
  (c.strokeStyle = card2.color),
    c.strokeRect(card2.x, card2.y, card2.width, card2.height);
  c.fillRect(card2.x, card2.y, card2.width, card2.height);
  c.drawImage(wall1, 1, 0, 27, 33, card2.x+5, card2.y-2, card2.width, card2.height);
  c.fillStyle = "gold";
  c.fillText(defenderCostWall, card2.x+5, card2.y+20);

  c.fillStyle = "rgba(0,0,0,0.1)";
  (c.strokeStyle = card3.color),
    c.strokeRect(card3.x, card3.y, card3.width, card3.height);
  c.fillRect(card3.x, card3.y, card3.width, card3.height);
  c.fillStyle = "gold";
  c.fillText(defenderCostTar, card3.x+5, card3.y+29);
}
//#endregion

//#region Mensajes
const floatingMessages = [];
class FloatingMessages {
  constructor(value, x, y, size, color) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.size = size;
    this.lifespan = 0;
    this.color = color;
    this.opacity = 1;
  }
  update() {
    this.y -= 0.3;
    this.lifespan += 1;
    if (this.opacity > 0.1) this.opacity -= 0.01;
  }
  draw() {
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.font = this.size + "px Arial";
    c.fillText(this.value, this.x, this.y);
    c.globalAlpha = 1;
  }
}
function handleFloatingMessages() {
  for (let i = 0; i < floatingMessages.length; i++) {
    floatingMessages[i].update();
    floatingMessages[i].draw();
    if (floatingMessages[i].lifespan >= 50) {
      floatingMessages.splice(i, 1);
      i--;
    }
  }
}
//#endregion

//#region Enemy
class Enemy {
  constructor(verticalPosition) {
    this.x = canvas.width;
    this.y = verticalPosition;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;
    this.speed = Math.random() * 0.4 + 0.8;
    this.movementX = this.speed;
    this.movementY = 0;
    this.health = 100;
    this.maxHealth = this.health;
    this.frameX = 12;
    this.minFrame = 12;
    this.maxFrame = 0;
    this.spriteWidth = 22;
    this.spriteHeight = 33;
  }
  update() {
    this.x -= this.movementX;
    this.y -= this.movementY;
    if (frame % animationSpeedEnemy === 0) {
      if (this.frameX > this.maxFrame) this.frameX--;
      else this.frameX = this.minFrame;
    }
  }
  draw() {
    // c.fillStyle = "red";
    // c.fillRect(this.x, this.y, this.width, this.height);
    c.drawImage(enemy1, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth * 3, this.spriteHeight * 3);
    c.fillStyle = "black";
    c.font = "20px Arial";
    c.fillText(Math.floor(this.health), this.x + 33, this.y + 20);
  }
}
function handleEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();
    if (enemies[i].health <= 0) {
      let gainResource = enemies[i].maxHealth / 5;
      floatingMessages.push(
        new FloatingMessages(
          "+" + gainResource,
          enemies[i].x,
          enemies[i].y,
          30,
          "black"
        )
      );
      numberOfResource += gainResource;
      score += gainResource / 10;
      enemyPosition.splice(i, 1);
      enemies.splice(i, 1);
      i--;
    }
    if (castillo.health > 0 && collision(castillo, enemies[i])) {
      enemies[i].movementX = 0;
      castillo.health -= 1;
      console.log(enemies[i].movementX);
    } else if (
      player.health > 0 &&
      enemies[i] &&
      collision(player, enemies[i])
    ) {
      enemies[i].movementX = 0;
      player.health -= 0.5;
    } else enemies[i].movementX = enemies[i].speed;
    if (enemies[i].x <= 200) {
      enemies[i].movementX = 0;
      if (enemies[i].y < 206) {
        enemies[i].movementY = -(enemies[i].speed * 0.5);
      } else
        if (enemies[i].y > 400) {
          enemies[i].movementY = (enemies[i].speed * 0.5);
        } else enemies[i].movementY = 0;
    }
  }
  if (frame % enemiesInterval === 0) {
    let verticalPosition = Math.floor(Math.random() * 7) * cellSize + cellGap;
    enemies.push(new Enemy(verticalPosition));
    //pa redondear el numero en centesimas
    enemyPosition.push(Math.floor(verticalPosition / 100) * 100);
    if (enemiesInterval > 100) enemiesInterval -= 25;
  }
}
const enemy = new Enemy();
//#endregion

//#region Castillo/derrota

class Castillo {
  constructor() {
    this.x = 200;
    this.y =300;
    this.width = cellSize;
    this.height = cellSize;
    this.health = 100;
  }
  draw() {
    c.drawImage(castillo1, this.x, this.y, this.width, this.height);
    // c.fillStyle = "brown";
    // c.fillRect(this.x, this.y, this.width, this.height);
    c.fillStyle = "black";
    c.font = "20px Arial";
    c.fillText(Math.floor(this.health), this.x , this.y + 99);
  }
}

const castillo = new Castillo();
function handleGameStatus() {
  c.fillStyle = "gold";
  c.font = "30px Arial";
  c.fillText("Score " + score, 3, 30);
  c.fillText("Recursos " + numberOfResource, 3, 70);

  if (castillo.health == 0) {
    gameOver = true;
  }
  if (gameOver) {
    c.fillStyle = "Black";
    c.font = "80px Arial";
    c.fillText("GAME OVER", 400, 330);
  }
  if (player.health <= 100 && player.health > 0) {
    c.fillStyle = "red";
    c.beginPath();
    c.arc(
      player.x + player.width / 2 + towerPositionX,
      player.y + player.height / 2 + towerPositionY,
      5,
      0,
      Math.PI * 2
    );
    c.fill();
  }
  if (
    keys.enter.pressed == true &&
    (towerPositionX != 0 || towerPositionY != 0)
  ) {
    const gridPositionX = player.x + towerPositionX;
    const gridPositionY = player.y + towerPositionY;
    if (gridPositionX < cellSize * 2) {
      return;
    }
    if (gridPositionX === castillo.x && gridPositionY === castillo.y) return;
    for (let i = 0; i < defenders.length; i++) {
      if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY)
        return;
    }
    if (numberOfResource >= defenderCostTower && choosenDefender === 1) {
      defenders.push(new Tower(gridPositionX, gridPositionY));
      numberOfResource -= defenderCostTower;
    } else if (numberOfResource >= defenderCostWall && choosenDefender === 2) {
      defenders.push(new Wall(gridPositionX, gridPositionY));
      numberOfResource -= defenderCostWall;
    } else if (numberOfResource >= defenderCostTar && choosenDefender === 3) {
      defenders.push(new Tar(gridPositionX, gridPositionY));
      numberOfResource -= defenderCostTar;
    } else
      floatingMessages.push(
        new FloatingMessages(
          "faltan recursos",
          player.x + player.width / 2 + towerPositionX,
          player.y + player.height / 2 + towerPositionY,
          20,
          "blue"
        )
      );
  }
}
//#endregion

//#region 
class Player {
  constructor() {
    this.x = castillo.x + cellSize;
    this.y = castillo.y;
    this.width = cellSize;
    this.height = cellSize;
    this.health = 100;
    this.timer = 50;
    this.frameX = 0;
    this.minFrame = 0;
    this.maxFrame = 7;
    this.spriteWidth = 160;
    this.spriteHeight = 60;
  }
  draw() {
    c.fillStyle = "red";
    c.font = "20px Arial";
    c.fillText(Math.floor(this.health), this.x + 30, this.y + 15);
    c.drawImage(player1, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 70, this.y + 10, this.spriteWidth*1.5, 100);
  }
  update() {
    if (player.health > 0) this.draw();
    if (keys.shoot.pressed == true) {
      if (player.timer % 50 === 0) {
        projectiles.push(
          new Proyectiles(player.x + player.width, player.y + 50)
        );
        player.timer = 0;
      }
      player.timer++;
    } else player.timer = 40;
    if (frame % animationSpeedPlayer === 0) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;
    }
  }
}
const player = new Player();

//#endregion
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
  shoot: {
    pressed: false,
  },
  enter: {
    pressed: false,
  },
};

function animate() {
  if (!gameOver) requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  handleDefenders();
  handleEnemies();
  controlsbar.draw();
  handleGameGrid();
  handleFloatingMessages();
  handleProjectiles();
  chooseDefender();
  castillo.draw();
  player.update();
  handleGameStatus();
  frame++;
}
animate();
function collision(first, second) {
  if (
    !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    )
  ) {
    return true;
  }
}

addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode)
  if (player.health > 0) {
    switch (keyCode) {
      //   movimiento wasd
      case 65:
        if (
          player.x != 200 &&
          !(player.x == 300 && player.y < 400 && player.y > 200)
        ) {
          {
            player.x -= 100;
          }
        }
        break;
      case 68:
        if (player.x != canvas.width - cellSize) {
          player.x += 100;
        }
        break;
      case 83:
        if (
          player.y != canvas.height - cellSize &&
          !(player.x == 200 && player.y < 300 && player.y > 100)
        ) {
          player.y += 100;
        }
        break;
      case 87:
        if (
          player.y != 0 &&
          !(player.x == 200 && player.y < 500 && player.y > 300)
        ) {
          player.y -= 100;
        }
        break;
      //   Seleccion pa poner torres flechas
      case 39:
        towerPositionX = 100;
        seeCell = true;
        break;
      case 37:
        towerPositionX = -100;
        seeCell = true;
        break;
      case 38:
        towerPositionY = -100;
        seeCell = true;
        break;
      case 40:
        towerPositionY = +100;
        seeCell = true;
        break;
      // seleccionar torreta x y z
      case 49:
        choosenDefender = 1;
        break;
      case 50:
        choosenDefender = 2;
        break;
      case 51:
        choosenDefender = 3;
      case 54:
      case 90:
        if (choosenDefender < 3) {
          choosenDefender += 1;
        } else choosenDefender = 1;
        break;
      case 88:
        if (choosenDefender > 1) {
          choosenDefender -= 1;
        } else choosenDefender = 3;
        break;
      // Poner torre
      case 17:
        keys.enter.pressed = true;
        break;
      // Disparar
      case 32:
        keys.shoot.pressed = true;
        break;
    }
  }
});

addEventListener("keyup", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 39:
      towerPositionX = 0;
      seeCell = false;
      break;
    case 37:
      towerPositionX = 0;
      seeCell = false;
      break;
    case 38:
      towerPositionY = 0;
      seeCell = false;
      break;
    case 40:
      towerPositionY = 0;
      seeCell = false;
      break;
    // Poner torre
    case 17:
      keys.enter.pressed = false;
      break;
    //Disparar espacio
    case 32:
      keys.shoot.pressed = false;
      break;
  }
});
