const express = require("express");
const app = express();
const viewHelpers = require("./config/view-helpers")(app);
const dotenv = require("dotenv").config();
const env = require("./config/environment");

const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");
const session = require("express-session");
const sassMiddleware = require("node-sass-middleware");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportSpotify = require("./config/passport-spotify-strategy");
const MongoStore = require("connect-mongo");
const route = require("./routes/index");

(async () => {
	var uri = await     
	 mongoose.connect("mongodb+srv://waqasarif:dravid@cluster0.hn1lhp7.mongodb.net/proj?retryWrites=true&w=majority", { useUnifiedTopology: true }
	 ,{ useNewUrlParser: true })
	 .then(() => console.log(`Database connectedd`))
	 .catch(err => console.log(`Database connection error: ${err.message}`));
	 
 })();
app.use(cors());
if (env.name == "development") {
	app.use(
		sassMiddleware({
			src: path.join(__dirname, env.asset_path, "scss"),
			dest: path.join(__dirname, env.asset_path, "css"),
			debug: false,
			outputStyle: "extended",
			prefix: "/css",
		})
	);
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/storage", express.static(__dirname + "/storage"));
app.use(logger(env.morgan.mode, env.morgan.options));
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false,
	cookie: {
		//Cookie Expiry Time - 100 Minutes
		maxAge: 1000 * 60 * 100,
	}
}));
		
		//MongoStore is used to store the Session Cookies in the MongoDB	

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);
app.use(customMiddleware.addMusic);
app.use(customMiddleware.createUploads);
app.use("/", route);


app.listen(process.env.PORT || 3000, function(req, res){
	console.log("server started on")
});


module.exports = app;
