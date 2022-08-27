const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const gameContainer = document.querySelector(".game-container");
const lobby = document.querySelector(".lobby");
const tableGrid = document.querySelector(".table-grid");
const loser = document.querySelector(".loser");
const win = document.querySelector(".win");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const buttonTime= document.querySelector("#buttonTime");
const resultGame = document.querySelector("#resultGame");
const namePlayer = document.querySelector("#name");
const country = document.querySelector("#country");
const API = "https://6307f66d46372013f5748481.mockapi.io/api/v1/player";

let canvasSize;
let elementsSize;
let flag = true;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;
let recordsJSON;
let firePosition={
  col: undefined,
  row: undefined,
}
const playerPosition = {
  col: undefined,
  row: undefined,
};
const doorPosition = {
  col: undefined,
  row: undefined,
};
const giftPosition = {
  col: undefined,
  row: undefined,
};
let bombasPosition = [];
let mapRows = [];

const fetchData = async () => {
  const result = await fetch(API);
  const data = await result.json();
  return data;
};

const postData = async (datos) => {
  const result = await fetch(API, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: { "Content-type": "application/json" },
  });
};

const putData = async (datos) => {
  const result = await fetch(`${API}/${datos.id}`, {
    method: "PUT",
    body: JSON.stringify(datos),
    headers: { "Content-type": "application/json" },
  });
};

const showRecord = () => {
  spanRecord.innerHTML = localStorage.getItem("record_time");
};

const showTime = () => {
  spanTime.innerHTML = (Date.now() - timeStart)/1000 +"s";
};

const levelFail = () => {
  console.log("Chocaste");
  lives--;
  console.log(lives);
  playerPosition.col = undefined;
  playerPosition.row = undefined;
  if (lives <= 0) {
    level = 0;
    clearGame();
    clearInterval(timeInterval);
    timeStart = undefined;
    lives = 3;
    loser.classList.remove("display-none");
    gameContainer.classList.add("display-none");
    return;
  }
  startGame();
};

const clearGame = () => {
  playerPosition.col = undefined;
  playerPosition.row = undefined;
  giftPosition.col = undefined;
  giftPosition.row = undefined;
  bombasPosition = [];
  flag = true;
};

const levelWin = () => {
  console.log("nuevo nivel");
  level++;
  firePosition={
    col: undefined,
    row: undefined
  }
  clearGame();
  startGame();
};

const setCanvasSize = () => {
  if (window.innerHeight > window.innerWidth) {
    if ((window, innerWidth < 450)) {
      canvasSize = 350;
    } else {
      canvasSize = (window.innerWidth * 0.75).toFixed(0);
    }
  } else {
    if (window.innerHeight < 450) {
      canvasSize = 350;
    } else {
      canvasSize = (window.innerHeight * 0.75).toFixed(0);
    }
  }
  elementsSize = canvasSize / maps[level].length;
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  game.font = elementsSize - 7 + "px Verdana";
  game.textAlign = "start";
  flag=true;
  drawMap();
  drawPlayer();
};

const showLives = () => {
  const heartsArray = Array(lives).fill(emojis["HEART"]);
  spanLives.innerHTML = heartsArray.join("");
};

const drawBombs = () => {
  bombasPosition.forEach((bomb) => {
    game.fillText(
      emojis["X"],
      bomb.col * elementsSize- 2,
      bomb.row * elementsSize - 10
    );
  });
};

const drawDoor = () => {
  game.fillText(
    emojis["O"],
    doorPosition.col * elementsSize,
    doorPosition.row * elementsSize-5,
  );
};

const drawGift = () => {
  game.fillText(
    emojis["I"],
    giftPosition.col * elementsSize,
    giftPosition.row * elementsSize - 10
  );
};
const drawFire = () => {
  game.fillText(
    emojis["BOMB_COLLISION"],
    firePosition.col * elementsSize,
    firePosition.row * elementsSize - 10
  );
};

const drawPlayer = () => {
  console.log(playerPosition);
  game.fillText(
    emojis["PLAYER"],
    playerPosition.col * elementsSize-5,
    playerPosition.row * elementsSize - 5
  );
};

