let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
//направления движения и текущее направление
const topStep = [0, -16];
const rightStep = [16, 0];
const bottomStep = [0, 16];
const leftStep = [-16, 0];
let currentDirection = topStep;
let speed = 500;
let score = 0;
let maxScore = 0;

let snake = {
  //положение тела змейки
  bodyPosition: [[128,128],[128,144],[128,160]],
  //отрисовка змейки
  paintSnake() {
   for(let i = 0; i < this.bodyPosition.length; i++) {
     context.fillStyle = "#13dc15";
     if(i == 0) context.fillStyle = 'green';
     context.fillRect((this.bodyPosition[i][0] + 1), (this.bodyPosition[i][1] + 1), 14, 14);
    };
  },
  //удалние змейки
  clearSnake() {
      for(let i = 0; i < this.bodyPosition.length; i++) {
        context.clearRect((this.bodyPosition[i][0]), (this.bodyPosition[i][1]), 16, 16);
      };
  },
  //обновление тела змейки
  refreshSnakeBodyPosition() {

    let newHeadPosition = [snake.bodyPosition[0][0] + currentDirection[0], snake.bodyPosition[0][1] + currentDirection[1]];
      //обновление головы
      snake.bodyPosition.unshift(newHeadPosition);
      //удалние хвоста если змейка не ест ягодку // переделать на if else
      if((berry.berryPosition[0] != snake.bodyPosition[0][0]) || (berry.berryPosition[1] != snake.bodyPosition[0][1])) snake.bodyPosition.pop();
      //если змейка съедает ягодку
      if((berry.berryPosition[0] == snake.bodyPosition[0][0]) && (berry.berryPosition[1] == snake.bodyPosition[0][1])) {
        refreshScore();
        berry.paintBerry();
        if(score % 2 == 0) {
          speed -= 15;
          speedBox.innerHTML = speed;
          pausePlay();
          startPlay();
        };
      }
    newHeadPosition = undefined;
  },
  //проверка на поражение
  check() {
    for(let i = 1; i < snake.bodyPosition.length; i++) {
      //пересечение с телом (кроме головы)
      if((snake.bodyPosition[0][0] == snake.bodyPosition[i][0]) && (snake.bodyPosition[0][1] == snake.bodyPosition[i][1])) loseGame();
    };
    //пересечение с полем
    if((snake.bodyPosition[0][0] < 0) || (snake.bodyPosition[0][1] < 0)) loseGame();
    if((snake.bodyPosition[0][0] > 272) || (snake.bodyPosition[0][1] > 272)) loseGame();
  },
  //ф-я анимации
  animation() {
    snake.clearSnake();
    snake.refreshSnakeBodyPosition();
    snake.check();
    snake.paintSnake();
    //console.log('голова ' + snake.bodyPosition[0] + " berry " + berry.berryPosition);
  },
};

let berry = {
  berryPosition: [],
  //обновление положения ягодки
  refreshBerryPosition() {
    berry.berryPosition.length = 0;
    berry.berryPosition.push(Math.floor(Math.random() * 18) * 16);
    berry.berryPosition.push(Math.floor(Math.random() * 18) * 16);  
    for(let i=0; i < berry.berryPosition.length; i++) {
      if((snake.bodyPosition[i][0] == berry.berryPosition[0]) && (snake.bodyPosition[i][1] == berry.berryPosition[1])) {
        berry.berryPosition.length = 0;
        return berry.refreshBerryPosition();
      }
    };
  },
  //отрисовка ягодки
  paintBerry() {
    berry.refreshBerryPosition();
    context.fillStyle = 'red';
    context.fillRect(berry.berryPosition[0], berry.berryPosition[1], 16, 16);
  },
 
};


/* ---------------------------------------  НАПРАВЛЕНИЕ ДВИЖЕНИЯ -------------- */
//управление - прослушать кнопку изменить направление
document.addEventListener('keydown', (event) => {
  if(event.key == 'ArrowUp' && currentDirection != bottomStep) currentDirection = topStep;
  if(event.key == 'ArrowRight' && currentDirection != leftStep) currentDirection = rightStep;
  if(event.key == 'ArrowDown' && currentDirection != topStep) currentDirection = bottomStep;
  if(event.key == 'ArrowLeft' && currentDirection != rightStep) currentDirection = leftStep;
});

snake.paintSnake();
berry.paintBerry();

/* -------------------------------------- КНОПКА УПРАВЛЕНИЯ ------------------------------- */
//управление игрой
//сделать адаптивную кнопку Старт => пауза
let superButton = document.querySelector('.super-button');
superButton.addEventListener('click', startPlay);
let play;
//ф-я старт
//изменить ф-ю кноки на ф-ю пауза / изменить текст кноки на старт
function startPlay() {
  if(superButton.innerHTML == 'НАЧАТЬ CНАЧАЛА') {
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.paintSnake();
    berry.paintBerry();
    console.log('НАЧАТЬ СНАЧАЛА!!!');
  };
  play = setInterval(snake.animation, speed);
  superButton.removeEventListener('click', startPlay);
  superButton.addEventListener('click', pausePlay);
  superButton.innerHTML = 'ПАУЗА';
};
//ф-я пауза / обратно старту
function pausePlay() {
  clearInterval(play);
  superButton.removeEventListener('click', pausePlay);
  superButton.addEventListener('click', startPlay);
  superButton.innerHTML = 'СТАРТ';
}

/* -------------------------------- ОЧКИ ------------------------------------------- */

let scoreNow = document.querySelector('.score__now');
scoreNow.innerHTML = score;

let scoreMax = document.querySelector('.score__max');
scoreMax.innerHTML = maxScore;

let speedScore = document.querySelector('.speed');


function refreshScore() {
  score++;
  scoreNow.innerHTML = score;
}

let speedBox = document.querySelector('.speed');
speedBox.innerHTML = speed;

/*** -------------------------------- ПРОИГРЫШ ----------------------------------- */

function loseGame() {

  pausePlay();
  superButton.innerHTML = 'НАЧАТЬ CНАЧАЛА';

  snake.bodyPosition = [[128,128],[128,144],[128,160]];
  currentDirection = topStep;
  if(score > maxScore) maxScore = score;  
  scoreMax.innerHTML = maxScore;
  
  score = 0;
  scoreNow.innerHTML = score;
  speed = 500;
  speedScore.innerHTML = speed;
  
  context.fillStyle = "black";
  context.font = 'bold 35px sans-serif';
  
  context.strokeText("Вы проиграли", 15, 100);

}

/* ------------------------------------- скорость --------------------------------- */