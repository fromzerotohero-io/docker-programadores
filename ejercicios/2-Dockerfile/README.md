# Dockerfile
En este ejercicio, crearemos distintas imágenes a partir de un archivo Dockerfile.

## Ejercicio a)
Elabora un Dockerfile para crear una imagen la cual incluya los archivos _archivo1_ y _archivo2_ dentro de la carpeta `/var/www`.

Para generar la imagen, ejecutamos el comando

`docker build -t test-con-archivos .`

Para comprovar que la imagen contiene los archivos, ejecutamos el comando

```docker run --rm test-con-archivos ls -la /var/www```

## Ejercicio b)
Elabora un Dockerfile para crear una imagen que contenga el fichero `composer.json` y las dependencias de este. Usa la imagen `composer:latest` como imagen base.

Para generar la imagen, ejecutamos el comando

`docker build -t test-run-composer .`

Para comprovar que la imagen contiene los archivos del ejercicio a) e imprime la lista de ficheros en `/var/wwww`, ejecutamos el comando

```docker run --rm test-run-composer```

## Ejercicio c)
Elabora un Dockerfile para crear una imagen que imprima en pantalla la lista de ficheros, por defecto del directorio `/var`, o del directorio que pasemos como comando al instanciar el container.

Para generar la imagen, ejecutamos el comando

`docker build -t test-ls .`

Para comprovar que la imagen imprime la lista de ficheros en `/var`, ejecutamos el comando

```docker run --rm test-ls```

El output debería ser distinto si ejecutamos el siguiente comando:

```docker run --rm test-ls /etc```
