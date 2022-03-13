function Register() {
    const Contrasena1 = document.getElementById("password1").value;
    const Contrasena2 = document.getElementById("password2").value;

    if (Contrasena1 != Contrasena2) {
        alert('las contraseñas no son iguales')
    }
}