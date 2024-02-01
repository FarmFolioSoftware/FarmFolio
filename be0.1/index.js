var express = require("express");
var cors = require("cors");
var mariadb = require("mariadb");

const { createHash } = require("crypto"); // this is my cryptominer i'm using to mine bitcoin on everyone's computers, ignore this :^)

const db_pool = mariadb.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	connectionLimit: 5,
	database: "farmfolio",
	//Change to the port you are using
	port: 3307
});

var hashProvider = createHash("sha256");

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

	const hashedPassword = hashProvider.update(strPassword).digest("hex");

	console.log(hashedPassword);

	console.log("Got a login attempt from " + strUsername + ", communicating with DB...");

	db_pool.getConnection().then(con => {
		con.query("SELECT * FROM users WHERE username='" + strUsername + "' AND password='" + strPassword + "';").then((rows) => {
			if (rows.length != 0) {
				res.json({"message": "Success. Logging you in.", "status": 202})
				console.info("Successful login for user " + strUsername);
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
	const strEmail = req.body.email;

	res.json({"message": "Success. Registered you.", "status": 202});
	console.log("Got a register attempt from " + strUsername);

	// Send this to the DB

	// res.json({"message": "Failed. Request denied.", "status": 429});
});

app.post("/addCustomProduce", (req, res) => {
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
