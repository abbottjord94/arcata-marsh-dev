const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.argv[2];

var testQuestions = [];

app.use(bodyParser.json());
app.use(express.static('site'));

app.get('/retrieveQuestions', function(req, res) {
	res.send(testQuestions);
});

app.post('/editQuestions', function(req, res) {
	var data = req.body;
	testQuestions.push(data);
	saveQuestions();
	res.sendStatus(200);
});

app.listen(port, function() {
	loadQuestions();
	console.log("Server running on port " + port);
});

function loadQuestions() {
	fs.readFile("questions.json", function(data) {
		testQuestions = JSON.parse(data);
	});
	console.log("File Loaded");
}

function saveQuestions() {
	fs.writeFile("questions.json", JSON.stringify(testQuestions), function(err) {
		console.log(err);
	});
}
