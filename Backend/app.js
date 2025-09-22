const fs = require("fs");
const http = require("http");
const express = require("express");

const app = express();
const port = 8080;

const users = JSON.parse(
  fs.readFileSync("src/data/users.json", "utf-8", (err, data) => {
    if (err) throw err;
    return data;
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Let's begin something.",
  });
});

app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    users,
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

app.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  const updatedUser = { ...user, ...req.body };
  users[users.indexOf(user)] = updatedUser;

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  users.splice(users.indexOf(user), 1);

  res.status(204).json({
    status: "success",
    message: "User deleted successfully",
  });
});

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
