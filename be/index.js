var express = require("express");
var cors = require("cors");
var mariadb = require("mariadb");
var axios = require('axios');
require("dotenv").config();
var state_workaround = require("./states.js");
var { exec } = require('child_process');

const crypto = require("crypto"); // this is my cryptominer i'm using to mine bitcoin on everyone's computers, ignore this :^)

/*
	Standardized return codes:
	200 - All good
	400 - Client messed up
	500 - Server messed up
*/

/*
	Table of Contents:
		function - clean string
		function - get user id by session token
		post request - handle user login
		post request - handle user registration
		post request - handle user logout
		post request - add custom produce
		post request - data test
		get request - list all plots in current farm
		post request - adds a plot to the current user's farm
		get request - test the backend status
*/

//Create database connection here
const db_pool = mariadb.createPool({
	host: "farmfolio-db.cp0eq8aqg0c7.us-east-1.rds.amazonaws.com",
	// host: "localhost",
	user: process.env["MARIADB_USER"],
	password: process.env["MARIADB_PASSWORD"],
	connectionLimit: 5,
	database: "farmfolio",
	//Change to the port you are using
	port: 4433
	// port: 3306
});

//create an instance of an express application
var app = express();
app.use(express.json());
app.use(cors());

/*
app.use((req, res, next) => {
	console.log(req);
	next();
});
*/

//delete unwanted characters
function clean(str) {
	return str.replace(/[^0-9a-zA-Z_\-@.\s]/gi, "");
}

//query the database for a userID given a corresponding session token, uuid pulled from localStorage on the users browser
//This function is used at the start of all requests to make sure a user is logged in.
async function getUserIDBySessionToken(uuidSessionToken) {
	const result = await db_pool.query("SELECT userID FROM tblUserSession WHERE sessionToken=?;", [uuidSessionToken]);
	
	if (result.length == 0) {
		console.log("Session token " + uuidSessionToken + " does not belong to any user.");
		return -1;
	}
	return result[0].userID;
}

//query the database using the user's session token. Return the ID of the farm that the user is currently using
async function getCurrentFarmID(uuidSessionToken) {
	//const dbConnection = await db_pool.getConnection();
	const result = await db_pool.query("SELECT farmID FROM tblUserSession WHERE sessionToken=?", [uuidSessionToken]);

	//await dbConnection.end();
	return result[0].farmID;
}

async function getCurrentFarmName(uuidSessionToken) {
	//const dbConnection = await db_pool.getConnection();
	const intFarmID = await getCurrentFarmID(uuidSessionToken);
	const result = await db_pool.query("SELECT farmName FROM tblFarm WHERE farmID=?", [intFarmID]);

	//await dbConnection.end();
	return result[0].farmName;
}

async function scram(dbConnection, res, message, status) {
	await dbConnection.end();
	return res.json({"message": message, "status": status});
}

//post request that cleans input, hashes password, and queries database for authentication. Used when no uuid present.
//Also generates a uuid for user
app.post("/login", async (req, res) => {
	console.log(req.body);
	
	const dbConnection = await db_pool.getConnection();
	const strEmail = clean(req.body.strEmail);
	const strPassword = clean(req.body.strPassword);

	var strHashedPassword = crypto.createHash("sha256").update(strPassword).digest("hex");

	console.log("Got a login attempt from " + strEmail + ", communicating with DB...");

	usersQuery = await dbConnection.query("SELECT * FROM tblUser WHERE email=? AND hashedPass=?;", [strEmail, strHashedPassword]);
		
	if (usersQuery.length != 0) {
		console.info("Successful login for user " + strEmail);

		var uuidSessionToken = crypto.randomUUID();
		console.log("User " + strEmail + "'s session token is " + uuidSessionToken);

		res.json({"message": "Success. Logging you in.", "uuidSessionToken": uuidSessionToken, "status": 200});

		const intUserId = usersQuery[0].userID;

		const farmQuery = await dbConnection.query("SELECT farmID FROM tblFarmUser WHERE userID=?", [intUserId]);
		const intUserFarmID = farmQuery[0].farmID;

		await dbConnection.query("INSERT INTO tblUserSession (userID, sessionToken, timeIn, active, farmID) VALUE (?, ?, NOW(), TRUE, ?);", [intUserId, uuidSessionToken, intUserFarmID]);
	} else {
		res.json({"message": "Incorrect or missing email/password.", "status": 400});
		console.error("Failed login attempt for user " + strEmail);
	}

	await dbConnection.end();
});

