const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
const PORT = 3000;

// Enables us to use patch and delete in our forms
app.use(methodOverride("_method"));
// Enables us to being able to read the req.body data
app.use(express.urlencoded({ extended: true }));
// Enables the public folder
app.use(express.static(path.join(__dirname, "public")));
// Basic config to use ejs
app.set("view-engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let comments = [
  { id: uuid(), username: "Arnold", comment: "I'm back" },
  { id: uuid(), username: "Sylvester", comment: "I can't feel my legs" },
];

app.get("/comments", (req, res) => {
  res.render("comments.ejs", { comments });
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ id: uuid(), username, comment });
  res.redirect("/comments");
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new.ejs");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show.ejs", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit.ejs", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const oldComment = comments.find((c) => c.id === id);
  oldComment.comment = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
