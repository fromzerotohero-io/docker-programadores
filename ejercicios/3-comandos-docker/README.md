# Comandos de Docker
En este ejercicio, usaremos los principales comandos de Docker.

## Ejercicio a)
Instancia un container alpine el cual use como directorio por defecto `/home`. Se puede conseguir de dos formas: generando una imagen con la instrucción necesaria, o instanciar un container alpine con un parámetro determinado. Hazlo de ambas maneras.

## Ejercicio b)
Obtén el valor de la variable Number.MAX_SAFE_INTEGER en node v10. Hazlo instanciando un container (no googleando 🧐).

## Ejercicio c)
Instala las dependencias del archivo `composer.json` (comando `compose install`) en el directorio actual (es decir, en tu máquina) usando la versión `7.2.*` de `PHP`. Una vez instaladas, deberías tener una carpeta de nombre `vendor`, con unas cuantas subcarpetas.

Para este ejercicio, puedes crearte una imagen de php e instalar composer, o usar una imagen de `composer` que incluya la versión `7.2.*` de PHP.

## Ejercicio d)
Instancia un container de mysql con persistencia de datos, accesible desde el puerto 2345 de nuestro host. Además, deberás introducir una variable de entorno en el container: `MYSQL_ROOT_PASSWORD`, con el valor que quieras usar como contraseña.

## Ejercicio e)
Ejecuta el siguiente comando en el container instanciado en el ejercicio d):

```mysql -uroot -p```

La contraseña que te pedirá es el valor que le has pasado a la variable `MYSQL_ROOT_PASSWORD` en el container del ejercicio anterior.
