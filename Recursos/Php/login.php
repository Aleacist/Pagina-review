<?php
if (isset($_POST['input'])) {
  
  $nombre = $_POST['Usuario'];
  $passw = $_POST['Pass'];
  $conexion = new mysqli('localhost', 'root', 'root','bd_myreview');
  
  $consulta = $conexion->stmt_init();
  $consulta->prepare("SELECT  Id_usuario,nombre,pass,puntos FROM usuarios WHERE nombre = ? AND clave = ?");
  $consulta->bind_param("ss",$nombre,$passw);
  $consulta->execute();

  $consulta->bind_result($id,$usuario,$pass,$puntos);
  $consulta->fetch();
  if ($nombre == $usuario) {
    echo"<script>console.log('logeado')</script>";
  } else{
    echo"<script>console.log('error')</script>";
  }
  
  $consulta->close();
  $conexion=null;
}
?>