const express = require('express');
const app = express();

app.get('/products', (req, res) => {
  res.json([
    { id: 101, title: "Laptop" },
    { id: 102, title: "Mobile" }
  ]);
});

app.listen(3002, () => {
  console.log("Product Service running on PORT 3002");
});
