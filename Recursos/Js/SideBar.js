/*Funciones que abren y cierran las side bar*/
function AbrirSideBar() {
  document.getElementById("OpenSidebar").style.display = "none";
  document.getElementById("Sidebar").style.left = "0px";
  document.getElementById("Main").style.marginLeft = "115px";
}

function CerrarSideBar() {
  document.getElementById("Sidebar").style.left = "-115px";
  document.getElementById("OpenSidebar").style.display = "inline-block";
  document.getElementById("Main").style.marginLeft = "0px";
}
