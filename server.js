const express = require('express');
const path = require('path');
const app = express();



app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
  });

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});