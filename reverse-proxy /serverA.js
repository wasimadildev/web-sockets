const express = require('express');
const fetch = require('node-fetch'); // correct spelling
const app = express();

app.get('/', async (req, res) => {
  try {
    const r = await fetch("http://localhost:3001"); // await here
    const result = await r.text();                  // await here too

    console.log(result);
    res.send(result);

  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(3000, () => {
  console.log("Server run on port 3000");
});
