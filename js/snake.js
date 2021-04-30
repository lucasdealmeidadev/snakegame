let canvas  = document.getElementById('snake');
let context = canvas.getContext('2d');
let key = document.getElementById('key');
let box = 32;
let direction;
let dead = new Audio();
let eat = new Audio();
let movements = new Audio();
let snake = [];
eat.src = 'audios/eat.mp3';
dead.src = 'audios/dead.mp3';
movements.src = 'audios/movements.mp3';
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

const createBackground = () => {
    const background = new Image();
    background.src = 'imgs/garden.jpg';
    context.drawImage(background, 0, 0, 16 * box, 16 * box);  
}

const createSnake = () => {
    let score = 0;

    for (let i=0; i < snake.length; i++){
        if(i == 0){
            const head = new Image();
            head.src = 'imgs/head.png';
            context.drawImage(head, snake[i].x, snake[i].y, box, box);  
        }else{
            const body = new Image();
            body.src = 'imgs/body.png';
            context.drawImage(body, snake[i].x, snake[i].y, box, box);   
        }
        if(i != 0) score++;
    }
    document.getElementById('current-score').innerText = score;
}

const drawFood = () => {
    const apple = new Image();
    apple.src = 'imgs/apple.png';
    context.drawImage(apple, food.x, food.y, box, box);  
}

const update = (event) => {
    key.style.display = 'none';

    if(event.keyCode == 37 && direction != 'right'){
        movements.play();
        direction = 'left';
    }
    if(event.keyCode == 38 && direction != 'down'){
        movements.play();
        direction = 'up';
    }
    if(event.keyCode == 39 && direction != 'left'){
        movements.play();
        direction = 'right';
    }
    if(event.keyCode == 40 && direction != 'up'){
        movements.play();
        direction = 'down';
    }
}

document.addEventListener('keydown', update);

const gameOver = () => {
    swal({
        title: 'Game Over :)',
        icon: 'error',
        buttons: !0,
        dangerMode: !0,
        buttons: [null, 'OK'],
        closeOnClickOutside: false,
    }).then(e => { 
        e && (window.location.reload())
    }); 
}

const init = () => {
    swal({
        title: 'Snake Game (:',
        icon: 'imgs/init.png',
        text: 'Pegue o maior número de maças possível. Cuidado! Sair do mapa ou encostar na sua própria snake encerra o jogo.',
        buttons: !0,
        dangerMode: !0,
        buttons: [null, 'JOGAR'],
        closeOnClickOutside: false,
    }).then(e => { 
        key.style.display = 'block';
    });
}

const startGame = () => {
    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if(snake[0].y > 15 * box && direction == 'down')  snake[0].y = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y < 0 && direction == 'up')   snake[0].y = 16 * box;

    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            dead.play();
            gameOver();
        }
    }
  
    createBackground();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left')  snakeX -= box; 
    if(direction == 'up')    snakeY -= box;
    if(direction == 'down')  snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        eat.play();
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 +1)  * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if(snakeX < 0 || snakeX == 16 * box || snakeY < 0 || snakeY == 16 * box){
        clearInterval(game);
        dead.play();
        gameOver();
    }

    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);
init();