const express = require("express");
const cors = require("cors");
const client = require("./config/databaseConfig");
const todoRouter = require("./routes/todo");

const app = express();

// connect to database
client.connect((error) => {
  error
    ? console.log("could not connect to postgres", error)
    : console.log("SucessFully connected to elephantSql");
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/todos", todoRouter);

const PORT = process.env.PORT || 8080;
const hostname = "127.0.0.1";

app.get("/", (_req, res) => {
  res.send("<h2>server running...</h2>");
});

app.listen(PORT, hostname, () =>
  console.log(`listening on http://${hostname}:${PORT}`)
);
