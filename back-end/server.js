const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require("multer");
const upload = multer({
  dest: "/var/www/memeboard.michaelskonnard.com/images/",
  limits: {
    fileSize: 10000000,
  },
});

const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost:27017/memes", {
  useNewUrlParser: true,
});

// Create a scheme for items in the memes: a name and a path to an image.
const itemSchema = new mongoose.Schema({
  caption: String,
  date: String,
  path: String,
});

const personSchema = new mongoose.Schema({
  name: String,
  date: String,
  description: String,
});

// Create a model for items in the memes.
const Item = mongoose.model("Item", itemSchema);

const Person = mongoose.model("Person", personSchema);

// Get a list of all of the items in the memes.
app.get("/api/items", async (req, res) => {
  try {
    let items = await Item.find();

    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the memes.
app.get("/api/persons", async (req, res) => {
  try {
    let person = await Person.find();

    res.send(person);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a new item in the memes: takes a name and a path to an image.
app.post("/api/items", async (req, res) => {
  const item = new Item({
    caption: req.body.caption,
    date: req.body.date,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a new item in the memes: takes a name and a path to an image.
app.post("/api/persons", async (req, res) => {
  const person = new Person({
    name: req.body.name,
    date: req.body.date,
    description: req.body.description,
  });
  try {
    await person.save();
    res.send(person);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post("/api/photos", upload.single("photo"), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename,
  });
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/api/persons/:id", async (req, res) => {
  try {
    await Person.deleteOne({
      _id: req.params.id,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    item = await Item.findOne({ _id: req.params.id });
    item.caption = req.body.caption;
    item.date = req.body.date;
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/persons/:id", async (req, res) => {
  try {
    person = await Person.findOne({ _id: req.params.id });
    person.name = req.body.name;
    person.date = req.body.date;
    person.description = req.body.description;
    await person.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(4000, () => console.log("Server listening on port 4000!"));
