const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { Schema } = mongoose;
const CategorySchema = new Schema({
  name: { type: String, required: true },
});
const BooksSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    ],
  },
  { timestamps: true }
);

const Books = mongoose.model("books", BooksSchema);
const Category = mongoose.model("categories", CategorySchema);

//BOOKS GET
app.get("/books", async (req, res) => {
  try {
    const books = await Books.find({});
    res.send(books);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//BOOKS POST
app.post("/books", async (req, res) => {
  try {
    const books = new Books(req.body);
    await books.save();
    res.status(200).json({ message: "books yarandi" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//BOOKS DELETE
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Books.findByIdAndDelete(id).exec();
    res.send(data);
  } catch (error) {
    res.status(500);
  }
});

//CATEGORIES GET
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//CATEGORIES POST
app.post("/categories", async (req, res) => {
  try {
    const categories = new Category(req.body);
    await categories.save();
    res.status(200).json({ message: "categories yarandi" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const PORT = process.env.PORT;
const url = process.env.CONNECTION_URL.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose.connect(url).catch((err) => console.log("Db not connect" + err));

app.listen(PORT, () => {
  console.log("Server Connection");
});
