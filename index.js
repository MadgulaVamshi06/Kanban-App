const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connection = require("./config/db");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const cors = require('cors');

const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route")
const noteRouter = require("./routes/note.route");
app.use("/users", userRouter);
app.use("/notes",noteRouter)
app.use("/admin",adminRouter)

app.get("/", (req, res) => {
  res.send("Welcome to Kanban Board");
});

const corsOptions = {
  origin: " http://127.0.0.1:5173/",
  methods : ["POST" , "GET" , "DELETE" , "PATCH"] ,
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
});
