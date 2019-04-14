const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const kafka = require("kafka-node");
const uuid = require("uuidv4");

app.get("/", (req, res) => {
	res.send("hello");
});

http.listen(3002, () => {
	console.log("listening on *:3002");
});

const ranN = num => Math.floor(Math.random() * num); //return random number from 0-num WATCH DA 0s!

//SOCKET STUFF

const SOCKET_LIST = {};

io.on("connection", socket => {
	//	console.log("connected");
	SOCKET_LIST[socket.id] = socket;
	//	console.log(SOCKET_LIST);
});

// END SOCKET STUFF

//KAFKA SETUP
const Consumer = kafka.Consumer; //kafka class
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

//END KAFKA SETUP

const consumer = new Consumer(client, [{ topic: "Position" }]);

consumer.on("message", message => {
	let parsed=parseMessage(message.value);
	//	console.log(message);
	for (let i in SOCKET_LIST) {
		let socket = SOCKET_LIST[i];
		//	console.log(socket)
		socket.emit("positionUpdate", parsed);
	}
});

const parseMessage = msg => {
	const parsed = {};
	console.log("sending msg")
	let data = msg.split(",");
	//console.log(data);
	data.forEach(item => {
		let splited=item.split(":")
		parsed[splited[0]]=parseInt(Math.abs(splited[1]));
	});
	return parsed;
};
