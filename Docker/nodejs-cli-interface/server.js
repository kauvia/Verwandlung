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

http.listen(port, () => {
	console.log(`Server running at ${port}`);
});

const testGet = (req, res) => {
	res.send({ message: "successful test Get" });
};
const testPost = (req, res) => {
	const recievedData = req.body;
	console.log(recievedData);
	res.send({ message: { text: "you sent this", data: recievedData } });
};

app.get("/", testGet);
app.post("/", testPost);

let chicken = "pie";
let restart = true;


const commands = str => {
    const ls = exec(str);
    ls.stdout.on("data", data => {
        console.log("stdout ", data);
    });
    
    ls.stderr.on("data", data => console.log("err ", data));
    
    ls.on("close", code => {
        console.log("child process ended with ", code);});
    


}


