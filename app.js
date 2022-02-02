// Environment setup
require("dotenv").config();
require("express-async-errors");

// Express
const express = require("express");
const app = express();

// Import controller
const sendEmail = require("./controllers/sendEmail");

// error handler imports
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// To read req.body from requests
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(`<h1>Email Project</h1> <a href="/send">Send</a>`);
});

app.get("/send", sendEmail);

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Server Setup
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
