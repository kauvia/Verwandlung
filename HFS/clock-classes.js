const ranN = num => Math.floor(Math.random() * num); //return random number from 0-num
const getTanFromDegree = degrees => Math.tan((degrees * Math.PI) / 180);

class Tile {
	constructor(x, y, displaySize) {
		this.pos = { x: x, y: y };

		this.current = "";

		this.player = false;
		this.wall = false;
		this.clock = false;
		this.backgroundTiles = ["..", "''", "``", ",,", "  "];

		if (this.pos.x == 0 && this.pos.y == displaySize.y - 1) {
			this.background = "\u255a";
		} else if (this.pos.x == 0 && this.pos.y == 0) {
			this.background = "\u2554";
		} else if (this.pos.x == displaySize.x - 1 && this.pos.y == 0) {
			this.background = "\u2557";
		} else if (
			this.pos.x == displaySize.x - 1 &&
			this.pos.y == displaySize.x - 1
		) {
			this.background = "\u255d";
		} else if (
			(this.pos.x > 0 || this.pos.x < displaySize.x - 1) &&
			(this.pos.y == 0 || this.pos.y == displaySize.y - 1)
		) {
			this.background = "\u2550\u2550";
		} else if (
			(this.pos.x == 0 || this.pos.x == displaySize.x - 1) &&
			(this.pos.y > 0 || this.pos.y < displaySize.y - 1)
		) {
			this.background = "\u2551";
		} else {
			this.background = this.chooseTiles(this.backgroundTiles);
		}
	}
	chooseTiles(arr) {
		return `\x1b[2m${arr[ranN(arr.length)]}\x1b[0m`;
	}

	updateTile(display) {
		if (this.player) {
			this.current = this.player;
		} else if (this.clock) {
			this.current = "\ud83d\udcb8";
		} else if (this.wall) {
			this.current = "\x1b[34m00\x1b[0m";
			//		this.current = "\ud83c\udf00"; //cyclone
			//		this.current = 	"\ud83c\udf0a"; //tsunami
			//		this.current = 	"\ud83d\udd35"; //blue circle
		} else {
			this.current = this.background;
		}
		//    console.log(this.pos.x)
		display[this.pos.y][this.pos.x] = this.current;
	}
}

class Clock {
	constructor(handLength, startTime) {
		this.handLength = handLength;
		this.startTime = startTime;
		this.deltaDegree = 360 / startTime;
		this.degree = 180;

		this.pad = { x: 2, y: 2 };
		this.center = 15;
	}
	moveHand(tilesArr) {
		this.degree < 360
			? (this.degree += this.deltaDegree)
			: (this.degree = this.deltaDegree);
		for (let length = 0; length <= this.handLength; length++) {
			this.moveHandPoints(length, tilesArr);
		}
	}
	moveHandPoints(length, tilesArr) {
		const tanAB = getTanFromDegree(this.degree);
		const cSquare = length * length;
		const tanABSquare = tanAB * tanAB;

		let b = Math.sqrt(cSquare / (tanABSquare + 1));
		let a = b * tanAB;

		a = Math.floor(a + this.center + this.pad.x);
		b = Math.floor(b + this.center + this.pad.y);

		if (this.degree > 90 && this.degree <= 270) {
			a = (this.center + this.pad.x) * 2 - a;
			b = (this.center + this.pad.y) * 2 - b;
		}

		tilesArr[b][a].clock = true;
	}
}

class BlueWall {
	constructor() {
		this.pad = { x: 2, y: 2 };
		this.center = 15;
	}

	drawWall(tilesArr, length) {
		//loop 360 degrees
		for (let i = 0; i < 360; i++) {
			const tanAB = getTanFromDegree(i);
			const cSquare = length * length;
			const tanABSquare = tanAB * tanAB;

			let b = Math.sqrt(cSquare / (tanABSquare + 1));
			let a = b * tanAB;

			a = Math.floor(a + this.center + this.pad.x);
			b = Math.floor(b + this.center + this.pad.y);

			if (i > 90 && i <= 270) {
				a = (this.center + this.pad.x) * 2 - a - 1;
				b = (this.center + this.pad.y) * 2 - b - 1;
			}
			if (a < 34 && a >= 1 && b < 34 && b >= 1) {
				tilesArr[b][a].wall = true;
			}
		}
	}
}

class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.currentImg = "";
		this.imgs = {
			max: "\ud83d\ude01", // 100
			high: "\ud83d\ude00", // 75 - 99
			mid: "\ud83d\ude0f", //50 - 74
			low: "\ud83d\ude10", //25 - 49
			vlow: "\ud83d\ude25", // 1 - 24
			dead: "\ud83d\ude35" //0
		};

		this.health = 100;
	}
	updateImg() {
		this.health == 100
			? (this.currentImg = this.imgs.max)
			: this.health > 74
			? (this.currentImg = this.imgs.high)
			: this.health > 49
			? (this.currentImg = this.imgs.mid)
			: this.health > 24
			? (this.currentImg = this.imgs.low)
			: this.health > 0
			? (this.currentImg = this.imgs.vlow)
			: (this.currentImg = this.imgs.dead);
	}
	drawPlayer(tilesArr) {
		Math.random() > 0.7 ? this.health++ : this.health--;
		if (this.health < -20) {
			this.health = 100;
		}
		this.updateImg();
		this.movePlayer(tilesArr);
		tilesArr[this.y][this.x].player = this.currentImg;
	}
	movePlayer(tilesArr) {
		tilesArr[this.y][this.x].player = false;

		this.y += ranN(3) - 1;
		this.x += ranN(3) - 1;

		if (this.y == 0) {
			this.y = 1;
		}

		if (this.y == 34) {
			this.y = 33;
		}
		if (this.x == 0) {
			this.x = 1;
		}
		if (this.x == 34) {
			this.x = 33;
		}
	}
}

module.exports = { Tile, Clock, BlueWall, Player };
