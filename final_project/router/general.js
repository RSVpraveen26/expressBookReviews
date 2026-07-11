const axios = require("axios");
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();


// Register
public_users.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({
      message: "Unable to register user."
    });
  }

  if (!isValid(username)) {
    return res.status(404).json({
      message: "User already exists!"
    });
  }

  users.push({
    username: username,
    password: password
  });

  return res.status(200).json({
    message: "User successfully registered. Now you can login"
  });

});


// Get all books
public_users.get('/', function (req, res) {

  return res.status(200).json(books);

});


// Get by ISBN
public_users.get('/isbn/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn]);

});


// Get by Author
public_users.get('/author/:author', function (req, res) {

  const author = req.params.author;

  let filteredBooks = {};

  Object.keys(books).forEach((key) => {

    if (
      books[key].author.toLowerCase() === author.toLowerCase()
    ) {
      filteredBooks[key] = books[key];
    }

  });

  return res.status(200).json(filteredBooks);

});


// Get by Title
public_users.get('/title/:title', function (req, res) {

  const title = req.params.title;

  let filteredBooks = {};

  Object.keys(books).forEach((key) => {

    if (
      books[key].title.toLowerCase() === title.toLowerCase()
    ) {
      filteredBooks[key] = books[key];
    }

  });

  return res.status(200).json(filteredBooks);

});


// Get Reviews
public_users.get('/review/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn].reviews);

});
// Get all books using async/await
public_users.get("/async/books", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/");
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get book by ISBN using async/await
public_users.get("/async/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/isbn/${req.params.isbn}`
    );
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get books by author using async/await
public_users.get("/async/author/:author", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/author/${req.params.author}`
    );
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get books by title using async/await
public_users.get("/async/title/:title", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/title/${req.params.title}`
    );
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
module.exports.general = public_users;