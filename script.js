let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

//направления для изменения анимации и переменная для текущего направления
let topStep = [0, -16];
let rightStep = [16, 0];
let bottomStep = [0, 16];
let leftStep = [-16, 0];
let currentDirection = topStep;


let snake = {

  //координаты тела змейки
  bodyPosition: [[128,128],[128,144],[128,160]],

  //ф-я отрисовки змейки
  paintSnake() {
    for(let i = 0; i < this.bodyPosition.length; i++) {
      context.fillStyle = "#13dc15";
      if(i == 0) context.fillStyle = 'green';
      //добавить break если голова змейки на координате ягодки
      context.fillRect((this.bodyPosition[i][0]), (this.bodyPosition[i][1]), 16, 16);
    };
  },

  //ф-я движения:  
  animate() {
    //обновить координаты головы
    let newHeadPosition = [snake.bodyPosition[0][0] + currentDirection[0], snake.bodyPosition[0][1] + currentDirection[1]];
    snake.bodyPosition.unshift(newHeadPosition);
    snake.bodyPosition.pop();
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.paintSnake();
  },

  //изменение навигации

}
//прослушать кнопку изменить направление
document.addEventListener('keydown', (event) => {
  let keyName = event.key;
  if(event.key == 'ArrowUp' && currentDirection != bottomStep) currentDirection = topStep;
  if(event.key == 'ArrowRight' && currentDirection != leftStep) currentDirection = rightStep;
  if(event.key == 'ArrowDown' && currentDirection != topStep) currentDirection = bottomStep;
  if(event.key == 'ArrowLeft' && currentDirection != rightStep) currentDirection = leftStep;
});

snake.paintSnake();
setInterval(snake.animate, 500);
