const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const startGame = () => {
    // game.fillRect(0, 0, 100, 100);
    // game.clearRect(50,50,50,50);
    game.font = '25px Verdana'
    game.fillStyle = 'purple'
    game.textAlign= 'center'
    game.fillText('Platzi',0,25)
};
window.addEventListener("load", startGame);
