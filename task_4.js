// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. 
// В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже 
// текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c 
// помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Задание 4</title>
    <style>
        .btn {
      padding: 0;
      background-color: transparent;
      border: none;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      box-shadow: none;
      cursor: pointer;
      margin: 5px 10px;
      padding: 10px 15px;
      border-radius: 1px;
      font-size: 12px;
      line-height: 15px;
      text-transform: uppercase;
      color: white;
      background: #315EFB;
      transition: 0.3s;
    }
    .btn:hover {
      box-shadow: 0px 2px 8px 2px rgba(141,150,178,.3);
      transform: scale(1.05);
    }
    #form {
      margin-top:15px;
      width:205px;
    }
    </style>
</head>
<body>
  <div class="form-group">
       <label for="input">Введите число!</label><br>
       <input type="number" id="form" class="form-control_1" placeholder="Введите ширину от 100 до 300"></input><br>
       <input type="number" id="form" class="form-control_2" placeholder="Введите высоту от 100 до 300"></input>
    </div>
    <button type="submit" id="button" class="btn" >Вычисляем</button>
  <div id="result">Здесь будет результат запроса</div>
  <script>
    let btn = document.querySelector('.btn');
    let inpOne = document.querySelector('.form-control_1');
    let inpTwo = document.querySelector('.form-control_2');
    const resultNode = document.getElementById('result');
    btn.addEventListener('click', () => {
       let valueOne = inpOne.value;
       let valueTwo = inpTwo.value;
       if ((valueOne >= 100 && valueOne <= 300) && (valueTwo >= 100 && valueTwo <= 300)) {
          fetch(`https://picsum.photos/${valueOne}/${valueTwo}`)
             .then((response) => {
              resultNode.innerHTML = `<img src=${response.url}>`
             })
             .catch(() => {
                console.log('error')
             })
       } else {
        resultNode.innerHTML = `Одно из чисел вне диапaзона от 100 до 300`;
       }
    });
 </script>
</body>
</html>