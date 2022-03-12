var imgSliceJuegoX = 0;
var imgSliceJuegoMargen = 5;
var imagenesSliceJuegos = document.getElementsByClassName("imagenSliceJuego");

function moverImagenesJuegoIzquierda() {
  if (imgSliceJuegoX - 1 >= 0) {
    imgSliceJuegoX -= 1;
  }
  RestoJuego();
}

function moverImagenesJuegoDerecha() {
  if (imgSliceJuegoX + imgSliceJuegoMargen < imagenesSliceJuegos.length) {
    imgSliceJuegoX += 1;
  }
  RestoJuego();
}

function numbImgJ() {
  if (imageSizeW * imgSliceJuegoMargen + 130 + 37*2 < widthWindow) {
    while (imageSizeW * imgSliceJuegoMargen + 130 + 37*2 < widthWindow){
      imgSliceJuegoMargen += 1;
    }
    return;
  }else {while(imageSizeW * imgSliceJuegoMargen + 45  + 37*2 > widthWindow) {imgSliceJuegoMargen -= 1}}
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


numbImgJ();
RestoJuego();
window.addEventListener("resize", numbImgJ);


