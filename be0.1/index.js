var express = require("express");
var cors = require("cors");
var mariadb = require("mariadb");
require("dotenv").config();

const crypto = require("crypto"); // this is my cryptominer i'm using to mine bitcoin on everyone's computers, ignore this :^)

const db_pool = mariadb.createPool({
	host: "farmfolio-db.cp0eq8aqg0c7.us-east-1.rds.amazonaws.com",
	user: process.env["MARIADB_USER"],
	password: process.env["MARIADB_PASSWORD"],
	connectionLimit: 5,
	database: "farmfolio",
	//Change to the port you are using
	port: 3306
});

var hashProvider = crypto.createHash("sha256");

var app = express();
app.use(express.json());
app.use(cors());

/*
app.use((req, res, next) => {
	console.log(req);
	next();
});
*/


app.post("/login", (req, res) => {
	const strUsername = req.body.username;
	const strPassword = req.body.password;

	console.log(req.body);

	// res.json({"message": "", "status": 0});

	var strHashedPassword = hashProvider.update(strPassword).digest("hex");

	//console.log(strHashedPassword);

	console.log("Got a login attempt from " + strUsername + ", communicating with DB...");

	db_pool.getConnection().then(con => {
		con.query("SELECT * FROM users WHERE username='" + strUsername + "' AND password='" + strPassword + "';").then((rows) => {
			if (rows.length != 0) {
				res.json({"message": "Success. Logging you in.", "status": 202})
				console.info("Successful login for user " + strUsername);

				var uuidSessionToken = crypto.randomUUID();
				console.log("User " + strUsername + "'s session token is " + uuidSessionToken);
				// TODO: send this to the db, pending schema from DB guys
			} else {
				res.json({"message": "Incorrect or missing username/password.", "status": 403});
				console.error("Failed login attempt for user " + strUsername);
			}
		});
	});
});

app.post("/register", (req, res) => {
	const strUsername = req.body.username;
	const strPassword = req.body.password;
	//const strEmail = req.body.email;

	var strHashedPassword = hashProvider.update(strPassword).digest("hex");

	//console.log(strHashedPassword);

	console.log("Got a register attempt from " + strUsername);

	// Call out to the DB, look for a record with the same username
	db_pool.getConnection().then(con => {
		con.query("SELECT * FROM users where username='" + strUsername + "';").then((rows) => {
			if (rows.length != 0) {
				// If it exists, bail out
				res.json({"message": "That user already exists.", "status": 409});
				return;
			}
		});

		// If it does not exist, insert it as a new record
		con.query("INSERT INTO users (id, username, password) VALUES (4, '" + strUsername + "', '" + strHashedPassword + "');");
		res.json({"message": "Success. Registered you.", "status": 202});
	});

	// res.json({"message": "Failed. Request denied.", "status": 429});
});

app.post("/logout", (req, res) => {
	const uuidSessionToken = req.body.sessionToken;
	console.log("Session token " + uuidSessionToken + " wants to log out.");
	res.json({"message": "Goodbye!", "status": 200});
});

app.post("/addCustomProduce", (req, res) => {
	const uuidSessionToken = req.body.sessionToken;
	const strProduceName = req.body.produceName;
	const floatCostPerSeed = req.body.costPerSeed;
	const intAvgYieldPerSeed = req.body.avgYieldPerSeed;
	const strCustomColor = req.body.customColor;

	var floatCostPerUnit = (floatCostPerSeed / intAvgYieldPerSeed).toFixed(2);

	// Do a little something, just for proof of concept
	res.json({"costPerUnit": floatCostPerUnit});
});

app.get("*", (req, res) => {
	res.json({"message": "Nothing interesting happens.", "status": 418});
});

var server = app.listen(8000, function() {
	console.log("Backend is live.");
});
