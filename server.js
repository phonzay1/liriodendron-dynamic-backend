const express = require('express');
const { connectMongoDB, createPGTable, pgQueries } = require('./config/db');
const MongoUser = require('./models/mongoUser');
const { removeSpecialChars } = require('./utils/utils');

const app = express();
app.use(express.json());
app.use(express.static('dist'))

// Connect to databases
connectMongoDB();
createPGTable();

// MongoDB Routes
app.post('/api/users', async (req, res) => {
  try {
    let { name, favoriteAnimal } = req.body;
    [name, favoriteAnimal] = [name, favoriteAnimal].map(removeSpecialChars);
    const newUser = new MongoUser({ name, favoriteAnimal });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send();
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await MongoUser.find();
    res.json(users);
  } catch (error) {
    res.status(500).send();
  }
});

// PostgreSQL Routes
app.post('/api/books', async (req, res) => {
  try {
    let { title, author } = req.body;
    [title, author] = [title, author].map(removeSpecialChars);
    const newBook = await pgQueries.addBook(title, author);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).send();
  }
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await pgQueries.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).send();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! :)`);
});