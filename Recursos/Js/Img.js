// Por que cojones esto no va aqui pero en los scripts si????
var x = 0;
var margen = 5;
var imagenes = document.getElementsByClassName("imagenDestacado");
Resto();
function moverimagenesizquierda () {
    if (x - 1 >= 0) {
        x = x - 1;
    }
    Resto();
};
function moverimagenesderecha () {
    if (x + margen < imagenes.length) {
        x = x + 1;
    }  
    Resto();
};
function Resto(){
    for(var i = 0;i < imagenes.length;i++){
        imagenes[i].style.display="none";
    };

    for(var i = x;i < x + margen;i++){
        imagenes[i].style.display="block";
    };
}