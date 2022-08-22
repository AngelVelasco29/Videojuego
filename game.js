const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const startGame = () => {
    let canvasSize;

    if(window.innerHeight>window.innerWidth){
        canvasSize= window.innerWidth *0.8;
    }else{
        canvasSize= window.innerHeight *0.8;
    }
    canvas.setAttribute('width', canvasSize )
    canvas.setAttribute('height', canvasSize )

    const elementsSize= canvasSize / 10;
    console.log(canvasSize, elementsSize);
    game.font= elementsSize + 'px Verdana'
    game.textAlign= 'end';

    for(let ver=1; ver<=10; ver++){
        for (let hor = 1; hor <=10; hor++) {
            game.fillText(emojis['X'],elementsSize*hor,elementsSize*ver)
        }
    }

    
    // game.fillRect(0, 0, 100, 100);
    // game.clearRect(50,50,50,50);
    // game.font = '25px Verdana'
    // game.fillStyle = 'purple'
    // game.textAlign= 'center'
    // game.fillText('Platzi',0,25)
};
window.addEventListener("load", startGame);
