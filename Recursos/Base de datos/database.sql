
create table usuario(
    Id_usuario int,
    nombre varchar(45) unique,
    passw varchar(45), 
    email varchar(30),
    edad date,
    fecha timestamp,
    puntos int,
    primary key(Id_usuario)
);

create table comentario(
    Id_com int,
    contenido varchar(250),
    nota tinyint,
    id_usuario int,
    primary key(Id_com)
);

create table juego(
    Id_juego int,
    nombre varchar(30) unique,
    puntuacion tinyint,
    img varchar(100),
    primary key(Id_juego)
);
