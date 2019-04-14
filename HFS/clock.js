const readline = require("readline");

const { Tile, Clock, BlueWall, Player } = require("./clock-classes");
//readline.emitKeypressEvents(process.stdin);
//process.stdin.setRawMode(true);

const ranN = num => Math.floor(Math.random() * num); //return random number from 0-num
const getTanFromDegree = degrees => Math.tan((degrees * Math.PI) / 180);

const displaySize = { x: 36, y: 36 };
const center = 16;

let display = [];
let tileMap = [];

//Populate tileMap and display

for (let j = 0; j < displaySize.y; j++) {
	display[j] = [];
	tileMap[j] = [];
	for (let i = 0; i < displaySize.x; i++) {
		tileMap[j][i] = new Tile(i, j, displaySize);
	}
}

let length = 25;
let startTime = 100;
let passedTime = startTime;

const clock = new Clock(15, startTime,center,displaySize);
const blueWall = new BlueWall(center,displaySize);

const player1 = new Player(23, 23,displaySize);

const resetTiles = () => {
	for (let i = 0; i < tileMap.length; i++) {
		for (let j = 0; j < tileMap[i].length; j++) {
			let tile = tileMap[i][j];
			tile.clock = false;

			if (passedTime <= 0) {
				tile.wall = false;
			}
		}
	}
};

const updateTiles = () => {
	for (let i = 0; i < tileMap.length; i++) {
		for (let j = 0; j < tileMap[i].length; j++) {
			let tile = tileMap[i][j];
			tile.updateTile(display);
		}
	}
};

// TEST MSG //

const addMsg = (displayArr,timeLeft) => {
	for (let j = 5; j < 10; j++) {
		for (let i = displaySize.x; i < 20 + displaySize.x; i++) {
			if (i < displaySize.x + 10) {
				displayArr[j][i] = "  ";
			} else if (i == displaySize.x + 12 && j == 5){
				displayArr[j][i]= `Time left: ${timeLeft}`
			}
		}
	}
};

// END TEST MSG //

// LOOPER //

setInterval(() => {
	let adjustedLength = Math.floor((passedTime / startTime) * length);
	adjustedLength < 0 ? (adjustedLength = length) : true;
	//Clear console
	process.stdout.write("\033c");

	//reset tiles
	resetTiles();

	//Update things
	clock.moveHand(tileMap);
	player1.drawPlayer(tileMap);
	updateTiles();

	addMsg(display,passedTime);

	blueWall.drawWall(tileMap, adjustedLength);
	//Render display
	for (let j = 0; j < displaySize.y; j++) {
		console.log(display[j].join(""));
	}
	//	passedTime--;
	passedTime < 0 ? (passedTime = startTime) : passedTime--;
}, 80);

// END LOOP //
