const express = require("express");
let users = require("./db.js");
const app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid");
const cors = require("cors");
const port = 8000;



app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  if (users.length > 0) {
    res.status(200).send(users);
  } else {
    res.send({ message: "data is empty!" }).status(204);
  }
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((item) => item.id === id);

  if (user !== undefined) {
    res.send(user).status(200);
    // console.log(user);
  } else {
    res.send({ message: "not found!" }).status(404);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// DELETE

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.find((item) => item.id === id);

  if (index === -1) {
    res.status(404).send({ message: "failed to delete, no such users!" });
  } else {
    const deleteUsers = users.splice(index, 1);
    res.status(200).send({
      message: "deleted succesfully!",
      data: deleteUsers,
    });
  }
});

// ====POST
app.post("/users", (req, res) => {
  const { name, username, email, phone, website } = req.body;

  const user = {
    id: uuid.v4(),
    name,
    username,
    email,
    phone,
    website,
  };

  users.push(user);
  res.status(201).send({
    message: "created....",
    data: user,
  });
});

//======== PUT

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, username, email, phone, website } = req.body;

  const indx = users.findIndex((item) => item.id === id);

  const user = {
    id,
    name,
    username,
    email,
    phone,
    website,
  };

  users[indx] = user;

  res.send({
    message: "succesfullyy...",
    data: user,
  });
});

// PATCH

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;

  const { name, username, email, phone, website } = req.body;
  //   const indx = users.findIndex((item) => item.id === id);
  const user = users.find((item) => item.id === id);

  if (name !== undefined) {
    user.name = name;
  }
  if (username !== undefined) {
    user.username = username;
  }
  if (email !== undefined) {
    user.email = email;
  }
  if (phone !== undefined) {
    user.phone = phone;
  }
  if (website !== undefined) {
    user.website = website;
  }

  res.status(200).send({
    message: "succesfuly...",
    data: user,
  });
});
