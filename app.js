const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan')

// init app
let app = express();

// middleware
require('./passport')
app.use(bodyParser.json());
app.use(logger(':method :url :status :res[content-length] - :response-time ms'))

// setup routes
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const groupRouter = require('./routes/groups')
const collectionRouter = require('./routes/collections')
const itemRouter = require('./routes/items');
const testRouter = require('./routes/test')

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/group', groupRouter)
app.use('/collection', collectionRouter)
app.use('/item', itemRouter)
app.use('/test', testRouter)

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('Internal Server Error')
});

app.listen(3000, (err) => {
  console.log(`Listening on port 3000...`);
});