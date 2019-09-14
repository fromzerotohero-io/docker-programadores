# Proyecto de PHP - Symfony + nginx + MySQL con Docker
Vamos a crear un proyecto de Symfony con la última versión disponible (v4), con PHP 7.1, nginx como web server y MySQL como base de datos relacional. Y todo sin instalar nada en nuestra máquina, ya que todas las dependencias y librerías las gestionaremos con Docker. Let's go!

## Empecemos con una imagen para crear el proyecto
Necesitaremos una imagen de Docker donde esté `PHP 7.2` y `composer` para instalar dependencias. Para crear un proyecto en symfony, hacen falta las siguientes librerías:
- git
- composer
- zip
- unzip

Con el Dockerfile generamos una imagen para instalar el proyecto. Instanciamos un container con la opción de bind-mount, para que el proyecto de symfony se guarde en la carpeta donde estamos trabajando. Dentro del container, ejecutamos el comando:

```composer create-project symfony/website-skeleton app-docker```

## Provemos que nuestra app recibe peticiones y responde a ellas
Una vez esté todo el proyecto creado, podemos provar de levantar un servidor de desarrollo de symfony (aun no será el web server que usaremos más adelante, nginx). Un web server es un software que se encarga de gestionar las peticiones entrantes, ejecutar código PHP (o pasarle un mensaje al intérprete de PHP en el caso de nginx) y devolver una respuesta HTTP con el resultado de la ejecución de PHP.

Podemos aprovechar la imagen creada anteriormente, con un container al que le mapearemos el puerto 8080 de nuestro host. Una vez tengamos el container instanciado, instalamos el `Symfony CLI` 

```curl -sS https://get.symfony.com/cli/installer | bash```

y levantamos el servidor de desarrollo:

`cd app-docker`

`symfony server:start`

## Empecemos a configurar el entorno con docker-compose.yml
Inicialmente, configuraremos un servicio para Symfony y otro para nginx con un fichero `docker-compose.yml`. Usaremos la versión 3.5 de docker-compose.

Para el servicio de Symfony, definimeros el primer servicio con el nombre `app`. Como queremos usar nginx como webserver, necesitamos PHP FPM (PHP FastCGI Process Manager). Se trata de un interpretador de PHP pensado para webs de alto tráfico, que se comunica con nginx con el protocolo FastCGI a través de peticiones HTTP. Por lo tanto, usaremos la imagen `php:7.2-fpm`. Este servicio deberá tener un bind-mount del proyecto en el host con el directorio por defecto dentro del container (`/var/www`).

Para el servicio de nginx, definiremos otro servicio con el nombre `webserver`. La versión `alpine` nos será suficiente para el proyecto. Deberemos exponer el puerto 80 (peticiones HTTP), y lo mapearemos con el puerto 8080 del host. También necesitaremos un bind-mount para disponer de los archivos de configuración: la carpeta `nginx/conf.d` que encontrarás en el ejercicio se debe mapear a `/etc/nginx/conf.d/`.

Solo queda iniciar el entorno:

```docker-compose up```

Y en el browser introducimos la url `localhost:8080`. Si todo ha funcionado correctamente, deberíamos ver la página de `Welcome to Symfony` con un 404.