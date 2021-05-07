/* Нашел нужные Dom-элементы */
let low = document.querySelector(".add_low");
let midle = document.querySelector(".add_midle");
let senior = document.querySelector(".add_senior");
let gamer_distribution = document.querySelector(".gamer_distribution");
let number_team_1 = document.querySelector(".team_1");
let number_team_2 = document.querySelector(".team_2");
let number_team_3 = document.querySelector(".team_3");
let input_type_checkbox_is_id = document.querySelectorAll("input");

/* Создал массивы с игроками по уровню игры  */
let arr_low = [];
let arr_midle = [];
let arr_senior = [];


/* Создал массивы команд */
let arr_team_1 = [];
let arr_team_2 = [];
let arr_team_3 = [];


/* Нашел контейнеры для хранения этих туш */
let low_gamer = document.querySelector(".low_gamer");
let midle_gamer = document.querySelector(".midle_gamer");
let senior_gamer = document.querySelector(".senior_gamer");

/* Функция которая узнает какой checkbox активный */
let activity_checkbox = function (){
    let checkbox = document.getElementsByTagName("input");
    let i = 0;
    while (i < checkbox.length){
        console.log(checkbox[i].checked);
        if (checkbox[i].checked){
            z = checkbox[i].id;
            console.log(z)
            return z;
        };
        i++;
    };
};
/* Функция которая исправит баги нумирации и ID при удалении игроков */
let debug_gamer = function(arr_gamer, class_conteiner ){
    let gamer_class = document.querySelector('.'+ class_conteiner).childNodes;//Нашел все дочерние элименты
    /* Удалил дочерние элементы */
    let i = 0;
    while (i < gamer_class.length){
        gamer_class[i].remove();
    };
    /* Записываю их по новой */
    for (let i = 0; i < arr_gamer.length; i++){
        let div = document.createElement("div"); //Создал виртуальный Dom
        div.id = i; //Присвоел ему ID
        div.className = "gamer_redact"; //Присвоел ему класс
        div.innerHTML = (i + 1) + " : " + arr_gamer[i]; // Добавил содерживое
        let gamer_class_lvl = document.querySelector('.'+ class_conteiner);//Нашел контейнер с классом который получил в функцию
        gamer_class_lvl.appendChild(div);// Показал его

        /* Создал кнопку удаления */
        let div_delete = document.createElement("label"); // Добавил виртуальный Dom - элемент. Ни кто его не видит.
        div_delete.className = "delete"; // Добавил класс Delete кнопке Label
        div_delete.innerHTML = ""; // Добавил иконку
        div.appendChild(div_delete); // Отобразил  Dom
        /* Даровал умение удалять(обработчик событий повесил XD) */
        let a = document.querySelector("." + class_conteiner).querySelectorAll(".delete");// Нашел все кнопки с классом Delete
        a[a.length -1].onclick = function(event){
            event.preventDefault(); // отключил стандартное действие кнопки
            let class_parent_this = this.parentNode.parentNode.className; //Нашел класс родителя-родителя
            arr_gamer.splice(this.parentNode.id, 1); // Удалил игрока из массива
            this.parentNode.remove(); // Убрал игрока с экрана
            debug_gamer(arr_gamer, class_parent_this);// Опять отправил дебажить(чот типо рекурсии,но это не точно) 
        };
    };
};

/* Функция которая могет добавлять новых игроков.
Получает имя игрока,массив игроков, контейнер для туш.*/
let add = function(name,arr,gamer){
    arr.push(name);//Добавил имя игрока в массив.
    let div = document.createElement("div"); // Добавил виртуальный Dom - элемент. Ни кто его не видит.
    div.id = arr.length - 1;// Нашел ID последнего добавленного игрока, присвоил тушке ID, еще все ни кто не видит его.
    div.className = "gamer_redact";
    div.innerHTML = arr.length + " : " + name;// Дал имя контейнеру для туши. Все так же скрыт :)
    gamer.appendChild(div);// Опаньки! Показал всем, что наделал:)

    /* Создал кнопку удаления */
    let div_delete = document.createElement("label"); // Добавил виртуальный Dom - элемент. Ни кто его не видит.
    div_delete.className = "delete"; // Добавил класс Delete кнопке Label
    div_delete.innerHTML = ""; // Добавил иконку
    div.appendChild(div_delete); // Отобразил  Dom
    div_delete.onclick = function() {
        let class_parent_this = this.parentNode.parentNode.className; //Нашел класс родителя-родителя
        arr.splice(this.parentNode.id, 1); // Удалил игрока из массива
        this.parentNode.remove(); // Убрал игрока с экрана
        debug_gamer(arr, class_parent_this);//Отправил дебажить текущий массив
    };  
    console.log(arr);
};