//post request that cleans input, hashes password, and checks for duplicate users in the database
app.post("/register", (req, res) => {
	console.log(req.body);
	
	//user input here
	const strEmail = clean(req.body.strEmail);
	const strPassword = clean(req.body.strPassword);
	const strFirstName = clean(req.body.strFirstName);
	const strLastName = clean(req.body.strLastName);
	
	const strRace = clean(req.body.strRace);
	const strSex = clean(req.body.strSex); // ;)
	const strBirthday = clean(req.body.strBirthday);
	
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
				res.json({"message": "That user already exists.", "status": 400});
			} else {
				// If it does not exist, insert it as a new record
				var targetUserID = -1;
				var targetAddressID = -1;
				
				con.query("INSERT INTO tblUser (firstname, lastname, email, hashedPass, creationDate, lastModifiedDate) VALUE (?, ?, ?, ?, NOW(), NOW()) RETURNING userID;", [strFirstName, strLastName, strEmail, strHashedPassword]).then((rows) => {
					targetUserID = rows[0].userID;
					
					con.query("INSERT INTO tblAddress (userID, street, city, state, zipCode) VALUE (?, ?, ?, ?, ?) RETURNING addressID;", [targetUserID, strStreetAddress, strCity, strState, strZipCode]).then((rows) => {
						targetAddressID = rows[0].addressID;
						
						// totally guessing the format string here
						con.query("INSERT INTO tblDemographics (userID, race, sex, DOB) VALUE (?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'));", [targetUserID, strRace, strSex, strBirthday]);
						
						if (targetUserID == -1 || targetAddressID == -1) {
							res.json({"message": "Something went wrong while fetching info from other tables.", "status": 500});
						} else {
							con.query("INSERT INTO tblFarm (farmName, addressID) VALUE (?, ?);", [strFarmName, targetAddressID]);
						
							res.json({"message": "Success. Registered you.", "status": 200});
						}
					});
				});	
			}
		});
		
		con.end();
	}).catch((err) => {
		console.log(err);
		res.json({"message": "I couldn't connect to the database!", "status": 500});
	});

	// res.json({"message": "Failed. Request denied.", "status": 429});
});

//delete the user's session token from the database
app.post("/logout", async (req, res) => {
	const uuidSessionToken = clean(req.body.uuidSessionToken);

	var userID = await getUserIDBySessionToken(uuidSessionToken);
	if (userID == -1)
		return res.json({"message": "You must be logged in to do that", "status": 400});

	console.log("Session token " + uuidSessionToken + " wants to log out.");

	db_pool.getConnection().then(con => {
		con.query("DELETE FROM tblUserSession where sessionToken=?;", [uuidSessionToken]);
		con.end();
	});

	res.json({"message": "Goodbye!", "status": 200});
});

//post request to add our custom produce. 
app.post("/addCustomProduce", async (req, res) => {
	const uuidSessionToken = clean(req.body.uuidSessionToken);
	const strProduceName = clean(req.body.strProduceName);
	const floatCostPerSeed = req.body.floatCostPerSeed;
	const intAvgYieldPerSeed = req.body.intAvgYieldPerSeed;
	const strCustomColor = clean(req.body.strCustomColor);

	var floatCostPerUnit = (floatCostPerSeed / intAvgYieldPerSeed).toFixed(2);

	var userID = await getUserIDBySessionToken(uuidSessionToken);
	if (userID == -1)
		return res.json({"message": "You must be logged in to do that", "status": 400});

	// Do a little something, just for proof of concept
	res.json({"costPerUnit": floatCostPerUnit});
});

