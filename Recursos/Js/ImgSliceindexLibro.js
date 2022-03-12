var imgSliceLibroX = 0;
var imgSliceLibroMargen = 5;
var imagenesSliceLibro = document.getElementsByClassName("imagenSliceLibro");

function moverImagenesLibroIzquierda() {
  if (imgSliceLibroX - 1 >= 0) {
    imgSliceLibroX -= 1;
  }
  RestoLibro();
}

function moverImagenesLibroDerecha() {
  if (imgSliceLibroX + imgSliceLibroMargen < imagenesSliceLibro.length) {
    imgSliceLibroX += 1;
  }
  RestoLibro();
}

function numbImgL() {
  if (imageSizeW * imgSliceLibroMargen + 130 + 37*2 < widthWindow) {
    while(imageSizeW * imgSliceLibroMargen + 130 + 37*2 < widthWindow){
    imgSliceLibroMargen += 1;}
    return;
  }else {while(imageSizeW * imgSliceLibroMargen + 45  + 37*2 > widthWindow) {imgSliceLibroMargen -= 1}}
  RestoLibro();
}

function RestoLibro() {
  for (var i = 0; i < imagenesSliceLibro.length; i++) {
    imagenesSliceLibro[i].style.display = "none";
  } 
  for (var i = imgSliceLibroX; i < imgSliceLibroX + imgSliceLibroMargen; i++) {
    imagenesSliceLibro[i].style.display = "block";
  }
}

RestoLibro();
numbImgL();
window.addEventListener("resize", numbImgL);
