# Dockerfile
En este ejercicio, crearemos distintas imágenes a partir de un archivo Dockerfile.

## Ejercicio a)
Crea una imagen la cual incluya los archivos _archivo1_ y _archivo2_ dentro de la carpeta `/var/www`.

Para generar la imagen, ejecutamos el comando

`docker build -t test-con-archivos .`

Para comprovar que la imagen contiene los archivos, ejecutamos el comando

```docker run --rm test-con-archivos ls -la /var/www```
