<?php
//datos
$cadena_conexion='mysql:dbname=bd_myreview;host=127.0.0.1';
$nombre='root';
$clave='';
try{
    //conectar
    $bd = new PDO($cadena_conexion,$nombre,$clave);
    echo"Logeado<br>";
// insertar nuevo usario
$ins = "insert into usuarios(nombre, clave, puntos) values(‘Yeray’, '1234', 
'1');";
$resul = $bd->query($ins);
//comprobar errores
if($resul) {
echo "insert correcto <br>";
echo "Filas insertadas: " . $resul->rowCount() . "<br>";
}else print_r( $bd -> errorinfo());
// para los autoincrementos
echo "Código de la fila insertada" . $bd->lastInsertId() . "<br>"
}catch (PDOExceptio $e){
    echo'Error con la base de datos'.$e->getMessage();
}?>