const drawMap = () => {
  mapRows.forEach((row, rowIndex) => {
    for (let col = 0; col < row.length; col++) {
      if (row[col] == "O" && !playerPosition.col && !playerPosition.row) {
        doorPosition.col = col;
        doorPosition.row = rowIndex+1;
        playerPosition.col = col;
        playerPosition.row = rowIndex+1;
      }
      if (row[col] == "I" && !giftPosition.col && !giftPosition.row) {
        giftPosition.col = col;
        giftPosition.row = rowIndex+1;
      }
      if (row[col] == "X" && flag) {
        bombasPosition.push({
          col: col,
          row: rowIndex+1,
        });
      }
    }
  });
  console.log("draw");
  drawBombs();
  drawFire();
  drawDoor();
  drawGift();
  flag = false;
};

const movePlayer = () => {
  showLives();
  game.clearRect(0, 0, canvasSize, canvasSize);
  drawMap();
  drawPlayer();
  const giftColisionX = playerPosition.col == giftPosition.col;
  const giftColisionY = playerPosition.row == giftPosition.row;
  const giftColision = giftColisionX && giftColisionY;

  if (giftColision) {
    console.log("win");
    levelWin();
  }

  const bombaColision = bombasPosition.find((position) => {
    const bombaColisionX = playerPosition.col == position.col;
    const bombaColisionY = playerPosition.row == position.row;
    return bombaColisionX && bombaColisionY;
  });
  if (bombaColision) {
    console.log("lost");
    firePosition= bombaColision;
    levelFail();
  }
};

const startGame = () => {
  gameContainer.classList.remove("display-none");
  lobby.classList.add("display-none");
  window.addEventListener("keydown", move);
  mapRows = maps[level];
  if (!mapRows) {
    gameWin();
    return;
  }
  setCanvasSize();
  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  movePlayer();
};

const gameWin = () => {
  console.log("Terminaste el Juego");
  clearInterval(timeInterval);
  win.classList.remove("display-none");
  gameContainer.classList.add("display-none");

  namePlayer.value = localStorage.getItem("name");
  country.value = localStorage.getItem("country");

  const recordTime = localStorage.getItem("record_time");
  timePlayer = (Date.now() - timeStart)/1000;
  if (recordTime) {
    if (recordTime > timePlayer) {
      localStorage.setItem("record_time", timePlayer);
      resultGame.innerHTML="Superaste tu record";
    } else {
      resultGame.innerHTML="No superaste tu record";
      buttonTime.innerHTML= "Volver a intentar";
    }
  } else {
    localStorage.setItem("record_time", timePlayer);
    resultGame.innerHTML="Has creado tu primer record";

  }
};
const move = (key) => {
  if (!gameContainer.classList.contains("display-none")) {
    if (typeof key === "object") {
      key = key.key;
    }
    switch (key) {
      case "ArrowUp":
        if (playerPosition.row > 1) playerPosition.row -= 1;
        break;
      case "ArrowLeft":
        if (playerPosition.col > 0) playerPosition.col -= 1;
        break;
      case "ArrowRight":
        if (playerPosition.col < maps[level].length-1) playerPosition.col += 1;
        break;
      case "ArrowDown":
        if (playerPosition.row < maps[level].length) playerPosition.row += 1;
        break;

      default:
        break;
    }

    movePlayer();
  }
};

const records = async () => {
  recordsJSON = await fetchData();
  recordsJSON.sort((a, b) => {
    return a.time - b.time;
  });

  recordsJSON.map((record, index) => {
    tableGrid.innerHTML += `<div>${index + 1}</div>
    <div>${record.name}</div>
    <div>${record.country}</div>
    <div>${record.time}</div>`;
  });
};

const postTime = async () => {
  localStorage.setItem("name", namePlayer.value);
  localStorage.setItem("country", country.value);
  buttonTime.disabled=true;
  const datos = {
    name: namePlayer.value,
    country: country.value,
    time: timePlayer,
  };

  const recordFind = recordsJSON.find((record) => {
    return namePlayer.value == record.name && country.value == record.country;
  });

  if (recordFind) {
    if(recordFind.time>=timePlayer){
      recordFind.time = timePlayer;
      await putData(recordFind);
    }
    reload();
  } else {
    await postData(datos);
    reload();
  }
};

const reload = () => {
  location.reload();
};

window.addEventListener("load", records);
window.addEventListener("resize", setCanvasSize);
