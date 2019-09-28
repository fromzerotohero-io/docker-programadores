# Solución Workshop PHP-nginx-MySQL

## Imagen para crear el proyecto
Encontrarás el fichero `Dockerfile-instalacion`, lo puedes usar para generar una imagen que servirá para crear el directorio de carpetas de Symfony y probar el servidor de desarrollo de Symfony. Para generar la imagen, añade el fichero `Dockerfile` con el contenido de `Dockerfile-instalacion` y ejecuta:
```
docker build -t app-php .
```
Con la imagen generada, instanciaremos un container, desde el cual instalaremos el cli de Symfony en nuestro host (mediante bind mount).
```
docker run --rm -it -v $(pwd):/var/www app-php composer create-project symfony/website-skeleton app-docker
```

## Pruebas con el webserver de desarrollo
Debemos añadir algunos cambios al Dockerfile anterior, ya que cuando ejecutemos Symfony, necesitamos hacerlo con un usuario que tenga permisos, necesitamos un módulo de PHP para la conexión con MySQL y podemos eliminar los archivos descargados. Encontrarás el Dockerfile actualizado con el nombre `Dockerfile-app`. Piensa en qué capa se invalidará la caché al volver a generar la imagen.

Con la imagen creada, vamos a instanciar un container con el que provar Symfony con el webserver de desarrollo que incluye. Ejecuta:
```
docker run --rm -it -v $(pwd)/app-doc:/var/www -p 8080:8000 app-php bash
```
Dentro de la shell del container, instalaremos el cli de Symfony con el siguiente comando:
```
curl -sS https://get.symfony.com/cli/installer | bash

export PATH="$HOME/.symfony/bin:$PATH"
```
Como lo estamos haciendo desde un container y los archivos del cli de Symfony no se guardan en un volumen, el cli de Symfony no estará instalado cuando volvamos a levantar un container. Si prefieres tenerlo disponible, añade el comando en el Dockerfile y vuelve a generar la imagen.

Finalmente, desde la shell del container, ejecuta:
```
symfony server:start
```
Si todo ha funcionado correctamente, deberías poder hacer una petición a `localhost:8080` y te debería devolver una respuesta con el `"Welcome to Symfony"`.

## docker-compose.yml
Para empezar a gestionar los distintos servicios que necesitaremos, usaremos `docker-compose`. Para esto, hiremos añadiendo servicios y volumenes al fichero `docker-compose.yml`. Encontrarás la definición del servicio para Symfony y el servicio para nginx. Recuerda que debes copiar el ficher `docker-compose.yml` a la carpeta del ejercicio, en esa carpeta deberías tener el fichero Dockerfile generado préviamente, y ejecutar desde esa carpeta los comandos.

Ejecuta el siguiente comando para levantar todo el entorno:
```
docker-compose up
```
Fíjate que no usamos el flag `-d`, de manera que en el terminal se imprimirá el `STDOUT` de ambos servicios. Esto va bien para probar servicios nuevos, cambios, debugar en general. Más adelante, usaremos el flag `-d` para tener el terminal disponible para otros comandos.

Haciendo una petición a `localhost:8080` deberías obtener la página de `Welcome`.

## Servicio de MySQL
Para añadir el servicio de MySQL, aquí tienes la definición básica para añadir en el fichero `docker-compose.yml`, después del servicio `webserver` (acuérdate de respetar la indentación!):
```
services:
    app:
        ...
    webserver:
        ...
    db:
    image: mysql
    volumes:
      - db-data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=symfony
```
Puedes añadirle un mapeo de puertos para conectarte desde algún gestor de MySQL y comprobar que funciona correctamente.

Modifica el fichero `.env` tal y como se indica en el ejercicio, y posteriormente ejecuta el comando para generar el schema de la base de datos.

A partir de aquí, sigue las instrucciones del ejercicio para añadir rutas y controllers de Symfony, mediante las cuales realizarás peticiones a la base de datos.

## Tests con Docker
Cuando en el ejericio se dice `"nos conectamos al container del servicio app y ejecutamos el siguiente comando"`, hace referencia al comando `docker-compose exec`. En nuestro caso sería:
```
docker-compose exec app php bin/phpunit
```

## Automatización con Makefile