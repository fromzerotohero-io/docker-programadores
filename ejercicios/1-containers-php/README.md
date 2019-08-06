# Dos contenedores con versiones distintas de PHP

En este ejercicio, veremos cómo podemos levantar dos containers, ejecutando una versión distintas de PHP en cada uno de ellos: la 7.0 y la 7.3

Lo importante es ver algunas de las propiedades de los containers de Docker:
- Arranque rápido
- Comando relativamente senzillo

## Ejercicio
Para comprobar que tenemos dos versiones distintas de PHP, imprimiremos el valor de una variable global que existe en la versión 7.3, pero no en la 7.0.

Empezamos ejecutando el siguiente comando, usando un container con PHP 7.0:

`docker run --rm php:7.0-alpine -c php -r "print_r(JSON_THROW_ON_ERROR); echo \"\n\";"`

Una vez se haya ejecutado el comando anterior, repetimos la prueba pero con un container con PHP 7.3:

`docker run --rm php:7.3-alpine -c php -r "print_r(JSON_THROW_ON_ERROR); echo \"\n\";"`

**Nota**: si volvemos a ejecutar cualquiera de los dos comandos, al ya tener sus respectivas imágenes descargadas, la ejecución será mucho más rápida.
