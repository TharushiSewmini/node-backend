const express = require("express");
const cors = require("cors");
const ConnectingDb = require("./config/db");
const userRouter = require("./routes/User");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", userRouter);
ConnectingDb();

app.listen(3001, () => {
  console.log("server running");
});
