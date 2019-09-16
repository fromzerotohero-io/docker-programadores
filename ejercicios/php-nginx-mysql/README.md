# Proyecto de PHP - Symfony + nginx + MySQL con Docker
Vamos a crear un proyecto de Symfony con la última versión disponible (v4), con PHP 7.2, nginx como web server y MySQL como base de datos relacional. Y todo sin instalar nada en nuestra máquina, ya que todas las dependencias y librerías las gestionaremos con Docker. Let's go!

## Empecemos con una imagen para crear el proyecto
Necesitaremos una imagen de Docker donde esté `PHP 7.2` y `composer` para instalar dependencias. Para crear un proyecto en Symfony, hacen falta las siguientes librerías:
- composer (curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer)
- git
- zip
- unzip

Con el Dockerfile generamos una imagen para instalar el proyecto. Instanciamos un container con la opción de bind-mount, para que el proyecto de Symfony se guarde en la carpeta donde estamos trabajando. Dentro del container, ejecutamos el comando:

```composer create-project symfony/website-skeleton app-docker```

## Provemos que nuestra app recibe peticiones y responde a ellas
Una vez esté todo el proyecto creado, podemos provar de levantar un servidor de desarrollo de Symfony (aun no será el web server que usaremos más adelante, nginx). Un web server es un software que se encarga de gestionar las peticiones entrantes, ejecutar código PHP (o pasarle un mensaje al intérprete de PHP en el caso de nginx) y devolver una respuesta HTTP con el resultado de la ejecución de PHP.

Podemos aprovechar la imagen creada anteriormente, con un container al que le mapearemos el puerto 8080 de nuestro host. Una vez tengamos el container instanciado, instalamos el `Symfony CLI` 

```curl -sS https://get.symfony.com/cli/installer | bash```

y levantamos el servidor de desarrollo:

`cd app-docker`

`symfony server:start`

## Configuración inicial del entorno con docker-compose.yml
Inicialmente, configuraremos un servicio para Symfony y otro para nginx con un fichero `docker-compose.yml`. Usaremos la versión 3.5 de docker-compose.

Para el servicio de Symfony, definimeros el primer servicio con el nombre `app`. Como queremos usar nginx como webserver, necesitamos PHP FPM (PHP FastCGI Process Manager). Se trata de un interpretador de PHP pensado para webs de alto tráfico, que se comunica con nginx con el protocolo FastCGI a través de peticiones HTTP. Por lo tanto, usaremos la imagen `php:7.2-fpm`. Este servicio deberá tener un bind-mount del proyecto en el host con el directorio por defecto dentro del container (`/var/www`).

Para el servicio de nginx, definiremos otro servicio con el nombre `webserver`. La versión `alpine` nos será suficiente para el proyecto. Deberemos exponer el puerto 80 (peticiones HTTP), y lo mapearemos con el puerto 8080 del host. También necesitaremos un bind-mount para disponer de los archivos de configuración: la carpeta `nginx/conf.d` que encontrarás en el ejercicio se debe mapear a `/etc/nginx/conf.d/`.

Solo queda iniciar el entorno:

```docker-compose up```

Y en el browser introducimos la url `localhost:8080`. Si todo ha funcionado correctamente, deberíamos ver la página de `Welcome to Symfony` con un 404.

## Controller para hacer experimentos
Por ahora ya tenemos configurados los servicios de Symfony y nginx. Nos falta el servicio de MySQL, y poder hacerle peticiones desde el servicio de Symfony. Añadiremos primero un controller, provaremos que nos funciona y, posteriormente, configuraremos el servicio de MySQL y le haremos peticiones desde Symfony.

Encontrarás un fichero con el nombre `UserController.php`. Deberás moverlo a `app-docker/src/Controller`. Seguidamente, en el archivo `app-docker/config/routes.yaml`, añade una ruta para ejecutar el método `UserController::test`. Una vez lo tengas, prueba de hacer una petición a `localhost:8080/<ruta>`.

## Configuremos MySQL
Primero añade un servicio al fichero `docker-compose.yml`, con el nombre `db` y la imagen `mysql:latest`. Deberás exponer el puerto 3306 (lo puedes mapear con el mismo puerto de tu máquina), y deberás usar dos variables de entorno: `MYSQL_ROOT_PASSWORD` con el valor `password`, y `MYSQL_DATABASE` con el valor `symfony`. Además, si no quieres tener que crear los schemas de la base de datos cada vez que levantes el entorno, debes añadir un volumen que apunte al directorio `/var/lib/mysql` del container.

Ahora tenemos que hacer algunos cambios en la parte de Symfony, y ya tendremos la conexión a MySQL lista. En el archivo `.env`, deberás buscar la linea donde aparece `DATABASE_URL=mysql://...` y sustituir `db_user`, `db_password`, `db_name` y `127.0.0.1`.

Para comprobar que la conexión con MySQL funciona, se puede ejecutar un comando desde el servicio de `app`:

```php bin/console doctrine:database:create```

Con el servicio `db` configurado, ejecuta el siguiente comando para generar el schema:

```docker-compose exec -T db mysql -uroot -ppassword symfony < db_structure.sql```

## Peticiones a Symfony con persistencia en MySQL
En el fichero `UserController.php`, además del método test que hemos usado préviamente, hay dos métodos más. Ambos interactúan con MySQL, ya sea persistiendo o leyendo datos. Solo hace falta que añadas las rutas en el fichero `app-docker/config/routes.yaml`, y pruebes que las peticiones a estas rutas funcionan correctamente.

La ruta para el método que persiste datos debe ser tipo `GET`, y espera 3 query parameters para grabar por usuario: `?nombre=aa&apellido=bb&email=cc`.
