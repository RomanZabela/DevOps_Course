const express = require('express');

const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const NOTES_FILE = path.join(__dirname, 'notes.json');

app.get('/api/notes', (req, res) => {
    console.log(`File directory: ${NOTES_FILE}`);
    const notes = JSON.parse(fs.readFileSync(NOTES_FILE, 'utf-8'));
    console.log(`[${new Date().toLocaleString()}]: File opened succsessfully`);
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(NOTES_FILE, 'utf-8'));
    const newNote = { id: Date.now(), text: req.body.text };
    notes.push(newNote);
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
    console.log(`[${new Date().toLocaleString()}]: Note added successfully to the file`);
    res.status(201).json(newNote);
});

app.listen(PORT, () => console.log(`[${new Date().toLocaleString()}]: Server started on port ${PORT}`));