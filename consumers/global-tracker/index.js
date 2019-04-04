const express = require("express");
const app = express();
const http = require("http").Server(app);
const kafka = require("kafka-node");
const uuid = require("uuidv4");

app.get("/", (req, res) => {
	res.send("hello");
});

http.listen(3002, () => {
	console.log("listening on *:3002");
});

const ranN = num => Math.floor(Math.random() * num); //return random number from 0-num WATCH DA 0s!



//KAFKA SETUP
const Consumer = kafka.Consumer; //kafka class
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

//END KAFKA SETUP

const consumer = new Consumer(client,[{topic:'Position'}])

consumer.on("message",message => console.log(message.value))