app.post("/dataTest", (req, res) => {
	const uuidSessionToken = req.body.uuidSessionToken;

	const dummyData = {"data": [0, 1, 2, 3, 4]};

	res.json(dummyData);
});

//get request that lists all plots in the current user's farm
// app.get("/listPlots/:uuidSessionToken/:strFarmName", (req, res) => {
app.get("/listPlots", async (req, res) => {	
	console.log(req.query);

	const dbConnection = await db_pool.getConnection();
	const uuidSessionToken = clean(req.query.uuidSessionToken);
	
	var userID = await getUserIDBySessionToken(uuidSessionToken);
	if (userID == -1)
		return res.json({"message": "You must be logged in to do that", "status": 400});

	const intFarmID = await getCurrentFarmID(uuidSessionToken);
	const strFarmName = await getCurrentFarmName(uuidSessionToken);

	console.log("Listing all plots for farm " + strFarmName + "...");

	const plotQuery = await dbConnection.query("SELECT * FROM tblPlot WHERE farmID=?;", [intFarmID]);

	if (plotQuery.length == 0)
		return scram(dbConnection, res, "There are no plots to list.", 500);
	else {
		// If there are plots, list them
		console.log(plotQuery);
		res.json({"message": "Listing all plots", "plots": plotQuery, "status": 200});
	}
		
	await dbConnection.end();
});

// post request that adds a plot to the current user's farm
app.post("/addPlot", async (req, res) => {
	console.log(req.body);

	const uuidSessionToken = clean(req.body.uuidSessionToken);
	const strFarmName = clean(req.body.strFarmName);
	const strPlotName = clean(req.body.strPlotName);
	const strLatitude = clean(req.body.strLatitude);
	const strLongitude = clean(req.body.strLongitude);

	var userID = await getUserIDBySessionToken(uuidSessionToken);
	if (userID == -1)
		return res.json({"message": "You must be logged in to do that", "status": 400});

	console.log("Adding new plot " + strPlotName + " for farm " + strFarmName + "...");

	db_pool.getConnection().then(con => {
		con.query("select farmID from tblFarm where farmName=?;", [strFarmName]).then((rows) => {
			const intFarmID = rows[0].farmID
			con.query("SELECT * FROM tblPlot WHERE farmID=? AND plotName=?;", [intFarmID, strPlotName]).then((rows) => {
				if (rows.length != 0) {
					// If it exists, bail out
					res.json({"message": "A plot with that name already exists for farm " + strFarmName, "status": 400});
				} else {
					// If it does not exist, insert it as a new record
					con.query("INSERT INTO tblPlot (farmID, plotName, latitude, longitude) VALUE (?, ?, ?, ?) RETURNING plotID;", [intFarmID, strPlotName, strLatitude, strLongitude]).then((rows) => {
						var targetPlotID = rows[0].plotID;
						console.log("New plot with ID " + targetPlotID + " added to farm " + strFarmName);					
						res.json({"message": "Success. Added new plot", "status": 200});
					});	
				}
			});
		});
		con.end();
	});
});
  
