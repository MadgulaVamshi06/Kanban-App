const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connection = require("./config/db");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route")
const noteRouter = require("./routes/note.route");
app.use("/users", userRouter);
app.use("/notes",noteRouter)
app.use("/admin",adminRouter)
app.get("/", (req, res) => {
  res.send("Welcome to Kanban Board");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
});
