const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  res.send(comments);
});
app.post("/posts/:id/comments", (req, res) => {
  console.log(req.params.id);
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(commentsByPostId[req.params.id]);
});
app.get("/events", (req, res) => {
  console.log("Event Received");
  res.send();
});
app.listen(4001, () => {
  console.log("Listening on PORT 4001");
});