/* Функция которая получает массив игроков определенного уровня.
Распределяет игроков рандомно  */
let random_distribution_geamer_2 = function(arr_1, quantity_teams) {
    let meter = quantity_teams;
    while (arr_1.length != 0){
        if(meter == 0){
            meter = activity_checkbox(); 
        }else if(meter == 3){
            let id_random_geamer =  Math.floor(Math.random() * arr_1.length); // Находим случайное число(Игрока по его ID). Записываем его в индекс
            arr_team_3.push(arr_1[id_random_geamer]);
            arr_1.splice(id_random_geamer, 1);
            meter = meter - 1;
        }else if(meter == 2){
            let id_random_geamer =  Math.floor(Math.random() * arr_1.length); // Находим случайное число(Игрока по его ID). Записываем его в индекс
            arr_team_2.push(arr_1[id_random_geamer]);
            arr_1.splice(id_random_geamer, 1);
            meter = meter - 1;
        }else if(meter == 1){
            let id_random_geamer =  Math.floor(Math.random() * arr_1.length); // Находим случайное число(Игрока по его ID). Записываем его в индекс
            arr_team_1.push(arr_1[id_random_geamer]);
            arr_1.splice(id_random_geamer, 1);
            meter = meter - 1;
        };
        
    };
    console.log(meter);
   return meter;
};
let random_distribution = function () {
     /* Low Игроки */
     let arr_1_new = arr_low.slice(); // Сделал копию массива Low игроков
     let z1 = random_distribution_geamer_2(arr_1_new, activity_checkbox());
 
     /* Midle Игроки */
     let arr_2_new = arr_midle.slice(); // Сделал копию Midle игроков
     let z2 = random_distribution_geamer_2(arr_2_new, z1);
 
     /* Senior игроки */
     let arr_3_new = arr_senior.slice(); // Сделал копию Senior игроков
     random_distribution_geamer_2(arr_3_new, z2);
};
/* Функция которая получает массив игроков определенного уровня.
Распределяет игроков рандомно OLD */
/* let random_distribution_geamer = function(arr, arr_team, index) {
    let i = 0;
    while (i < index){
        let index =  Math.floor(Math.random() * arr.length); // Находим случайное число(Игрока по его ID). Записываем его в индекс
        arr_team.push(arr[index]); // Добавляем Игрока в массив команды
        arr.splice(index, 1); // Удаляем Игрока из старого массива
        i++;
    }
}; */


/* Пишем функцию которая покажет это все на экране.
Передаем ей массив игроков и найденный ранее Dom элемент для хранения */
let output_team = function (arr_team, number_team){
    let i = 0;
    while ( i < arr_team.length ) {
        let div = document.createElement("div"); // Добавил виртуальный Dom - элемент. Ни кто его не видит.
        div.className = "gamer_team";// Добавил Class контейнеру игрока;
        div.innerHTML = arr_team[i];// Записал имя игрока в контейнер. Все так же скрыт :)
        number_team.appendChild(div);// Показал игрока на экране.
        i++;
    }
};



/* Событие клика по кнопке Добавить Low игроков */
low.onclick = function(event){
    event.preventDefault(); //Отключил стандартное действие кнопки
    let checkName = prompt("Как будем звать этого Low игрока?"); 
    if (checkName != "" & checkName != null){ //Проверил ввели ли имя игрока
        add(checkName, arr_low, low_gamer );//Запросил имя игрока, вызвал функцию,передал ей имя и параметры.
    };
};
/* Событие клика по кнопке Добавить Midle игроков */
midle.onclick = function(event){
    event.preventDefault();//Отключил стандартное действие кнопки
    let checkName = prompt("Как будем звать этого Midle игрока?");
    if (checkName != "" & checkName != null){//Проверил ввели ли имя игрока
        add(checkName, arr_midle, midle_gamer );//Запросил имя игрока, вызвал функцию,передал ей имя и параметры.
    };
};
/* Событие клика по кнопке Добавить Senior игроков */
senior.onclick = function(event){
    event.preventDefault();//Отключил стандартное действие кнопки
    let checkName = prompt("Как будем звать этого Senior игрока?"); 
    if (checkName != "" & checkName != null ){//Проверил ввели ли имя игрока
        add(checkName, arr_senior, senior_gamer );//Запросил имя игрока, вызвал функцию,передал ей имя и параметры.
    }; 
};
/* Событие клика по Checkbox */
let i = 0;
while ( i < input_type_checkbox_is_id.length){
    input_type_checkbox_is_id[i].onclick = function(){
        activity_checkbox();
        click_gamer_distribution();
    };
    i++;
}
/* Делаем магию :) Формируем команды и отображаем их на экране */
let click_gamer_distribution = gamer_distribution.onclick = function(){
    
    /* Чистка массивов */
    arr_team_1 = []; // Очещаем массив, на случай если командам не понравится рандом!))
    arr_team_2 = []; // Очещаем массив, на случай если командам не понравится рандом!))
    arr_team_3 = []; // Очещаем массив, на случай если командам не понравится рандом!))
    /* Удаляем сформированные команды из HTML */
    let z = document.querySelectorAll(".gamer_team");//Нашел Dom элементы с классом gamer_team. Хранится в массиве
    let index_z = z.length; // Нашел длинну массива
    let i = 0;
    while(i < index_z) { 
        z[i].parentNode.removeChild(z[i]); // Удалил Dom узлы по очереди
        i++;
    };

    /* Мешаем игроков */

    random_distribution();

   /*  Отображаем команды на экране */
    output_team(arr_team_1, number_team_1);
    output_team(arr_team_2, number_team_2);
    output_team(arr_team_3, number_team_3);
    
    console.log(arr_team_1);
    console.log(arr_team_2);
    console.log(arr_team_3);
}


