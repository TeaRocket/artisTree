require("dotenv").config();

const express = require("express");

const session = require("express-session");
const passport = require("passport");
require("./configs/passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/artistree", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

//changed for deploy
app.use(express.static(path.join(__dirname, "client/build")));
//app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

const index = require("./routes/index");
const auth = require("./routes/auth");
const results = require("./routes/results");
const user = require("./routes/user");
const artwork = require("./routes/artwork");
const messages = require("./routes/messages");

app.use("/", index);
app.use("/api/auth", auth);
app.use("/api/results", results);
app.use("/api/user", user);
app.use("/api/artwork", artwork);
app.use("/api/messages", messages);
app.use("/api/upload", require("./routes/upload"));

//added for deploy
app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
