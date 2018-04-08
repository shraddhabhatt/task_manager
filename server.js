// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var expressHandlebars = require("express-handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// Requiring our models for syncing
var db = require("./models");
// Sets up the Express app to handle data parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// Static directory
app.use(express.static("public"));
// Handlebars
_dirname = path.resolve();
app.use(express.static(_dirname + '/public'));
app.set('views', path.join(_dirname, './views'));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
// =============================================================
require("./routes/user-api-routes.js")(app);
require("./routes/task-api-routes.js")(app);
require("./routes/note-api-routes.js")(app);
require("./routes/html-routes.js")(app);
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
