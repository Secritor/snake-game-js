class GameField {
  _scoreSc = 0;

  constructor(x, y, field, cell, inputSc, inputRec, _scoreRec) {
    this.field = field;
    this.cell = cell;
    this.x = x;
    this.y = y;
    this.inputSc = inputSc;
    this.inputRec = inputRec;
    this._scoreRec = _scoreRec;
  }

  drowField() {
    this.field = document.createElement("div"); //создали поле
    document.body.appendChild(this.field);
    this.field.classList.add("field");

    for (let i = 1; i < 101; i++) {
      this.cell = document.createElement("div"); //создали ячейки
      this.field.appendChild(this.cell);
      this.cell.classList.add("cell");
    }
  }

  coordinatesCell() {
    this.cell = document.getElementsByClassName("cell");
    this.x = 1;
    this.y = 10;

    for (let i = 0; i < this.cell.length; i++) {
      //присвоили систему координат ячейкам

      if (this.x > 10) {
        this.x = 1;
        this.y--;
      }
      this.cell[i].setAttribute("posX", this.x); //присвоили систему координат ячейкам
      this.cell[i].setAttribute("posY", this.y); //присвоили систему координат ячейкам
      this.x++;
    }
  }

  drowInputScore(value) {
    this.inputSc = document.createElement("input"); //создали поле счёта
    document.body.appendChild(this.inputSc);
    this.inputSc.classList.add("score");

    if (value > 0)
      throw new Error(
        alert(
          "Начальное значение счёта игры должно быть - 0. Установите значение - 0"
        )
      );
    this._scoreSc = value; //определяем начальное значение поля счёта
    this.inputSc.value = `Ваш счёт: ${this._scoreSc}`; // отрисовка значения поля = 0

    this.inputRec = document.createElement("input"); // создали поле рекордов
    document.body.appendChild(this.inputRec);
    this.inputRec.classList.add("container");

    localStorage.getItem("record") > 0
      ? (this._scoreRec = localStorage.getItem("record"))
      : (this._scoreRec = 0); //определяем значение поля рекордов

    this.inputRec.value = `Ваш рекорд: ${this._scoreRec}`; // отрисовка значения поля = 0
  }
}

let gameField = new GameField();
gameField.drowField();
gameField.coordinatesCell();
gameField.drowInputScore(0);

class Apple extends GameField {
  constructor(field, cell, x, y, appleCoordinates, apple, snakeBody, a, b) {
    super(field, cell, x, y);
    this.appleCoordinates = appleCoordinates;
    this.apple = apple;
    this.snakeBody = snakeBody;
    this.a = a;
    this.b = b;
  }

  getPosition() {
    //получаем рэндомные координаты яблока
    this.posX = Math.round(Math.random() * (10 - 1) + 1);
    this.posY = Math.round(Math.random() * (10 - 1) + 1);
    this.appleCoordinates = [this.posX, this.posY];
  }

  drow() {
    //отрисовываем яблоко
    this.apple = document.querySelector(
      '[posX = "' +
        this.appleCoordinates[0] +
        '"][posY = "' +
        this.appleCoordinates[1] +
        '"]'
    );
    this.apple.classList.add("apple"); //присваиваем координаты яблоку и class отрисовки

    while (this.apple.classList.contains("snakeBody")) {
      //цикл - пока яблоко находиться по вверх змеи, выполняем тело цикла
      this.apple = document.querySelector(
        '[posX = "' +
          this.appleCoordinates[0] +
          '"][posY = "' +
          this.appleCoordinates[1] +
          '"]'
      );
      this.apple.classList.add("apple"); //присваиваем координаты яблоку и class отрисовки в цикле
    }
  }
}

let apples = new Apple();
apples.getPosition();
apples.drow();

class Snake extends GameField {
  constructor(
    direction,
    field,
    cell,
    x,
    y,
    posX,
    posY,
    coordinates,
    snakeBody,
    snakeCoordinates,
    apple,
    a,
    b,
    intervalID,
    _scoreRec,
    _scoreSc
  ) {
    super(field, cell, x, y, _scoreRec, _scoreSc);
    this.posX = posX;
    this.posY = posY;
    this.coordinates = coordinates;
    this.snakeBody = snakeBody;
    this.direction = direction;
    this.snakeCoordinates = snakeCoordinates;
    this.apple = apple;
    this.a = a;
    this.b = b;
    this.intervalID = intervalID;
    this._scoreRec = _scoreRec;
    this._scoreSc = _scoreSc;
  }

