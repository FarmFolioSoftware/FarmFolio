var express = require("express");
var cors = require("cors");
var mariadb = require("mariadb");
var axios = require('axios');
require("dotenv").config();
var state_workaround = require("./states.js");

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

//post request that cleans input, hashes password, and queries database for authentication. Used when no uuid present.
//Also generates a uuid for user
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

				res.json({"message": "Success. Logging you in.", "uuidSessionToken": uuidSessionToken, "status": 200});

				const intUserId = rows[0].userID;
				con.query("INSERT INTO tblUserSession (userID, sessionToken, timeIn, active) VALUE (?, ?, NOW(), TRUE);", [intUserId, uuidSessionToken]);
			} else {
				res.json({"message": "Incorrect or missing email/password.", "status": 400});
				console.error("Failed login attempt for user " + strEmail);
			}

		});
		
		con.end();
	}).catch((err) => {
		console.log(err);
		res.json({"message": "I couldn't connect to the database!", "status": 500});
	});
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
app.post("/logout", (req, res) => {
	const uuidSessionToken = clean(req.body.uuidSessionToken);
	console.log("Session token " + uuidSessionToken + " wants to log out.");

	db_pool.getConnection().then(con => {
		con.query("DELETE FROM tblUserSession where sessionToken=?;", [uuidSessionToken]);
		con.end();
	});

	res.json({"message": "Goodbye!", "status": 200});
});

//post request to add our custom produce. 
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

//get request that lists all plots in the current user's farm
// app.get("/listPlots/:uuidSessionToken/:strFarmName", (req, res) => {
app.get("/listPlots", (req, res) => {	
	console.log(req.query);

	const uuidSessionToken = clean(req.query.uuidSessionToken);
	const strFarmName = clean(req.query.strFarmName);
	
	// var userID = getUserIDBySessionToken(req.params.uuidSessionToken);
	// console.log("value of userID in listPlots is "+ userID);
	// //Use session id to make sure the user is logged in before proceeding
	// if (userID == -1) {
	// 	res.json({"message": "You must be logged in to do that", "status": 400});
	// }

	console.log("Listing all plots for farm " + strFarmName + "...");

	db_pool.getConnection().then(con => {
		con.query("SELECT * FROM tblPlot WHERE farmID=(select farmID from tblFarm where farmName=?);", [strFarmName]).then((rows) => {
			if (rows.length == 0) {
				res.json({"message": "There are no plots to list", "status": 200});
			}
			else {
				// If there are plots, list them
				console.log(rows)
				res.json({"message": "Listing all plots", "plots": rows, "status": 200});
			}
		});
		
		con.end();
	}).catch((err) => {
		console.log(err);
		res.json({"message": "I couldn't connect to the database!", "status": 500});
	});
});
  
app.get("/getWeather", (req, res) => {
	var city = '';
	var state = '';

	const uuidSessionToken = req.query.uuidSessionToken;
	
	db_pool.getConnection().then(con => {
		con.query("SELECT userID from tblUserSession WHERE sessionToken=?;", [uuidSessionToken]).then((rows) => {
			if (rows.length == 0) {
				res.json({"message": "Something exploded", "status": 500});
			} else {
				console.log(rows);
				var targetUserID = rows[0].userID;
				console.log(targetUserID);
					
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
							"weather_description": desc,
							"weather_temp": temp,
							"city": city,
							"state": state,
							"status": 200
						});
					}).catch(error => {
						console.error("Error fetching weather data: ", error);
						res.json({"message": "Error fetching weather data.", "status": 500});
					});
				});
			}
		});
		con.end();
	});
});
// post request that adds a plot to the current user's farm
app.post("/addPlot", (req, res) => {
	console.log(req.body);

	const uuidSessionToken = clean(req.body.uuidSessionToken);
	const strFarmName = clean(req.body.strFarmName);
	const strPlotName = clean(req.body.strPlotName);
	const strLatitude = clean(req.body.strLatitude);
	const strLongitude = clean(req.body.strLongitude);

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
/*
app.get("/getWhatever", (req, res) => {
	const uuidSessionToken = req.query.uuidSessionToken;
	
	db_pool.getConnection().then(con => {
		con.query("SELECT userID from tblUserSession WHERE sessionToken=?;", [uuidSessionToken]).then((rows) => {
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
	console.log("Backend is live.");
});