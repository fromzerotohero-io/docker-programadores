# Entornos con docker-compose
En este ejercicio veremos como definir más de un servicio y docker-compose se encarga de gestionar los containers.

## Ejercicio a)
Crea un archivo `docker-compose.yml` que cree un entorno como el creado en el ejercicio 4 (cada container debería ser un servicio distinto)

Para arrancar el entorno, ejecuta `docker-compose up -d`.

## Ejercicio b)
Prueba de parar todo el entorno generado en el apartado anterior.

Ahora prueba de levantar solo el servicio que hace de API.

## Ejercicio c)
Levanta el entorno con el `docker-compose.yml` del primer apartado, pero esta vez escala el servicio del curl a 5 containers.

## Ejercicio d)
Levanta una nueva instancia del servicio que hace las peticiones `curl`.

## Ejercicio e)
Añade al `docker-compose.yml` un servicio para mysql, con la misma configuración que en el ejercicio 3.d:
- persistencia de datos
- accesible desde el puerto 2345 de nuestro host
- variable de entorno en el container: `MYSQL_ROOT_PASSWORD` (valor que tú quieras)

Una vez tengas el servicio levantado, conéctate a mysql desde el propio container (usando `docker-compose`).
