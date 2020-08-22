const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
const events = [];
app.post("/events", async (req, res) => {
  const event = req.body;
  console.log(`Event Received- ${event}`);
  events.push(event);
  await axios.post("http://posts-clusterip-srv:4000/events", event);
  console.log(`Event Sent posts-clusterip-srv`);
  await axios.post("http://comments-srv:4001/events", event);
  console.log(`Event Sent- comments-srv`);
  await axios.post("http://query-srv:4002/events", event);
  console.log(`Event Sent- query-srv`);
  await axios.post("http://moderation-srv:4003/events", event);
  console.log(`Event Sent- moderation-srv`);
  res.send({ status: "OK" });
});
app.get("/events", (req, res) => {
  res.send(events);
});
app.listen(4005, () => {
  console.log("Listening on PORT 4005");
});