  getPosition() {
    //получаем рэндомные координаты для змеи
    this.posX = Math.round(Math.random() * (10 - 3) + 3); //минимальное значение устанавливае 3 по Х, что бы координаты тела змеи попадали в поле
    this.posY = Math.round(Math.random() * (10 - 1) + 1);
    this.coordinates = [this.posX, this.posY];
  }

  drow() {
    //рисуем змею
    this.snakeBody = [
      document.querySelector(
        '[posX = "' +
          this.coordinates[0] +
          '"][posY = "' +
          this.coordinates[1] +
          '"]'
      ),
      document.querySelector(
        '[posX = "' +
          (this.coordinates[0] - 1) +
          '"][posY = "' +
          this.coordinates[1] +
          '"]'
      ),
      document.querySelector(
        '[posX = "' +
          (this.coordinates[0] - 2) +
          '"][posY = "' +
          this.coordinates[1] +
          '"]'
      ),
    ]; //присвоили рэндомные координаты змее и + 2 ячейки рядом(тело)

    for (let i = 0; i < this.snakeBody.length; i++) {
      //добавляем всему телу змеи class отрисовки тела
      this.snakeBody[i].classList.add("snakeBody");
    }
    this.snakeBody[0].classList.add("snakeHead"); //добавляем первому элементу тела змеи class отрисовки её головы
    //логика отрисовки змейки
  }

  controle() {
    //управление
    this.direction;

    window.addEventListener("keydown", function (e) {
      //вешаем обработчик на кнопки

      if (e.key === "ArrowLeft" && snake.direction !== "right") {
        //37 код стрелки влево //.... если движ не в право, то можно влево
        snake.direction = "left";
      } else if (e.key === "ArrowUp" && snake.direction !== "down") {
        //38 код стрелки вверх //....
        snake.direction = "up";
      } else if (e.key === "ArrowRight" && snake.direction !== "left") {
        //39 код стрелки в право //....
        snake.direction = "right";
      } else if (e.key === "ArrowDown" && snake.direction !== "up") {
        //40 код стрелки вниз //.....
        snake.direction = "down";
      }
    });
  }

