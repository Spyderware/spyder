import {Cors, Auth} from 'middleware';

const express = require("express");
const app = express();
const PORT = process.env.PORT | 8080;

app.use(Cors.corsMiddleware);
app.use("/", (req, res) => {
  res.send(JSON.stringify({ message: "hello world 2" }));
});

app.use(Auth.verifyToken)

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running, and App is listening on port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
