const fs = require('fs');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
let notes = [];

app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// retreive current list of notes
fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    // console.log(JSON.parse(data));
    notes = JSON.parse(data);
    // console.log(notes);
});

// html routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// api routes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    //console.log(notes);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
      );
      res.json(notes);
});

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});