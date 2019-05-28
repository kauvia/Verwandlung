"use strict";

const express = require("express");
const http = require("http");

// Constants
const PORT = 8080;
const HOST = "localhost";

// App
const app = express();
app.get("/", (req, res) => {
	res.send("cyka blyat");
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

const postToProvider = () => {
	const payload = JSON.stringify({
		message: "in a bottle"
	});

	const options = {
		hostname: "nodejs-provider",
		port: 8081,
		path: "/",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": payload.length
		}
	};

	const req = http.request(options, res => {
		let data = "";
		res.on("data", chunk => {
			data += chunk;
		});
		res.on("end", () => {
			console.log(data);
		});
	});

	req.write(payload);
	req.end();
};

setInterval(postToProvider,800)




// http.get("http://localhost:8081", res => {
// 	let data = "";
// 	res.on("data", chunk => {
// 		data += chunk;
// 	});

// 	res.on("end", () => {
// 		console.log(data);
// 	});
// });
