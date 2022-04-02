let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
//направления движения и текущее направление
let topStep = [0, -16];
let rightStep = [16, 0];
let bottomStep = [0, 16];
let leftStep = [-16, 0];
let currentDirection = topStep;
let speed = 1000;

/* текст на канвасе
    context.fillStyle = "black";
    context.font = 'bold 35px sans-serif';
    context.strokeText("Вы проиграли", 15, 100);
*/

let snake = {
  //положение тела змейки
  bodyPosition: [[128,128],[128,144],[128,160]],
  //отрисовка змейки
  paintSnake() {
   for(let i = 0; i < this.bodyPosition.length; i++) {
     context.fillStyle = "#13dc15";
     if(i == 0) context.fillStyle = 'green';
     context.fillRect((this.bodyPosition[i][0]), (this.bodyPosition[i][1]), 16, 16);
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
      snake.bodyPosition.unshift(newHeadPosition);
      if((berry.berryPosition[0] != snake.bodyPosition[0][0]) || (berry.berryPosition[1] != snake.bodyPosition[0][1])) snake.bodyPosition.pop();
      if((berry.berryPosition[0] == snake.bodyPosition[0][0]) && (berry.berryPosition[1] == snake.bodyPosition[0][1])) berry.paintBerry();
  },
  //проверка на поражение
  check() {
    for(let i = 1; i < snake.bodyPosition.length; i++) {
      //пересечение с телом (кроме головы)
      if((snake.bodyPosition[0][0] == snake.bodyPosition[i][0]) && (snake.bodyPosition[0][1] == snake.bodyPosition[i][1])) console.log('LOSE');
    };
    //пересечение с полем
    if((snake.bodyPosition[0][0] < 0) || (snake.bodyPosition[0][1] < 0)) console.log('LOSE');
    if((snake.bodyPosition[0][0] > 272) || (snake.bodyPosition[0][1] > 272)) console.log('LOSE');
  },
  //ф-я анимации
  animation() {
    snake.clearSnake();
    snake.refreshSnakeBodyPosition();
    snake.check();
    snake.paintSnake();
    console.log('голова ' + snake.bodyPosition[0] + " berry " + berry.berryPosition);
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
        berryPosition.length = 0;
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

//управление - прослушать кнопку изменить направление
document.addEventListener('keydown', (event) => {
  if(event.key == 'ArrowUp' && currentDirection != bottomStep) currentDirection = topStep;
  if(event.key == 'ArrowRight' && currentDirection != leftStep) currentDirection = rightStep;
  if(event.key == 'ArrowDown' && currentDirection != topStep) currentDirection = bottomStep;
  if(event.key == 'ArrowLeft' && currentDirection != rightStep) currentDirection = leftStep;
});

snake.paintSnake();
berry.paintBerry();



//сделать адаптивную кнопку Старт => пауза

let superButton = document.querySelector('.super-button');
superButton.addEventListener('click', startPlay);

let play;

//ф-я старт
//изменить ф-ю кноки на ф-ю пауза
//изменить текст кноки на старт
function startPlay() {
  play = setInterval(snake.animation, 1000);
  superButton.removeEventListener('click', startPlay);
  superButton.addEventListener('click', pausePlay);
  superButton.innerHTML = 'ПАУЗА'
};


//ф-я пауза / обратно старту
function pausePlay() {
  clearInterval(play);
  superButton.removeEventListener('click', pausePlay);
  superButton.addEventListener('click', startPlay);
  superButton.innerHTML = 'СТАРТ'
}