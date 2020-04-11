var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.Promise =global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:password1@ds153667.mlab.com:53667/heroku_615lm3bs", {
  useMongoClient: true
});

require("./routes/routes.js")(app, axios, cheerio, db, mongoose);

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});