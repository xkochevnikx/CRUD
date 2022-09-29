//?
// Создать 3 инпута(name, email, imageUrl)
// -Реализовать весь функционал CRUD:
// ---Create (Создание контакта)
// ---Read (Вывести список контактов)
// ---Update (Сделать редактирование)
// ---Delete (Сделать удаление)

let inpName = document.querySelector("#name");
let inpEmail = document.querySelector("#email");
let inpFoto = document.querySelector("#foto");
let btnSend = document.querySelector("#btnSend");
let list = document.querySelector("#list");
let modal = document.querySelector("#modal");
let btnS = document.querySelector("#modal_save");
let btnC = document.querySelector("#modal_close");
let inpEdit = document.querySelector("#inpEdit");
let inpEdit2 = document.querySelector("#inpEdit2");

//! создаём функцию которая в последствии после нажатия кнопки отправить добавит всё в массив а его в свою очередь в локал под одним ключём
function createContact(objList) {
  //если ключ в локале еще не создан создаём его сами применяя условия
  if (!localStorage.getItem("contactList")) {
    localStorage.setItem("contactList", "[]");
  }
  //тут распаковываем в переменную наш пустой массив созданный выше
  let arrData = JSON.parse(localStorage.getItem("contactList"));
  // и пушим в него объект который прилетает в параметры после нажатия кнопки отправить
  arrData.push(objList);
  //после переменную с массивом обьекта обратно возвращаем в локал строкой в ключ созданный вначале
  localStorage.setItem("contactList", JSON.stringify(arrData));
}

//! создаем событие на кнопке отправить
btnSend.addEventListener("click", function () {
  //нажимаем отправить и запускаем проверку на заполнение
  if (!inpName.value.trim()) {
    alert("Заполните поле NAME");
    return;
  } else if (!inpEmail.value.trim()) {
    alert("Заполните поле EMAIL");
    return;
  }
  // создаём объект в который сохраняем значение отправленных полей инпута
  let obj = {
    name: inpName.value,
    email: inpEmail.value,
  };
  //вызываем функцию создания и в аргументы ложим наш массив со значениями из инпутов
  createContact(obj);
  //вызываем функцию отображения на странице
  readContactList();
});

//! выводим контакты на страницу
function readContactList() {
  if (!localStorage.getItem("contactList")) {
    localStorage.setItem("contactList", "[]");
  }
  //берём из локала в переменную нашу введенную ранее информацию
  let arrData = JSON.parse(localStorage.getItem("contactList"));
  // очищаем внутренний код в теле UL
  list.innerHTML = "";
  //стянутый массив выше перебираем методом forEach что бы создать на каждый элемент массива отдельный тег Li
  arrData.forEach((elem, index) => {
    //создаём новый тег Li и P переносим его сразу в переменную
    let liCreate = document.createElement("li");
    let pCreate = document.createElement("p");
    // записываем в li и P содержимое элемента массива по ключам
    liCreate.innerText = elem.name; //! обращаемся к объекту потом к ключу
    pCreate.innerText = elem.email;
    //рядом с Li создаём кнопки удаления и редактирования
    let btnDel = document.createElement("button");
    // пишем текст кнопки
    btnDel.innerText = "delete";
    // добавляем её в li
    liCreate.append(btnDel);
    // дальше на кнопку навешиваем событие с функцикй удаления (будет ниже)
    btnDel.addEventListener("click", function () {
      // Навешиваем событие на кнопку удалить/ при каждом клике на кнопку удалить мы вызываем функцию удаления а в аргументы передаем индекс элемента на который кликнули. данный индекс мы берем из параметра колбек функции метода forEach
      deleteContact(index);
    });
    //создаём кнопку редактирования
    let btnEdit = document.createElement("button");
    btnEdit.innerText = "Edit";
    btnEdit.addEventListener("click", function () {
      // тут будет функция редактирования
      // При каждом клике кнопки изменить мы вызывем функцию редактирования/ а в аргументы передаем индекс элемента на который кликнули а второе сам элемент на который кликнули/ в нашем случае обьект с ключем 'name' и "email"
      editTask(index, elem);
    });
    //добавляем в переменную li кнопку редактирования
    liCreate.append(btnEdit);
    //добавляем в тег UL переменную li с именем и переменную P с почтой
    list.append(liCreate, pCreate);
  });
}

//функция удаления
function deleteContact(i) {
  //! в параметры можно записать что угодно главное при вызове передать правильный аргумент в нашем случае это index из forEach
  //стягиваем массив из локала
  let arrData = JSON.parse(localStorage.getItem("contactList"));
  //обращаемся к массиву в переменной и передаём в параметры сплайса индекс из forEach и сколько элементов удалить
  arrData.splice(i, 1);
  // обновлённый массив возвращаем обратно в локал
  localStorage.setItem("contactList", JSON.stringify(arrData));
  //вызываем снова фунцию вывода на страницу
  readContactList();
}

let boxIndex = document.getElementsByClassName("boxIndex")[0]; // один из способов передачи информации из  одной области в другую область видимости

//событие на кнопку close в модальном окне
btnC.addEventListener("click", () => {
  modal.style.display = "none";
});

//делаем функцию редактирования
function editTask(index, elem) {
  //! при вызове мы передали сюда из forEach index и сам объект
  //открываем окно редактора
  modal.style.display = "block";
  //присваиваем двум окнам значения объектов по двум ключам
  inpEdit.value = elem.name;
  inpEdit2.value = elem.email;
  boxIndex.setAttribute("id", index); //спану будет присваивоен атрибут id  и индекс элемента который вытаскивается при переборе forEach
}

//создаём кнопку сохранения изменённых данных
btnS.addEventListener("click", function () {
  if (!inpEdit.value.trim()) {
    alert("Заполните поле NAME");
    return;
  } else if (!inpEdit2.value.trim()) {
    alert("Заполните поле EMAIL");
    return;
  }
  let arrData = JSON.parse(localStorage.getItem("contactList"));
  //создаём новый объект с теми же ключами и значениями из новых инпутов
  let editObj = {
    name: inpEdit.value,
    email: inpEdit2.value,
  };
  //пушим новый объект в массив методом splice куда первым значением подставляем индекс из span который был туда добавлен в качестве id в момент вызова функции редактирования
  arrData.splice(boxIndex.id, 1, editObj);
  //возвращаем всё обратно в локал в изменённом состоянии
  localStorage.setItem("contactList", JSON.stringify(arrData));
  //вызываем снова фунцию вывода на страницу
  modal.style.display = "none";
  readContactList();
});

//! Один раз вызываем функцию для отображения данный в глоабальной обсласти видимости/ чтобы человек зайдя на сайт увидел все данные которые у него были до недавнего времени/ если не вызывать эту функцию то при посещении сайта наша страница будет пустой/
readContactList();
