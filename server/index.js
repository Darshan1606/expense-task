const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const router = require("./routes");
const { PORT } = require("./constants/env.constant");

const port = PORT || 5000;

// express app
const app = express();
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "15mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Use the cors middleware
app.use(cors({ origin: "*" }));
app.use(cookieParser());

// connect to db & listen for requests
require("./config/db");

// Routes
router.apiRoutes(app);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,accept,access_token,X-Requested-With"
  );
  next();
});

app.all("/", (req, res) => {
  return res
    .status(200)
    .send("PRoject is serving well, deploying latest code v1 💵");
});

app.all("*", async (req, res) => {
  return res.status(200).send({
    status: false,
    message: `URL not found.`,
  });
});

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url} - ${req.path}`);
  next();
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
