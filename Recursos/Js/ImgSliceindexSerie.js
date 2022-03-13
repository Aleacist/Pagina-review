var imgSliceSerieX = 0;
var imgSliceSerieMargen = 5;
var imagenesSliceSerie = document.getElementsByClassName("imagenSliceSerie");

function moverImagenesSerieIzquierda () {
    if (imgSliceSerieX - 1 >= 0) {
        imgSliceSerieX -= 1;
    }
    RestoSerie();
};
function moverImagenesSerieDerecha () {
    if (imgSliceSerieX + imgSliceSerieMargen < imagenesSliceSerie.length) {
        imgSliceSerieX += 1;
    }  
    RestoSerie();
};

function numbImgS() {
    if (imageSizeW * imgSliceSerieMargen + 130 + 37*2 < widthWindow) {
        while(imageSizeW * imgSliceSerieMargen + 130 + 37*2 < widthWindow){
      imgSliceSerieMargen += 1;}
      return;
    }else {while(imageSizeW * imgSliceSerieMargen + 45  + 37*2 > widthWindow){imgSliceSerieMargen -= 1}}
    RestoSerie();
  }

function RestoSerie(){
    for(var i = 0;i < imagenesSliceSerie.length;i++){
        imagenesSliceSerie[i].style.display="none";
    };
    for(var i = imgSliceSerieX;i < imgSliceSerieX + imgSliceSerieMargen;i++){
        imagenesSliceSerie[i].style.display="block";
    };
}

numbImgS();
RestoSerie();
window.addEventListener("resize", numbImgS);
