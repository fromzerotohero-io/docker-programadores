# Proyecto de NodeJS - Typescript - Express + MongoDB con Docker
En este proyecto crearemos una API con Typescript (se trata de una extensión de Javascript), transpilando posteriormente el código a Javascript para ejecutarlo en un entorno de NodeJS v10. Usaremos Express como framework para crear rutas y controladores a nuestra API. También crearemos un servicio de MongoDB, una base de datos no relacional muy popular. Let's go!

## Empecemos con el servicio de NodeJS
En la carpeta de este ejercicio encontrarás distintos ficheros, de los cuales, por ahora, nos interesa:

- `/src`, carpeta donde está el código de la API con Typescript
- `package.json`, el cual contiene los scripts de npm y las librerías necesarias para nuestro proyecto
- `tsconfig.json`, el cual contiene la configuración de Typescript para transpilar a Javascript

Empezaremos creando un archivo `docker-compose.yml`, con:
- versión 3.5
- servicio `api`:
    - imagen de NodeJS v10
    - working dir `/app`
    - usaremos como comando `npm start` (en el fichero `package.json` puedes ver que levanta la API de Nodejs)
    - bind-mount entre la carpeta de nuestro proyecto y la carpeta `/app` del container
    - mapeo de puertos: `8080` del host hacia `3000` del container
    - variable de entorno `APP_ENV` con valor `development`

Si ahora instanciamos un container con el servicio `api`, aparecerá un error ya que no hemos instalado las dependencias declaradas en el fichero `package.json`. Por lo tanto, empieza instalando las dependencias de NodeJS en nuestro host usando un container (pista: usa el servicio `api` con `docker-compose`). Recuerda que para instalar las dependencias debes ejecutar `npm install`. Al tener un bind-mount entre la carpeta de este ejercicio en el host y el container, el container usará las dependencias del `node_modules`.

Una vez tengas la carpeta `node_modules` en tu host, continúa con el siguiente apartado.

## Antes de poder ejecutar NodeJS, debemos transpilar Typescript a Javascript
Typescript es un conjunto de reglas de sintaxi que permite escribir código en Javascript con type-checking. El código escrito en Typescript no se puede interpretar directamente por parte de NodeJS, pues debemos transpilarlo préviamente. En nuestro proyecto, disponemos de dos scripts de npm para hacerlo:
- `npm run tsc` compila una vez todos los ficheros `*.ts` que estén en la carpeta `/src`
- `npm run tsc-watch` se mantiene indefinidamente, y recompila el código cada vez que se modifica algún archivo en `/src`

Así pues, ejecuta el script `npm run tsc` usando un container. El resultado será una carpeta `/dist`, la cual contendrá los ficheros Javascript.

## Ya podemos provar la API
Levanta el entorno (de momento formado por un solo servicio, `api`). Prueba realizar una petición HTTP a `localhost:8080`. Deberías obtener una respuesta `Hello World!`.

## Añadámos el servicio de MongoDB
MongoDB es una base de datos no relacional muy popular, que además suele usarse bastante con NodeJS ya que trabaja de forma nativa con objetos JSON.

Crea un servicio `mongodb` con los siguientes requerimientos:
- la imagen será `mongo`, versión `4.0`
- con un named-volume que apunte a la carpeta `/db/data` del container (recuerda que al ser named-volume deberás definirlo en el apartado volumes de `docker-compose.yml`)

En el fichero `/src/index.ts` deberás descomentar el código de la línea 2 y líneas 15-25, para usar la conexión a MongoDB y el controlador de Express. Además, deberás volver a transpilar el código (`npm run tsc`). Vuelve a levantar el entorno y realiza una petición a `localhost:8080/contador`.

## Deberíamos testear el código
Igual que en el proyecto de PHP, aquí tenemos una función que multiplica los dos parámetros de entrada. También disponemos de un test de Jest para esta función, escrito con Typescript y transpilado a la carpeta `/dist` cuando se ejecuta `npm run tsc`. Lo único que debes hacer para lanzar el test es ejecutar `npm run test`, obviamente desde un container.

Si estás ejecutando Docker en MacOS es posible que los test de Jest tarden más en ejecutarse que si lo estubieras haciendo directamente desde el host. Esto es debido a que Docker usa una pequeña máquina virtual con Linux, en la cual se instancian realmente los containers. Cuantos más ficheros haya que leer/escribir en un directorio que forme parte de un bind-mount, más carga tendrá esta máquina virtual, relentizando el proceso. Y Jest usa cerca de 30 librerías, es decir, tiene que leer muchos archivos.

Para mitigar el problema, puedes añadir un bind-mount del directorio `/node_modules`, con la opción `cached`, para que se puedan ahorrar algunas lecturas/escrituras entre host y container.

## Por último pongámos las principales tareas de desarrollo en un Makefile
Encontrarás una plantilla de un fichero Makefile en la carpeta del ejercicio. Añade las siguientes tareas:

- levantar el entorno
- parar el entorno
- conectarse a un shell del container de `api`
- transpilar ficheros `ts` a `js`
- transpilar ficheros `ts` a `js` con la opción watch (transpila cuando hay cambios en los ficheros)
- lanzar los tests
- lanzar los tests con la opción watch (relanza tests cuando hay cambios en los ficheros)
- hacer un update del schema de MySQL

Para ver las tareas de las que dispones, ejecuta

```make```

Para lanzar alguna de estas tareas, solo deberás ejecutar

```make <nombre_tarea>```

Automatización y simplicidad al poder!
