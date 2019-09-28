# Soluciones 2-Dockerfile
## Ejercicio a)
Instrucciones del Dockerfile:

```
FROM alpine

COPY ./archivo1.txt /var/www
COPY ./archivo2.txt /var/www
```

## Ejercicio b)
Instrucciones del Dockerfile:
```
FROM composer:latest

COPY ./composer.json .

RUN composer install
```

## Ejercicio c)
Instrucciones del Dockerfile:
```
FROM alpine

WORKDIR /var

ENTRYPOINT ["ls", "-la"]
```

## Ejercicio d)
Instrucciones del Dockerfile:
```
FROM alpine

VOLUME /home
```