app.get("/getWeather", async (req, res) => {
	const uuidSessionToken = clean(req.query.uuidSessionToken);
	const dbConnection = await db_pool.getConnection();
	
	var targetUserID = await getUserIDBySessionToken(uuidSessionToken);
	if (targetUserID == -1) {
		return scram(dbConnection, res, "You must be logged in to do that.", 400);
	}
	
	var addressQuery = await dbConnection.query("SELECT city, state from tblAddress WHERE userID=?;", [targetUserID]);
	
	if (addressQuery.length == 0) {
		return scram(dbConnection, res, "Error fetching address for weather.", 500);
		//return res.json({"message": "Error fetching address for weather.", "status": 500});
	}
	
	var city = addressQuery[0].city;
	var state = state_workaround.states[addressQuery[0].state];
	const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=68edbe344de722530cb45365cbc20322";
	
	axios.get(url).then(response => {
		var data = response.data;
		var temp = Math.round(9 / 5 * (data.main.temp - 273.15) + 32);
		var desc = data.weather[0].description;
		res.json({
			"message": "Success.",
			"status": 200,
			"weather_description": desc,
			"weather_temp": temp,
			"city": city,
			"state": state
		});
	}).catch(error => {
		console.error("Error fetching weather data: ", error);
		return scram(dbConnection, res, "Error fetching weather data from weather API.", 500);
		//res.json({"message": "Error fetching weather data from weather API.", "status": 500});
	});
	
	await dbConnection.end();
	/*
	db_pool.getConnection().then(con => {
		con.query("SELECT * FROM tblAddress WHERE userID=?;", [targetUserID]).then((rows) => {
			city = rows[0].city;
			state = state_workaround.states[rows[0].state];
				
			const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=68edbe344de722530cb45365cbc20322";
			
			axios.get(url).then(response => {
				var data = response.data;
				var temp = Math.round(9 / 5 * (data.main.temp - 273.15) + 32);
				var desc = data.weather[0].description;
				res.json({
					"message": "Success.",
					"status": 200,
					"weather_description": desc,
					"weather_temp": temp,
					"city": city,
					"state": state
				});
			}).catch(error => {
				console.error("Error fetching weather data: ", error);
				res.json({"message": "Error fetching weather data.", "status": 500});
			});
		});
		con.end();
	});
	*/
});

app.get("/getPlots", async (req, res) => {
	const uuidSessionToken = clean(req.query.uuidSessionToken);
	const dbConnection = await db_pool.getConnection();
	
	var targetUserID = await getUserIDBySessionToken(uuidSessionToken), targetAddressID, targetFarmID;
	if (targetUserID == -1) {
		return scram(dbConnection, res, "You must be logged in to do that.", 400);
	}
		
	const addressQuery = await dbConnection.query("SELECT addressID FROM tblAddress WHERE userID=?;", [targetUserID]);
	
	if (addressQuery.length == 0) {
		return scram(dbConnection, res, "Error fetching address for plots.", 500);
		//return res.json({"message": "Error fetching address for plots.", "status": 500});
	}
	targetAddressID = addressQuery[0].addressID;
	
	const farmQuery = await dbConnection.query("SELECT farmID from tblFarm WHERE addressID=?;", [targetAddressID]);
	
	if (farmQuery.length == 0) {
		return scram(dbConnection, res, "Error fetching farm for plots.", 500);
		//return res.json({"message": "Error fetching farm for plots.", "status": 500});
	}
	targetFarmID = farmQuery[0].farmID;
	
	const plotQuery = await dbConnection.query("SELECT * FROM tblPlot WHERE farmID=?;", [targetFarmID]);
	
	if (plotQuery.length == 0) {
		return scram(dbConnection, res, "No plots exist.", 500);
		//return res.json({"message": "No plots exist.", "status": 500});
	}
	
	await dbConnection.end();
	
	res.json({"message": "Success.", "status": 200, "plots": plotQuery});
});

/*
app.get("/getWhatever", (req, res) => {
	const uuidSessionToken = req.query.uuidSessionToken;
	
	var userID = getUserIDBySessionToken(uuidSessionToken);
	console.log("in getWhatever, userID has been set to " + userID);
	db_pool.getConnection().then(con => {
		con.query("SELECT userID from tblUserSession WHERE sessionToken=?;", [userID]).then((rows) => {
			var targetUserID = rows[0].userID;
			
			// now, and ONLY NOW, do your stuff. targetUserID has the userID of the current user
			// do your queries from inside this block and ONLY THIS BLOCK
		});
		
		// here be dragons
		con.end();
	}).catch((err) => {
		console.log(err);
		res.json({"message": "I couldn't connect to the database!", "status": 500});
	});
});
*/

app.get("*", (req, res) => {
	res.json({"message": "Backend Status: Running", "status": 200});
});

//start the express server on port 8000
var server = app.listen(8000, function() {
	var currentBranch = "missingno";
	
	exec('git branch --show-current', (err, stdout, stderr) => {
		if (err) {
			console.log("I couldn't figure out what branch I'm on!");
	    	}
	    	currentBranch = stdout.trim()
	    	console.log("Backend is live on branch " + currentBranch);
	});
});
