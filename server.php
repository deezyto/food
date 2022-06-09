<?php 

//робимо щоб php міг працювати з JSON форматом
$_POST = json_decode(file_get_contents("php://input"), true);

//виводимо те що прийшло з методом POST в консоль
echo var_dump($_POST);