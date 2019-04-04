const express = require("express");
const app = express();
const http = require("http").Server(app);
const kafka = require("kafka-node");
const uuid = require("uuidv4");

app.get("/", (req, res) => {
	res.send("hello");
});

http.listen(3001, () => {
	console.log("listening on *:3001");
});

const ranN = num => Math.floor(Math.random() * num); //return random number from 0-num WATCH DA 0s!

//KAFKA SETUP
const Producer = kafka.Producer; //kafka class
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new Producer(client); // instance of kafka class

//END KAFKA SETUP

//People class
class Person {
	constructor(x, y) {
		this.id = uuid();
		this.pos = { x: x, y: y };
	}
}

//end people class

const person1 = new Person(400, 400);
console.log(person1);


const runLoop = () => {


	setInterval(() => {

		person1.pos.x+=ranN(10)-5;
		person1.pos.y+=ranN(10)-5;
		
		const payload = [{ topic: "Position", messages: `id:${person1.id},posX:${person1.pos.x},posY:${person1.pos.y}` }];
	
		producer.send(payload, (err, data) => {
			console.log(err);
			console.log(data);
		});
	}, 2000);
}

runLoop()