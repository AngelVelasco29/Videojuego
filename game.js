const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const startGame = () => {
  let canvasSize;

  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  const elementsSize = canvasSize / 10;
  console.log(canvasSize, elementsSize);
  game.font = elementsSize - 10 + "px Verdana";
  game.textAlign = "end";
  // const mapRowCols = mapRows.map((row) => row.split(""));
  // console.log(mapRows);
  // console.log(mapRowCols);

  const mapRows = maps[2];
  mapRows.forEach((row, rowIndex) => {
    for (let col = 0; col < row.length; col++) {
      const emoji = emojis[row[col]];
      const posX = elementsSize * (col + 1) + 5;
      const posY = elementsSize * (rowIndex + 1) - 10;
      game.fillText(emoji, posX, posY);
    }
  });
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
window.addEventListener("load", startGame);
