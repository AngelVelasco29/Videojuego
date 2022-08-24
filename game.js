const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let canvasSize;
let elementsSize;
let flag = true;
let level = 0;
const initialPosition = {
  x: undefined,
  y: undefined,
};
const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};
let bombasPosition = [];
let mapRows = [];

const movePlayer = () => {
  game.clearRect(0, 0, canvasSize, canvasSize);
  drawMap();
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
  const giftColisionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftColisionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftColision = playerPosition.x
    ? giftColisionX && giftColisionY
    : false;
  if (giftColision) {
    levelWin();
  }

  const bombaColision = bombasPosition.find((position) => {
    const bombaColisionX = playerPosition.x.toFixed(3) == position.x.toFixed(3);
    const bombaColisionY = playerPosition.y.toFixed(3) == position.y.toFixed(3);
    return playerPosition.x ? bombaColisionX && bombaColisionY : false;
  });
  console.log("colision", bombaColision);
  console.log(bombasPosition);
  if (bombaColision){
    gameLose();
  };
};

const gameLose=()=>{
  playerPosition.x=initialPosition.x;
  playerPosition.y=initialPosition.y;
  game.clearRect(0, 0, canvasSize, canvasSize);
  drawMap();
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

const levelWin = () => {
  console.log("nuevo nivel");
  level++;
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  giftPosition.x = undefined;
  giftPosition.y = undefined;
  flag = true;
  bombasPosition = [];
  startGame();
};

const drawMap = () => {
  mapRows.forEach((row, rowIndex) => {
    for (let col = 0; col < row.length; col++) {
      const emoji = emojis[row[col]];
      const posX = elementsSize * (col + 1) + 5;
      const posY = elementsSize * (rowIndex + 1) - 10;
      game.fillText(emoji, posX, posY);

      if (row[col] == "O" && !playerPosition.x) {
        initialPosition.x = posX;
        initialPosition.y = posY;
        playerPosition.x = posX;
        playerPosition.y = posY;
      }
      if (row[col] == "I" && !giftPosition.x) {
        giftPosition.x = posX;
        giftPosition.y = posY;
      }
      if (row[col] == "X" && flag) {
        bombasPosition.push({
          x: posX,
          y: posY,
        });
      }
    }
  });
  flag = false;
};

const startGame = () => {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  elementsSize = canvasSize / 10;
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  game.font = elementsSize - 10 + "px Verdana";
  game.textAlign = "end";
  // const mapRowCols = mapRows.map((row) => row.split(""));
  // console.log(mapRows);
  // console.log(mapRowCols);

  mapRows = maps[level];
  if (!mapRows) {
    gameWin();
    return;
  }
  movePlayer();

  // row.forEach((col, colIndex) => {
  //   const emoji = emojis[col];
  //   const posX = elementsSize * (colIndex + 1) + 5;
  //   const posY = elementsSize * (rowIndex + 1) - 10;
  //   game.fillText(emoji, posX, posY);
  // });

  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 1; col <= 10; col++) {
  //     game.fillText(emojis[mapRowCols[row-1][col-1]], elementsSize * col+5, elementsSize * row-10);
  //   }
  // }

  // game.fillRect(0, 0, 100, 100);
  // game.clearRect(50,50,50,50);
  // game.font = '25px Verdana'
  // game.fillStyle = 'purple'
  // game.textAlign= 'center'
  // game.fillText('Platzi',0,25)
};

const gameWin = () => {
  console.log("Terminaste el Juego");
};
const move = (key) => {
  if (typeof key === "object") {
    key = key.key;
  }
  switch (key) {
    case "ArrowUp":
      console.log("Arriba");
      if (playerPosition.y > elementsSize) playerPosition.y -= elementsSize;
      break;
    case "ArrowLeft":
      console.log("Izquierda");
      if (playerPosition.x > 2 * elementsSize) playerPosition.x -= elementsSize;
      break;
    case "ArrowRight":
      console.log("Derecha");
      if (playerPosition.x < canvasSize) playerPosition.x += elementsSize;
      break;
    case "ArrowDown":
      console.log("Abajo");
      if (playerPosition.y < canvasSize - elementsSize)
        playerPosition.y += elementsSize;
      break;

    default:
      break;
  }
  movePlayer();
};

window.addEventListener("keydown", move);
window.addEventListener("load", startGame);
