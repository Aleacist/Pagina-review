
const NombreRegistrado = ["aday", "pepe", "antonio", "pedro", "sara"];
const ContraseñaRegistrada = ["1", "2","3","4","5"];

function AbrirModal() {
    document.getElementById("modal").style.display = "block";
}
function CerrarModal() {
    document.getElementById("modal").style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        document.getElementById("modal").style.display = "none";
    }
}

function comprobar() {
    var contador = 0;
    const Nombre = document.getElementById("Nombre").value;
    var contador2 = 0;
    const Contraseña = document.getElementById("Contraseña").value;
    console.log(Nombre);
    for (i = 0; i < NombreRegistrado.length; i++) {
        if (Nombre == NombreRegistrado[i]) {
            for (i = 0; i < ContraseñaRegistrada.length; i++) {
                if (Contraseña == ContraseñaRegistrada[i]) {
                    if (contador != contador2){
                        alert("No coincide los datos");
                        return
                    }            alert("has entrado");
                } else contador2 += 1;
            }
            if (contador2 == ContraseñaRegistrada.length) {
                alert("contraseña incorrecta");
                return
            }
        } else contador += 1;
    }
    if (contador == NombreRegistrado.length) {
        alert("No existe ese usuario");
    }
}
