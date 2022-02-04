var imgSliceSerieX = 0;
var imgSliceSerieMargen = 5;
var imagenesSliceSerie = document.getElementsByClassName("imagenSliceSerie");
RestoSerie();
function moverImagenesSerieIzquierda () {
    if (imgSliceSerieX - 1 >= 0) {
        imgSliceSerieX = imgSliceSerieX - 1;
    }
    RestoSerie();
};
function moverImagenesSerieDerecha () {
    if (imgSliceSerieX + imgSliceSerieMargen < imagenesSliceSerie.length) {
        imgSliceSerieX = imgSliceSerieX + 1;
    }  
    RestoSerie();
};
function RestoSerie(){
    for(var i = 0;i < imagenesSliceSerie.length;i++){
        imagenesSliceSerie[i].style.display="none";
    };

    for(var i = imgSliceSerieX;i < imgSliceSerieX + imgSliceSerieMargen;i++){
        imagenesSliceSerie[i].style.display="block";
    };
}