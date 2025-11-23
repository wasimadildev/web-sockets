const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: "Waseem" },
    { id: 2, name: "Qasim" }
  ]);
});

app.listen(3001, () => {
  console.log("User Service running on PORT 3001");
});
