const readline = require("readline");

const { Tile ,Clock, BlueWall, Player} = require("./clock-classes");
//readline.emitKeypressEvents(process.stdin);
//process.stdin.setRawMode(true);

const ranN = num => Math.floor(Math.random() * num); //return random number from 0-num
const getTanFromDegree = degrees => Math.tan((degrees * Math.PI) / 180);

const displaySize = { x: 35, y: 35 };

let display = [];
let tileMap = [];

//Populate tileMap and display

for (let j = 0; j < displaySize.y; j++) {
    display[j] = [];
    tileMap[j] = [];
	for (let i = 0; i < displaySize.x; i++) {
		tileMap[j][i]=new Tile(i, j, displaySize)
	}
}


let length = 25;
let startTime = 1000;
let passedTime = startTime;

const clock = new Clock(15,startTime)
const blueWall = new BlueWall()

const player1 = new Player(23,23)

const resetTiles = () => {

	for (let i = 0; i<tileMap.length;i++){
        for (let j = 0;j<tileMap[i].length;j++){
			let tile = tileMap[i][j]
			tile.clock=false;

			if(passedTime<=0){
				tile.wall=false;
			}
        }
    }

}


const updateTiles = () => {

	for (let i = 0; i<tileMap.length;i++){
        for (let j = 0;j<tileMap[i].length;j++){
			let tile = tileMap[i][j]
            tile.updateTile(display)
        }
    }
};

// LOOPER //



setInterval(() => {

	let adjustedLength = Math.floor((passedTime)/startTime*length)
	adjustedLength < 0 ? adjustedLength = length : true;
	//Clear console
	process.stdout.write("\033c");

	//reset tiles
	resetTiles()

	//Update things
	clock.moveHand(tileMap)
	player1.drawPlayer(tileMap)
	updateTiles();

	blueWall.drawWall(tileMap,adjustedLength)
	//Render display
	for (let j = 0; j < displaySize.y; j++) {
		console.log(display[j].join(""));
	}
//	passedTime--;
	passedTime < 0 ? passedTime =startTime : passedTime--;
	//console.log(adjustedLength)
	console.log(passedTime,ranN(3))
}, 80);

// END LOOP //