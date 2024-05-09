# Gestor Académico

Este proyecto es un gestor académico que integra una aplicación frontend desarrollada en React.js y un backend desarrollado en Spring Boot. La aplicación proporciona herramientas para gestionar usuarios, cursos, matrículas y otras funcionalidades relacionadas con la gestión académica.

## Ejecutar la Aplicación

### Frontend (React.js)
Para ejecutar el frontend de la aplicación, sigue estos pasos:

1. Navega hasta el directorio del proyecto frontend: 

cd edugestorft-front

2. Instala las dependencias utilizando npm:

npm install

3. Inicia el servidor de desarrollo:

npm start

Esto iniciará el servidor de desarrollo de React en [http://localhost:3000](http://localhost:3000), donde podrás ver la aplicación en tu navegador.

### Backend (Spring Boot)
Para ejecutar el backend de la aplicación, sigue estos pasos:

ANTES DE EJECUTAR EL PROYECTO DE JAVA ASEGURESE DE TENER UNA BASE DE DATOS CON EL NOMBRE: 
 edugestorft_db1 

Luego en su IDE de preferencia:

1. Navega hasta el directorio del proyecto backend:

cd edugestorback

2. Compila el proyecto utilizando Maven:

mvn clean install


3. Inicia el servidor Spring Boot: 

Ejecuta el Main -DemoApplication

El backend estará disponible en [http://localhost:8080](http://localhost:8080).


SCRIPTS DE EJECUCION EN LA BASE DE DATOS:


INSERT INTO pais (pais) VALUES
('CO'),
('AD'),
('AF'),
('BR'),
('CD'),
('CF'),
('CG'),
('KR'),
('KZ'),
('LA');

INSERT INTO rol (nombre) VALUES 
('rector'),
('estudiante'),
('profesor')

INSERT INTO persona (nombre,pais_id_pais) 
VALUES ("Admin", 1)


INSERT INTO usuario (usuario,contrasena,persona_id,id_rol)
VALUES ("Admin", "admin123", 1,1)




