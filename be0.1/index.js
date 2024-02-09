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

var app = express();
app.use(express.json());
app.use(cors());

/*
app.use((req, res, next) => {
	console.log(req);
	next();
});
*/

function clean(str) {
	return str.replace(/[^0-9a-z\-@.]/gi, "");
}

function getUserIDBySessionToken(uuidSessionToken) {
	var targetID = 0;
	db_pool.getConnection().then(con => {
		con.query("SELECT userID from tblUserSession WHERE sessionToken=?;", [uuidSessionToken]).then((rows) => {
			console.log(rows);
			targetID = rows[0].userID;
		});
		
		con.end();
	});
	
	return targetID;
}

app.post("/login", (req, res) => {
	console.log(req.body);
	
	const strEmail = clean(req.body.strEmail);
	const strPassword = clean(req.body.strPassword);

	var strHashedPassword = crypto.createHash("sha256").update(strPassword).digest("hex");

	console.log("Got a login attempt from " + strEmail + ", communicating with DB...");

	db_pool.getConnection().then(con => {
		con.query("SELECT * FROM tblUser WHERE email=? AND hashedPass=?;", [strEmail, strHashedPassword]).then((rows) => {
			if (rows.length != 0) {
				console.info("Successful login for user " + strEmail);

				var uuidSessionToken = crypto.randomUUID();
				console.log("User " + strEmail + "'s session token is " + uuidSessionToken);

				res.json({"message": "Success. Logging you in.", "session_token": uuidSessionToken, "status": 202});

				const intUserId = rows[0].userID;
				con.query("INSERT INTO tblUserSession (userID, sessionToken, timeIn) VALUE (?, ?, NOW());", [intUserId, uuidSessionToken]);
			} else {
				res.json({"message": "Incorrect or missing email/password.", "status": 403});
				console.error("Failed login attempt for user " + strEmail);
			}
		}).catch((err) => {
			console.log(err);
			res.json({"message": "I couldn't complete the query!", "status": 500});
		});
		
		con.end();
	}).catch((err) => {
		console.log(err);
		res.json({"message": "I couldn't connect to the database!", "status": 500});
	});
});

app.post("/register", (req, res) => {
	console.log(req.body);
	
	const strEmail = clean(req.body.strEmail);
	const strPassword = clean(req.body.strPassword);
	const strFirstName = clean(req.body.strFirstName);
	const strLastName = clean(req.body.strLastName);
	
	const strFarmName = clean(req.body.strFarmName);
	const strStreetAddress = clean(req.body.strStreetAddress);
	const strCity = clean(req.body.strCity);
	const strState = clean(req.body.strState);
	const strZipCode = clean(req.body.strZipCode);

	var strHashedPassword = crypto.createHash("sha256").update(strPassword).digest("hex");

	console.log("Got a register attempt from " + strEmail);

	// Call out to the DB, look for a record with the same email
	db_pool.getConnection().then(con => {
		con.query("SELECT * FROM tblUser WHERE email=?;", [strEmail]).then((rows) => {
			if (rows.length != 0) {
				// If it exists, bail out
				res.json({"message": "That user already exists.", "status": 409});
			} else {
				// If it does not exist, insert it as a new record
				var targetUserID = 0;
				var targetTypeID = 0;
				
				con.query("INSERT INTO tblUser (firstname, lastname, email, hashedPass, creationDate, lastModifiedDate) OUTPUT Inserted.userID VALUE (?, ?, ?, ?, NOW(), NOW());", [strFirstName, strLastName, strEmail, strHashedPassword]).then((rows) => {
					console.log(rows);
					targetUserID = rows[0].userID;
				});
				
				con.query("INSERT INTO tblAddressType (description) OUTPUT Inserted.typeID VALUE (?);", [strFarmName]).then((rows) => {
					console.log(rows);
					targetTypeID = rows[0].typeID;
				});
				
				con.query("INSERT INTO tblAddress (userID, typeID, street, city, state, zipCode) VALUE (?, ?, ?, ?, ?, ?);", [targetUserID, targetTypeID, strStreetAddress, strCity, strState, strZipCode]);
				
				res.json({"message": "Success. Registered you.", "status": 202});
			}
		}).catch((err) => {
			console.log(err);
			res.json({"message": "I couldn't complete the query!", "status": 500});
		});
		
		con.end();
	}).catch((err) => {
		console.log(err);
		res.json({"message": "I couldn't connect to the database!", "status": 500});
	});

	// res.json({"message": "Failed. Request denied.", "status": 429});
});

app.post("/logout", (req, res) => {
	const uuidSessionToken = clean(req.body.uuidSessionToken);
	console.log("Session token " + uuidSessionToken + " wants to log out.");

	db_pool.getConnection().then(con => {
		con.query("DELETE FROM tblUserSession where sessionToken=?;", [uuidSessionToken]);
		con.end();
	});

	res.json({"message": "Goodbye!", "status": 200});
});

app.post("/addCustomProduce", (req, res) => {
	const uuidSessionToken = clean(req.body.uuidSessionToken);
	const strProduceName = clean(req.body.strProduceName);
	const floatCostPerSeed = req.body.floatCostPerSeed;
	const intAvgYieldPerSeed = req.body.intAvgYieldPerSeed;
	const strCustomColor = clean(req.body.strCustomColor);

	var floatCostPerUnit = (floatCostPerSeed / intAvgYieldPerSeed).toFixed(2);

	// Do a little something, just for proof of concept
	res.json({"costPerUnit": floatCostPerUnit});
});

app.post("/dataTest", (req, res) => {
	const uuidSessionToken = req.body.uuidSessionToken;

	const dummyData = {"data": [0, 1, 2, 3, 4]};

	res.json(dummyData);
});

app.get("*", (req, res) => {
	res.json({"message": "Backend Status: Running", "status": 418});
});

var server = app.listen(8000, function() {
	console.log("Backend is live.");
});
