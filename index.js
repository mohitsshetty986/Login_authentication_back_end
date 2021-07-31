const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");

require("./models/User");

app.use(bodyParser.json());

const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

const requireToken = require("./middleware/requireToken");

mongoose.connect(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("This is error", err);
});

app.get("/", requireToken, (req, res) => {
  res.send({ email: req.user.email });
});

app.listen(PORT, () => {
  console.log("Server running " + PORT);
});
