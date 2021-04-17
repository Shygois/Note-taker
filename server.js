const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
  });

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});