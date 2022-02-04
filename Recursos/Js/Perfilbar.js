/*Funciones que abren y cierran perfil*/
var x = 0;
function AbrirPerfil() {
  if (x == 0) {
    document.body.style.overflowX = "hidden";
    document.getElementById("Perfil").style.display = "block ";
    document.getElementById("PerfilAnimacion").style.right = "0px";
    setTimeout(function () {
      document.body.style.overflowX = "auto";
    }, 300);
    x = 1;
  } else {
    document.body.style.overflowX = "hidden";
    document.getElementById("PerfilAnimacion").style.right = "-97px";
    setTimeout(function () {
      document.getElementById("Perfil").style.display = "none";
      document.body.style.overflowX = "auto";
    }, 200);
    x = 0;
  }
}
