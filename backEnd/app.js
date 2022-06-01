const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { request } = require("express");
mongoose.connect(
  "mongodb+srv://abdelouadoud:testtest@cluster1.aavqatl.mongodb.net/?retryWrites=true&w=majority",
  (err) => {
    if (!err) console.log("MongoDB connection succeeded.");
    else
      console.log(
        "Error in DB connection : " + JSON.stringify(err, undefined, 2)
      );
  }
);

module.exports = mongoose;

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const authorSchema = mongoose.Schema({
  name: String,
  age: Number,
  description: String,
  picture: String,
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
});

const bookSchema = mongoose.Schema({
  title: String,
  description: String,
  releaseDate: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
});

const author = mongoose.model("Author", authorSchema);
const book = mongoose.model("Book", bookSchema);

app.post("/books", (req, res) => {
  const { title, description, releaseDate, authorId } = req.body;
  const createdBook = new book({
    title,
    description,
    releaseDate,
    author: authorId,
  });
  createdBook.save();
  res.json(createdBook);
});

app.get("/books", async (req, res) => {
  const books = await book.find().populate("author");
  res.send(books);
});

app.delete("/books/:id", async (req, res) => {
  await book.findByIdAndRemove(req.params.id);
  res.send("Book removed succesfully");
});

app.patch("/books/:id", async (req, res) => {
  const updatedBook = await book.findOne({ _id: req.params.id });
  const { title, description, releaseDate, authorId } = req.body;
  updatedBook.title = title;
  updatedBook.description = description;
  updatedBook.releaseDate = releaseDate;
  updatedBook.author = authorId;
  updatedBook.save();
  res.json(updatedBook);
});

//AUTHOR
app.post("/authors", (req, res) => {
  const { name, age, description, picture, bookId } = req.body;
  const createdAuthor = new author({
    name,
    age,
    description,
    picture,
  });
  createdAuthor.save();
  res.json(createdAuthor);
});

app.delete("/authors/:id", async (req, res) => {
  await author.findByIdAndRemove(req.params.id);
  res.send("Author deleted succesfully");
});

app.get("/authors", async (req, res) => {
  const authors = await author.find();
  res.send(authors);
});

app.patch("/authors/:id", async (req, res) => {
  const updatedAuthor = await author.findOne({ _id: req.params.id });
  const { name, description, age } = req.body;
  updatedAuthor.name = name;
  updatedAuthor.age = age;
  updatedAuthor.description = description;
  updatedAuthor.save();
  res.json(updatedAuthor);
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});

// const totalAuthors = author.aggregate([{ $count: "Author" }]);
// app.get("/nbauthors", async (req, res) => {
//   res.send(totalAuthors);
// });
