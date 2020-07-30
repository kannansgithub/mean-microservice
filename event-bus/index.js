const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const URLs = [
  "http://localhost:4000/events",
  "http://localhost:4001/events",
  "http://localhost:4002/events",
];

app.post("/events", (req, res) => {
  const event = req.body;
  URLs.map((url) => {
    return axios.post(url, event);
  });
  res.send({ status: "OK" });
});
app.listen(4005, () => {
  console.log("Listening on PORT 4005");
});
