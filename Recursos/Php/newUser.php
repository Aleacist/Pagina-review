<?php 
    $resultado;
    $name = $_GET['name'];
    $pass = $_GET['pass'];
    $mail = $_GET['mail'];
    $age = $_GET['age'];
    // $cif = $_GET['cif'];
    // $type = $_GET['type'];
    $conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
    // $conexion = conectar();
    $consulta = $conexion->query("INSERT INTO usuarios VALUES ('','$name','$pass','$mail','$age')");
    $conexion=null;
?>