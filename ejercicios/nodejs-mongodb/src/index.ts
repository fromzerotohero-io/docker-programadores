import express from "express";

const app: express.Application = express()
const port: number = 3000

app.get('/', function (_req, res) {
    res.send('Hello World!');
})
  
app.listen(port, () => console.log('API escuchando peticiones en el puerto 3000!'))