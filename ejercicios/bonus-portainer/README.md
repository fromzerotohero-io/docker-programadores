# Inferfície gráfica para Docker: Portainer.io

Portainer es una herramienta que nos ofrece una interfície web desde la cual podemos gestionar Docker en nuestro host o un cluster de máquinas con Swarm.

A su vez, no hace falta instalarlo, sinó que se puede instanciar como un container de Docker.

```docker volume create portainer_data```

```docker run -d -p 8000:8000 -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer```

Una vez iniciado el container, introduce la url `localhost:9000` en tu browser. Te pedirá que crees un usuario. Una vez creado, te pedirá que entorno quieres gestionar. _Importante_: si no indicas `Local` (sería gestionar Docker en tu máquina), para hacerlo a posteriori deberás hacerlo con su API o eliminando el volúmen y empezando de nuevo.