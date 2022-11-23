// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
// Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage)

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Задание 5</title>
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
      margin-top: 15px;
      width: 205px;
    }

    </style>
</head>
<body>
    <div class="form-group">
        <label for="input">Номер страницы</label><br>
        <input type="number" id="form" class="page" placeholder="Введите номер страницы"></input><br>
        <input type="number" id="form" class="limit" placeholder="Введите лимит"></input>
     </div>
     
     <button type="submit" id="button" class="btn" >Запрос</button>
   <div id="result">Здесь будет результат запроса</div>
    <script>
        const pageInput = document.querySelector('.page');
        const limitInput = document.querySelector('.limit');
        const btn = document.querySelector('.btn');
        const resultNode = document.getElementById('result');
        function validateValue(value, valuesRange) {
            return typeof value === "number" && !isNaN(value) && value >= valuesRange[0] && value <= valuesRange[1];
        }
        function sendRequest(page, limit) {
            let url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function () {
                let response = JSON.parse(xhr.response);
                let images = ``;
                localStorage.clear();
                for (let img of response) {
                    images += `<img src="${img.download_url}" width="300px" style="margin: 10px;">`;
                }
                localStorage.setItem("images", images);
                resultNode.innerHTML = images;
            }
            xhr.send();
        }
        btn.addEventListener("click", () => {
            let page = +pageInput.value;
            let limit = +limitInput.value;
            let valuesRange = [1, 10];
            if (validateValue(page, valuesRange) && validateValue(limit, valuesRange)) {
                sendRequest(page, limit);
            } else if (validateValue(page, valuesRange)) {
                resultNode.innerText = "Лимит вне диапазона от 1 до 10";
            } else if (validateValue(limit, valuesRange)) {
                resultNode.innerText = "Номер страницы вне диапазона от 1 до 10";
            } else {
                resultNode.innerText = "Номер страницы и лимит вне диапазона от 1 до 10";
            }
        });
        document.addEventListener("DOMContentLoaded", () => {
            let imagesHtml = localStorage.getItem("images");
            if (imagesHtml) {
                resultNode.innerHTML = imagesHtml;
            }
        });
    </script>
</body>
</html>