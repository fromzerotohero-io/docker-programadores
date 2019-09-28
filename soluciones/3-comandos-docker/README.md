# Soluciones 3-Comandos-Docker

## Ejercicio a)
Con comando:
```
docker run -it -w /home alpine sh
```

Con Dockerfile:
```
FROM alpine

WORKDIR /var
```

## Ejercicio b)
En este ejercicio, la manera más senzilla para averiguar el valor de la variable es levantar un container de NodeJS pasando una shell como comando principal. Por ejemplo
```
docker run --rm -it node:10-alpine sh
```
Una vez el container está levantado, ejecutamos `node`, el cual iniciará en modo REPL. Aquí ya simplemente deberíamos introducir `console.log(Number.MAX_SAFE_INTEGER)` y nos imprimiría el valor por consola.

El CLI de NodeJS tiene la opción de interpretar cómo código un texto que le pasemos como parámetro (se trata del flag `-e`). Usando este flag, podemos instanciar un container con el comando de NodeJS en lugar de `sh`, de manera que obtenemos el valor que nos pide el ejercicio directamente desde el comando de `docker run`.
```
docker run --rm node:10-alpine node -e "console.log(Number.MAX_SAFE_INTEGER)"
```
El valor que debería imprimirse por pantalla es `9007199254740991`.

## Ejercicio c)
Usaremos la imagen de `composer`, de manera que ya tenemos el gestor de dependencias de PHP en nuestro container. La imagen `composer` tiene definido como directorio por defecto `/app`, es decir, el comando del container se ejecutará desde este directorio. Deberemos hacer un bind mount entre nuestra host (la carpeta del ejercicio) y el directorio `/app` del container. El comando a ejecutar es el siguiente:
```
docker run --rm -t -v $(pwd):/app composer:1.6 composer install
```
La versión de la imagen es importante, ya que si usamos a partir de `composer:1.7`, la versión de PHP que usa la imagen no concuerda con la versión fijada en `composer.json` y la instalación falla.

## Ejercicio d)
Usaremos el siguiente comando:
```
docker run --rm -d -e MYSQL_ROOT_PASSWORD=pass -p 2345:3306 -v mysql_data:/var/lib/mysql mysql
```
El flag `-d` hace que el container se ejecute en modo `detached`, es decir, el proceso se ejecuta sin printar el output (`STDOUT`) en consola. El flag `-e` sirve para añadir variables de entorno. El flag `-p` hace mapeo del puerto 2345 del host al puerto 3306 del container. El flag `-v` crea un named volume, `mysql_data`, el cual apunta al directorio `/var/lib/mysql` del container.

## Ejercicio e)
Para ejeuctar un comando en un container que está en estado `running`, debemos usar el comando `docker exec`. Si queremos usar pseudo-tty (que el output de los comando tenga formato, que cuando nos pida contraseñas no imprima en la consola el string, etc), y queremos interactuar desde la shell de nuestro host con el proceso del container, debemos usar los flags `-t` y `-i`, respectivamente.
```
docker exec -it <id_container> mysql -uroot -ppass
```
`<id_container>` lo puedes encontrar con `docker ps`.

El container que se instancia debería ejecutarte el cli de `mysql`.