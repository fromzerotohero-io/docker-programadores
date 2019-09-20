# Dockerfile
En este ejercicio, crearemos distintas imágenes a partir de un archivo Dockerfile.

## Ejercicio a)
Elabora un Dockerfile para crear una imagen la cual incluya los archivos _archivo1_ y _archivo2_ dentro de la carpeta `/var/www`.

Para generar la imagen, ejecutamos el comando

`docker build -t test-con-archivos .`

Para comprobar que la imagen contiene los archivos, ejecutamos el comando

```docker run --rm test-con-archivos ls -la /var/www```

## Ejercicio b)
Elabora un Dockerfile para crear una imagen que contenga el fichero `composer.json` y que tenga instaladas las dependencias de éste. Usa la imagen `composer:latest` como imagen base.

Para generar la imagen, ejecutamos el comando

`docker build -t test-run-composer .`

Para comprobar que la imagen contiene los archivos del ejercicio a) e imprime la lista de ficheros en `/var/wwww`, ejecutamos el comando

```docker run --rm test-run-composer ls -la```

## Ejercicio c)
Elabora un Dockerfile para crear una imagen que imprima en pantalla la lista de ficheros, por defecto del directorio `/var`, o del directorio que pasemos como comando al instanciar el container.

Para generar la imagen, ejecutamos el comando

`docker build -t test-ls .`

Para comprobar que la imagen imprime la lista de ficheros en `/var`, ejecutamos el comando

```docker run --rm test-ls```

El output debería ser distinto si ejecutamos el siguiente comando:

```docker run --rm test-ls /etc```

## Ejercicio d)
Elabora un Dockerfile para crear una imagen alpine los containers de la cual compartan y persistan los fichero del directorio `/home` una vez paren.

Para comprobar que la imagen se ha generado correctamente, ejecuta el siguiente comando:

```docker run -it --rm --name vol-test test-persistencia sh```

En la shell, situate en el directorio `/home` y ejecuta el siguiente comando:

```touch archivo-persistente.txt```

Abre otro terminal y ejecuta el siguiente comando:

```docker run --rm -it --volumes-from vol-test test-persistencia sh```

Comprueba que en el directorio `/home` existe el fichero `archivo-persistente.txt`.
