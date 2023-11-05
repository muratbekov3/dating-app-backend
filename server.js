
import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'
import dotenv from 'dotenv'

console.log(process.env)
//App Config
const app = express()
dotenv.config()
const port = process.env.PORT || 8001
const connection_url = process.env.CONNECTION_URL
//Middleware
app.use(express.json())
app.use(Cors())
//DB Config
// mongoose.connect(connection_url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })

mongoose
  .connect(connection_url)
  .then(() => console.log(`Connected to MongoDB`))
  .catch((err) => {
    console.error(`${err}`);
  });
//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/dating/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard)
    .then(data => {
        res.status(201).send(data);
    })
    .catch(err => {
        res.status(500).send(err);
    });
})

app.get('/dating/cards', (req, res) => {
    Cards.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
})
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))