  move() {
    //движение змеи
    this.snakeCoordinates = [
      this.snakeBody[0].getAttribute("posX"),
      this.snakeBody[0].getAttribute("posY"),
    ]; //в переменную получаем координаты головы
    this.snakeBody[0].classList.remove("snakeHead"); // у головы удаляем class головы
    this.snakeBody[this.snakeBody.length - 1].classList.remove("snakeBody"); //удаляем class у хвоста
    this.snakeBody.pop(); // удаляем последний элемент из массива

    if (this.direction == "right") {
      // движение и проход через границу поля
      if (this.snakeCoordinates[0] < 10) {
        //условие что бы змейка находилась по оси в поле
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "' +
              (+this.snakeCoordinates[0] + 1) +
              '"][posY = "' +
              this.snakeCoordinates[1] +
              '"]'
          )
        ); //добавляем ячейку X,Y и в неё class snakeHead
      } else {
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "1"][posY = "' + this.snakeCoordinates[1] + '"]'
          )
        ); //добавляем ячейку X,Y в начале поля в неё class snakeHead
      }
    } else if (this.direction == "left") {
      // движение и проход через границу поля
      if (this.snakeCoordinates[0] > 1) {
        //условие что бы змейка находилась по оси в поле
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "' +
              (+this.snakeCoordinates[0] - 1) +
              '"][posY = "' +
              this.snakeCoordinates[1] +
              '"]'
          )
        ); //добавляем ячейку X,Y и в неё class snakeHead
      } else {
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "10"][posY = "' + this.snakeCoordinates[1] + '"]'
          )
        ); //добавляем ячейку X,Y в конце поля в неё class snakeHead
      }
    } else if (this.direction == "up") {
      // движение и проход через границу поля
      if (this.snakeCoordinates[1] < 10) {
        //условие что бы змейка находилась по оси в поле
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "' +
              this.snakeCoordinates[0] +
              '"][posY = "' +
              (+this.snakeCoordinates[1] + 1) +
              '"]'
          )
        ); //добавляем ячейку X,Y и в неё class snakeHead
      } else {
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "' + this.snakeCoordinates[0] + '"][posY = "1"]'
          )
        ); //добавляем ячейку X,Y в конце поля в неё class snakeHead
      }
    } else if (this.direction == "down") {
      // движение и проход через границу поля
      if (this.snakeCoordinates[1] > 1) {
        //условие что бы змейка находилась по оси в поле
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "' +
              this.snakeCoordinates[0] +
              '"][posY = "' +
              (+this.snakeCoordinates[1] - 1) +
              '"]'
          )
        ); //добавляем ячейку X,Y и в неё class snakeHead
        //console.log(this.snakeBody);
      } else {
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "' + this.snakeCoordinates[0] + '"][posY = "10"]'
          )
        ); //добавляем ячейку X,Y в конце поля в неё class snakeHead
      }
    }
    //едим яблоко
    if (
      this.snakeBody[0].getAttribute("posX") ==
        apples.apple.getAttribute("posX") &&
      this.snakeBody[0].getAttribute("posY") ==
        apples.apple.getAttribute("posY")
    ) {
      //проверяем соовпадение координат головы и яблока

      apples.apple.classList.remove("apple"); //удаляем class apple и яблоко съедается

      this.posX = Math.round(Math.random() * (10 - 1) + 1); //снова определяем координаты рэндомно (в другом месте)
      this.posY = Math.round(Math.random() * (10 - 1) + 1);
      this.appleCoordinates = [this.posX, this.posY];

      while (apples.apple.classList.contains("snakeBody")) {
        //цикл - пока яблоко находиться по вверх змеи, выполняем тело цикла

        apples.apple = document.querySelector(
          '[posX = "' +
            this.appleCoordinates[0] +
            '"][posY = "' +
            this.appleCoordinates[1] +
            '"]'
        );
      }

      apples.apple = document.querySelector(
        '[posX = "' +
          this.appleCoordinates[0] +
          '"][posY = "' +
          this.appleCoordinates[1] +
          '"]'
      );
      apples.apple.classList.add("apple"); //присваиваем координаты яблоку и class отрисовки (яблоко появляется новое)

      //увеличиваем длину змеи при поглащении яблока
      this.a = this.snakeBody[this.snakeBody.length - 1].getAttribute("posX"); //в переменные толкаем X (хвост)
      this.b = this.snakeBody[this.snakeBody.length - 1].getAttribute("posY"); //в переменные толкаем Y (хвост)
      this.snakeBody.push(
        document.querySelector(
          '[posX = "' + this.a + '"][posY ="' + this.b + '"]'
        )
      ); //пушим и увеличиваем змею

      //считаем результат игры и устанавливаем рекорд, записываем в localstorage
      gameField._scoreRec;
      localStorage.getItem("record") > 0
        ? (gameField._scoreRec = localStorage.getItem("record"))
        : (gameField._scoreRec = 0);
      //gameField.scoreRec++; // увеличение счёта
      gameField._scoreSc++; // увеличение счёта

      if (gameField._scoreSc > localStorage.getItem("record")) {
        gameField._scoreRec++;
        gameField._scoreRec = gameField._scoreSc;
        localStorage.setItem("record", gameField._scoreRec);
      }

      gameField.inputRec.value = `Ваш рекорд: ${gameField._scoreRec}`; // вывод увеличения счёта в input
      gameField.inputSc.value = `Ваш счёт: ${gameField._scoreSc}`; // вывод увеличения счёта в input
    }

    //игра окончена, змея натыкается на хвост или саму себя
    if (this.snakeBody[0].classList.contains("snakeBody")) {
      //проверка на содержание class (врезаемся в себя)
      setTimeout(() => {
        //timer оповещения
        alert("Игра окончена");
      }, 200);
      clearInterval(this.intervalID); //останавливаем змею
      this.snakeBody[0].classList.add("dead");
    }

    this.snakeBody[0].classList.add("snakeHead"); // возвращаем глову при движении (строки 85 - 120)
    for (let i = 0; i < this.snakeBody.length; i++) {
      this.snakeBody[i].classList.add("snakeBody"); //возвращаем тело при движении (строки 85 - 120)
    }
  }

  initInterval() {
    this.intervalID = setInterval(() => {
      this.move();
    }, 500);
  }
}

let snake = new Snake("right");
snake.getPosition();
snake.drow();
snake.initInterval();
snake.controle();


