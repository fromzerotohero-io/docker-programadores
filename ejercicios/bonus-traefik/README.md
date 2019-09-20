# Traefik: reverse proxy y HTTP load balancer para servicios de Docker
Una vez finalizados ambos proyectos (entorno de PHP-Symfony y entorno de NodeJS), ¿qué pasaría si ambos servicios forman parte de nuestro sistema y deben recibir peticiones HTTP externas? Si ambos servicios están mapeados al puerto 80 del host, uno de los dos servicios no se podrá levantar (Docker dará error).

Una solución es usar un balanceador HTTP: según el dominio/subdominio de la petición HTTP, enrutarla a un servicio de Docker distinto. Por ejemplo, las peticiones a `node-api.localhost` las enrutaría al servicio `api` de NodeJS, mientras que las peticiones a `php-app.localhost` las podría enrutar al servicio `app` de PHP (las urls usadas son a modo de ejemplo, podrían ser distintas, incluso usando nuestro propio dominio). Vamos a probarlo con los entornos de los proyectos. Let's go!

## Antes de empezar, asegúrate de parar los entornos de PHP y NodeJS
Para que Traefik pueda detectar los containers de Docker y enrutar las peticiones HTTP de forma automática, deberemos conectar todos los servicios a la misma network. Esto lo conseguiremos creando la network en el `docker-compose.yml` con el servicio `traefik`, mientras que en los otros `docker-compose.yml` usaremos la misma network con el parámetro `external`.

Asegúrate que los entorno de PHP y NodeJS estén parados (ejecutando `docker-compose down` o `docker-compose stop` en el directorio de cada proyecto).

## Primero levantemos Traefik
El siguiente paso será levantar el entorno de Traefik, donde hay definido un servicio, `traefik`, y una network, `traefik-public`.

## Cambios en la configuración del docker-compose de PHP
En el fichero `docker-compose.yml` del proyecto de PHP deberás añadir el apartado `networks`, en el cual deberás añadir el siguiente código:
```
networks:
  traefik-public:
    external: true
    name: traefik-public
```

Deberás añadir la network `traefik-public` al servicio `webserver`, y los siguientes `labels`:
- "traefik.frontend.rule=Host:php-app.localhost"
- "traefik.docker.network=traefik-public"
- "traefik.port=80"

Si hacer una petición a `php-app.localhost` debería aparecerte la página de bienvenida de Symfony. Traefik ya está funcionando! Pero si haces una petición que use la base de datos, verás que aparece un error: no se ha encontrado el servicio. Esto es porque al crear una network, docker compose no ha creado una network para el proyecto con todos los containers. Por lo tanto, el container `app` y el container `db` del proyecto de Symfony no comparten ninguna red y no se puede conectar usando el _service discovery_ de Docker.

Crea otra network para los containers del proyecto de Symfony, y añade los containers necesarios a ella. Si los has hecho correctamente, las rutas que usan base de datos deberían funcionar como antes de usar Traefik.

## Cambios en la configuración del docker-compose de NodeJS
En el caso del proyecto de NodeJS tienes que seguir el mismo procedimiento. Como ya has visto cómo se debe hacer con el proyecto de Symfony, en este proyecto te dejo que lo pruebes sin pistas. Tú puedes!
