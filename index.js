const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./utils/database");
const routes = require("./routes");

const app = express();
const PORT = 4000;

connectDB();

app.use(cors());
app.use(express.json({ limit: "10mb" }))
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: "100mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Content-Length, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

const router = express.Router();
app.use("/api", router);
routes(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
