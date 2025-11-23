const express = require('express');

const app = express();


app.listen(3001)


app.get('/', (req, res) => {
  res.send('Hello from Server B!');
});