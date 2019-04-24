const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const router = require("./router");

// DB Setup
const { mongoURI } = require("./config");
mongoose.connect(mongoURI, { useNewUrlParser: true });

// App setup
app.use(morgan("combined"));
app.use(bodyParser.json());
router(app);

// Server setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log("Listening on port ", port);
