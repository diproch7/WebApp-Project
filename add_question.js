var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");
var nameSchema = new mongoose.Schema({
	subject: String,
	question: String,
	optionA: String,
	optionB: String,
	optionC: String,
	optionD: String,
    answer: String
});
var User = mongoose.model("User", nameSchema);




app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/add_question", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Question successfully added to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});