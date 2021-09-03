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

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
