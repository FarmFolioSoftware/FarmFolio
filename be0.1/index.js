var express = require("express");

var app = express();

app.get("/", (req, res) => {
	res.send("Nothing interesting happens.");
});

app.get("/test", (req, res) => {
	res.send("Your username is " + req.query.username + ", your password is " + req.query.password);
});

var server = app.listen(8000, function() {
	console.log("working");
});
