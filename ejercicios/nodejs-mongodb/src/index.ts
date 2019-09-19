import express from "express";
// import Mongo from "./Mongo"

const app: express.Application = express()
const port: number = 3000

app.get('/', function (_req, res) {
    res.send('Hello World!');
})

/*
 * Descoméntame cuando llegue el momento, joven Padawan
 */
// const mongo = new Mongo()

// app.get('/countador', async function (_req, res) {
//     try {
//         await mongo.insert({timestamp: Date()})
//         let count = await mongo.count()
//         res.send(`Has visto esta página ${count} veces!`)
//     } catch (error) {
//         res.send(error)
//     }
// })
  
app.listen(port, () => console.log('API escuchando peticiones en el puerto 3000!'))
