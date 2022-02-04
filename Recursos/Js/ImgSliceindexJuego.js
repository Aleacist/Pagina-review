// no va :c
var imgSliceJuegoX = 0;
var imgSliceJuegoMargen = 5;
var imagenesSliceJuegos = document.getElementsByClassName("imagenSliceJuego");
RestoJuego();
function moverImagenesJuegoIzquierda() {
  if (imgSliceJuegoX - 1 >= 0) {
    imgSliceJuegoX = imgSliceJuegoX - 1;
  }
  RestoJuego();
}
function moverImagenesJuegoDerecha() {
  if (imgSliceJuegoX + imgSliceJuegoMargen < imagenesSliceJuegos.length) {
    imgSliceJuegoX = imgSliceJuegoX + 1;
  }
  RestoJuego();
}

function RestoJuego() {
  for (var i = 0; i < imagenesSliceJuegos.length; i++) {
    imagenesSliceJuegos[i].style.display = "none";
  }

  for (var i = imgSliceJuegoX; i < imgSliceJuegoX + imgSliceJuegoMargen; i++) {
    imagenesSliceJuegos[i].style.display = "block";
  }
}
