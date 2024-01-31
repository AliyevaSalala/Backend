const express = require("express");

let products = require("./db.js");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/products", (req, res) => {
//   res.send(products);
// });

// get All Data

app.get("/products", (req, res) => {
  if (products.length > 0) {
    res.status(200).send(products);
  } else {
    res.send({ message: "data is empty!(" }).status(204);
  }
});

// Get All Data By ID

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const product = products.find((item) => item.id === id);
  if (product !== undefined) {
    res.send(product).status(200);
  } else {
    res.send({ message: "not found!" }).status(404);
  }
});

// DELETE Product BY ID

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).send({ message: "failed to delete, no such product!" });
  } else {
    const deleteProduct = products.splice(index, 1);
    res.status(200).send({ message: "succesfullyy", data: deleteProduct });
  }
});

// =====PRODUCT POST

app.post("/products", (req, res) => {
  const { title, desc, image } = req.body;

  const product = {
    id: uuid.v4(),
    title,
    desc,
    image,
  };

  products.push(product);

  res.status(201).send({
    message: "sucesccfuly",
    data: product,
  });
});

// PRODUCTPATCH

app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc, image } = req.body;
  const product = products.find((item) => item.id === id);

  if (title !== undefined) {
    product.title = title;
  }
  if (desc !== undefined) {
    product.desc = desc;
  }
  if (image !== undefined) {
    product.image = image;
  }

  res.status(200).send({ message: "succesfulyy..", data: product });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
