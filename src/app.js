const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
require("./db/conn");
const Register = require("./models/register");
const public_static_path = path.join(__dirname, "../public");

app.set("view engine", "hbs");

app.use(express.static(public_static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("", (req, res) => {
  res.render("index");
});
app.get("/worldMap", (req, res) => {
  res.render("worldMap");
});

app.post("", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const feedback = req.body.feedback;
    const newfeedback = new Register({
      name: name,
      email: email,
      feedback: feedback,
    });
    console.log(newfeedback);
    const registered = await newfeedback.save();
    res.status(201);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("*", (req, res) => {
  res.send("OOPS! 404 error page");
});

app.listen(port, () => {
  console.log(`Listening to port no ${port}`);
});
