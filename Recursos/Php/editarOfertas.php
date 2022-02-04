<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idOferta = $_GET['idOferta'];
$oferta = $_GET['oferta'];
$precio = $_GET['precio'];
$inventario = $_GET['inventario'];
$idEmpresa = $_GET['idEmpresa'];
$sql = "UPDATE ofertas SET oferta='$oferta',precio='$precio',inventario='$inventario',idEmpresa='$idEmpresa' WHERE idOferta=$idOferta;";
$preparado = $conexion->prepare($sql);
$preparado->execute();
$conexion= null;
?>
