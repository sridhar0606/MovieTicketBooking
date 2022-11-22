const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000;
const Movie = require('./routers/movie_router')
const User = require('./routers/user_router')
const db = require('./db')

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())


app.use('/api', Movie)
app.use('/api', User)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});