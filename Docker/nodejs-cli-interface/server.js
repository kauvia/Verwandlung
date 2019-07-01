"use strict";

const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const cors = require("cors");

const { spawn, exec } = require("child_process");

const port = 8082;

//allow cors
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

http.listen(port,'0.0.0.0' ,() => {
	console.log(`Server running at ${port}`);
});

//********************************** HELPERS **********************************//


const commands = str => {
	const ls = exec(str);
	ls.stdout.on("data", data => {
		console.log("stdout ", data);
	});

	ls.stderr.on("data", data => console.log("err ", data));

	ls.on("close", code => {
		console.log("child process ended with ", code);
	});
};

//********************************** MODELS **********************************//


const testGet = (req, res) => {
    commands("echo 'console.log(chicken)' >> server.js");
	res.send({ message: "successful test Get" });
};
const testPost = (req, res) => {
	const recievedData = req.body;
	console.log(recievedData);
	res.send({ message: { text: "you sent this", data: recievedData } });
};

const restartServer = (req, res) => {
	commands("sleep 2 && node server.js");

	res.send({ message: "restarted server" });

	setTimeout(() => process.exit(), 500);
};

//********************************** ROUTES **********************************//

app.get("/outside",(req,res)=>{console.log("from outside", res.send({info:"sent"}))})
app.get("/", testGet);
app.post("/", testPost);

app.get("/restart", restartServer);
