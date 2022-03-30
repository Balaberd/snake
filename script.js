let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");


let snake = {
  
  //координаты змейки
  bodyPosition: [[128,128],[128,144],[128,160]],

  //ф-я отрисовки змейки
  paintSnake() {
    for(let i = 0; i < this.bodyPosition.length; i++) {
      context.fillStyle = "#13dc15";
      if(i == 0) context.fillStyle = 'green';
      context.fillRect((this.bodyPosition[i][0]), (this.bodyPosition[i][1]), 16, 16);
    };
  },

  //ф-я движения
  animate() {
    //обновить координаты головы
    let newHeadPosition = [snake.bodyPosition[0][0] - 0, snake.bodyPosition[0][1] - 16];
    snake.bodyPosition.unshift(newHeadPosition);
    snake.bodyPosition.pop();
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.paintSnake();
  },

  
    stepDirection() {
    // шаг будет равен 16px при каждой анимации голова змейки обновится на шаг
    let topStep = [0, -16];
    let rightStep = [16, 0];
    let bottomStep = [0, 16];
    let leftStep = [-16, 0];
  },
}

snake.paintSnake();
setInterval(snake.animate, 1000);
