const express = require("express");
const routes = require("./Routes/routes");
const app = express();
const cors = require("cors");


const json2xls = require("json2xls");
app.use(json2xls.middleware);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use("/", routes);
app.use((req, res, next) => {

 

  res.status(200).json({
    message: "App running successfully.",
  });
});

module.exports = app;
