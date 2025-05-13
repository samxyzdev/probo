import express from "express";

const app = express();

app.use(express.json());

app.get("/Hello", (req, res) => {
  res.send({
    msg: "Hello",
  });
});
