all: help
##
## ███████╗██████╗  ██████╗ ███╗   ███╗███████╗███████╗██████╗  ██████╗ ████████╗ ██████╗ ██╗  ██╗███████╗██████╗  ██████╗ 
## ██╔════╝██╔══██╗██╔═══██╗████╗ ████║╚══███╔╝██╔════╝██╔══██╗██╔═══██╗╚══██╔══╝██╔═══██╗██║  ██║██╔════╝██╔══██╗██╔═══██╗
## █████╗  ██████╔╝██║   ██║██╔████╔██║  ███╔╝ █████╗  ██████╔╝██║   ██║   ██║   ██║   ██║███████║█████╗  ██████╔╝██║   ██║
## ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║ ███╔╝  ██╔══╝  ██╔══██╗██║   ██║   ██║   ██║   ██║██╔══██║██╔══╝  ██╔══██╗██║   ██║
## ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗███████╗██║  ██║╚██████╔╝   ██║   ╚██████╔╝██║  ██║███████╗██║  ██║╚██████╔╝
## ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ 
##                                                                                                                        
##
## Available commands:
##

SHELL:=/bin/bash

help: Makefile
	@sed -n 's/^##//p' $<

## up:      	Levantar entorno
up:
	@docker-compose up -d

## down:      	Destruir entorno
down:
	@docker-compose down

## shell:      	Instanciar un container del servicio app con el comando sh
shell:
	@docker-compose run --rm app sh

## tests:      	Ejecutar unit tests
tests:
	@docker-compose run --rm app php bin/phpunit

## db_schema:	Actualizar schema de MySQL
db_schema:
	@docker-compose exec -T db mysql -uroot -ppassword symfony < db_structure.sql
