const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();
const port = 3000;

const DB_URL =
  "mongodb+srv://gd7l74l7n:selale2607@cluster0.oi40r3z.mongodb.net/";

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connetced Succesfully!!!!!!!!!");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

const productSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const ProductModel = mongoose.model("Products", productSchema);

// get All Data

app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.send(products).status(200);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

// Get All Data By ID

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    res.send(product).status(200);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

// =========PRODUCT DELETE

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProducts = await ProductModel.findByIdAndDelete(id);
    const products = await ProductModel.find({});
    res.status(200).send(deleteProducts);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

//======== POST

// app.post(
//   "/products",
//   async(req, (res) => {
//     const newPorduct = new Products(req.body);
//   })
// );
