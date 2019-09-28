# Solución 5-docker-compose

## Ejercicio a)
El contenido del `docker-compose.yml` debería ser:
```
version: "3.5"

services:
  node-api:
    image: node:10-alpine
    ports:
      - "3001:3000"
    volumes:
      - ./:/app
    working_dir: /app
    command: ["node", "index.js"]

  curl-app:
    image: tutum/curl:alpine
    command: ["curl", "-s", "node-api:3000"]
    depends_on:
      - node-api
```

## Ejercicio b)
Para parar el entorno y eliminar containers y la network por defecto, usa el comando `docker-compose down`.

Pra instanciar únicamente el servicio `node-api`, ejecuta el comando:
```
docker-compose up node-api
```

## Ejercicio c)
Para escalar un servicio, usaremos el comando `docker-compose up`, añadiendo el flag `--scale`:
```
docker-compose up --scale curl-app=5
```

## Ejercicio d)
```
docker-compose up curl-app
```

## Ejercicio e)
Deberemos añadir otro servicio al `docker-compose.yml`, y definir el volumen en el apartado `volumes`:
```
version: "3.5"

services:
  node-api:
    ...

  curl-app:
    ...

  db:
    image: mysql
    ports:
      - "2345:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=pass
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

Para conectarnos a MySQL, usaremos la misma estrategia que en el ejercicio e) de `3-comandos-docker`: ejecutaremos el comando de MySQL cli en el propio container donde la base de datos se está ejecutando. Esto quiere decir que deberíamos usar `docker exec -it <id_container> mysql -uroot -ppass`. Como el container ha sido instanciado usando `docker-compose`, podemos usar el comando `docker-compose exec`, muy parecido al de `docker exec`:
```
docker-compose exec db mysql -uroot -ppass
```
Usamos el nombre del servicio donde antes usábamos el nombre del container. Además, con `docker exec` necesitábamos los flags `-ti`, pero `docker-compose` ya los usa internamente por defecto.