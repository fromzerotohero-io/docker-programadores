# Networks
En este ejercicio, crearemos una network de Docker y las usaremos para conectar containers.

## Ejercicio a)
Crea una network con el nombre `network-ejercicio-4`, de tipo `bridge`.

Una vez creada, instancia un container con los siguientes requerimientos:
- base image: `node:10-alpine`
- nombre `node-api`
- comando `node index.js`
- archivo `index.js` que encontrarás en la carpeta `ejercicios/4-networks`
- conectado a la network `network-ejercicio-4`

Puedes usar un Dockerfile, crear una imagen e instanciar un container con esta imagen; o directamente hacerlo todo al instanciar el container.

Inspecciona la network y encuentra la IP para el container `node-api`.

## Ejercicio b)
Instancia un container que haga `curl` a la API creada en el ejercicio anterior. Podéis usar un container que ya tenga `curl` o un container `alpine` al cual deberéis instalar `curl`.

El comando de `curl` debería ser `curl node-api:3000`.

## Ejercicio c)
Haz que el container con la API del ejercicio a) sea accesible desde el navegador (es decir, desde fuera de Docker).
