const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const passRouter = require("./routes/gatePassRoutes");
const mongoose = require("mongoose");
const https = require("https");

mongoose
  .connect("mongodb://localhost:27017/LKCTC_GATE_PASS")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(passRouter);

// Start server
const server = app.listen(3000, () => {
  console.log("port running on 3000");
});

// Handle self-signed certificates (if applicable)
const agent = new https.Agent({
  rejectUnauthorized: false // Not recommended for production
});

// Example fetch usage with self-signed certs (if needed)
// Replace 'yourUrl' with the actual URL you want to fetch
/*
const fetch = require("node-fetch");

fetch("https://yourUrl", { agent })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Fetch error:", error));
*/

