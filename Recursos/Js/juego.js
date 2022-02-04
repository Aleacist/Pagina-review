varDerecha = Math.floor(Math.random() * 10);
varCentro  = Math.floor(Math.random() * 10);
varIzquierda = Math.floor(Math.random() * 10);
puntos = prompt('¿Cuanto apuestas');
if (varDerecha == varCentro && varCentro == varIzquierda){
  puntos = puntos * varDerecha;
  alert(puntos)
} else (varDerecha != varCentro)
    alert('pierdes')
;
console.log(varDerecha);
console.log(varCentro);10

console.log(varIzquierda);