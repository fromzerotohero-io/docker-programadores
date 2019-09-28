# Soluciones 4-network

## Ejercicio a)
Para crear una network, usamos el comando `docker network create`. Para nuestro ejercicio ejecutaremos:
```
docker network create --driver bridge network-ejercicio-4
```
Instanciaremos el container pasando distintos flags. Como el objetivo es conectar dos containers mediante una network tipo bridge, le asignaremos un nombre al container con el flag `--name`. De esta manera, sabremos como referirnos a este container desde otro (si no fijamos el nombre, deberíamos usar el que asigna Docker de forma aleatorio, usando `docker ps`).
```
docker run --rm -it -w /app -v $(pwd):/app -d --network network-ejercicio-4 --name node-api node:10-alpine node index.js
```
Con el container instanciado, ya podemos consultar su IP si inspeccionamos la network:
```
docker network inspect network-ejercicio-4
```

## Ejercicio b)
Usaremos una imagen `alpine` que tiene `curl` instalado: `tutum/curl:alpine`.
```
docker run --rm -it --network network-ejercicio-4 tutum/curl:alpine curl node-api:3000
```
Nos debería imprimir en consola `"Hello World"`.

## Ejercicio c)
Para hacer visible desde el host la API del ejericio a), deberemos instanciar el container añadiendo mapeo de puertos:
```
docker run --rm -it -w /app -v $(pwd):/app -d --network network-ejercicio-4 --name node-api -p 3001:3000 node:10-alpine node index.js
```
Haciendo una petición HTTP a `localhost:3001` deberías obtener como respuesta `"Hello World"`.