var express = require("express");

var app = express();
app.use(express.json());

app.post("/login", (req, res) => {
	const strUsername = req.query.username, strToken = req.query.token;

	res.json({"message": "Success. Logging you in.", "status": 202});
	// res.json({"message": "", "status": 0});
	// res.json({"message": "Something went wrong when logging in.", "status": 403});

	// TODO: connect to DB, whatever or however

	console.log("Got a login attempt from " + strUsername + ", communicating with DB...");
});

app.post("/register", (req, res) => {
	const strUsername = req.query.username, strToken = req.query.token, longTimestamp = req.query.timestamp;

	// Rudimentary rate limiting? Is this frontend's job?

	// Pull latest entry from the DB and compare that timestamp to this request's timestamp
	// If it's too soon, then reject - though this could also be frontend's job
	res.json({"message": "Success. Registered you.", "status": 202});
	console.log("Got a register attempt from " + strUsername);

	// res.json({"message": "Failed. Request too soon.", "status": 429});
});

app.get("*", (req, res) => {
	res.send("Nothing interesting happens.");
});

var server = app.listen(8000, function() {
	console.log("Backend is live.");
});
