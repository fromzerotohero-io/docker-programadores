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
    - mapeo de puertos (el puerto del container será 3000)
    - variable de entorno `APP_ENV` con valor `development`

Si ahora instanciamos un container con el servicio `api`, aparecerá un error ya que no hemos instalado las dependencias declaradas en el fichero `package.json`. Por lo tanto, empieza instalando las dependencias de NodeJS en nuestro host usando un container (pista: usa el servicio `api` con `docker-compose`). Recuerda que para instalar las dependencias debes ejecutar `npm install`. Una vez tengas la carpeta `node_modules` en tu host, continúa con el siguiente apartado.

## Antes de poder ejecutar NodeJS, debemos transpilar Typescript a Javascript
Typescript es un conjunto de reglas de sintaxi que permite escribir código en Javascript con type-checking. El código escrito en Typescript no se puede interpretar directamente por parte de NodeJS, pues debemos transpilarlo préviamente. En nuestro proyecto, disponemos de dos scripts de npm para hacerlo:
- `npm run tsc` compila una vez todos los ficheros `*.ts` que estén en la carpeta `/src`
- `npm run tsc-watch` se mantiene indefinidamente, y recompila el código cada vez que se modifica algún archivo en `/src`

Así pues, ejecuta el script `npm run tsc` usando un container. El resultado será una carpeta `/dist`, la cual contendrá los ficheros Javascript.