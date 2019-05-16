class SimulationEngine {
	constructor() {
		this.canvas = document.getElementById("main-canvas");
		this.canvas.width = 600;
		this.canvas.height = 600;
		this.ctx = this.canvas.getContext("2d");

		this.mult = 1;

		this.reqAnimFrame = window.requestAnimationFrame.bind(window);

		this.camera = null;

		this.entityList = [];

		this.mapKeys = {};
		this.mapMouse = {};
		//	this.userInputListener = window.addEventListener("keypress", this.keyboardHandler);
	}

	initialize = () => {
		this.keyboardListener();
		this.mouseListener();
	};

	addEntities = (...items) => {
		// OVERLOADED

		for (let idx in items) {
			const item = items[idx];

			// if array, process it array style
			if (Array.isArray(item)) {
				for (let itemIdx in item) {
					this.entityList.push(item[itemIdx]);
				}

				// if just entity, push it in straightaway
			} else {
				this.entityList.push(item);
			}
		}
	};

	clearScreen = () => {
//		console.log(this.mult)
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	renderEntities = () => {
		console.log(this.user.disp.x * this.mult)
		const mult = this.mult;
		for (let idx in this.entityList) {
			const entity = this.entityList[idx];

			// draw the entity's text (name) except camera
			if (entity.type !== "camera") {
				this.ctx.font = "15px Arial";
				this.ctx.textAlign = "center";
				this.ctx.fillText(
					entity.disp.x,
					entity.disp.x * mult + entity.size.width / 2,
					entity.disp.y * mult - 2 * mult
				);
			}
			// draw the entity's body
			this.ctx.fillStyle = entity.color;

			//if buildings => box .else.if. people => circle .else.if. camera => cross
			if (entity.type == "fixedEntity" || entity.type == "building") {
				this.ctx.fillRect(
					entity.disp.x * mult,
					entity.disp.y * mult,
					entity.size.width * mult,
					entity.size.height * mult
				);
			} else if (entity.type == "movableEntity" || entity.type == "user") {
				this.ctx.beginPath();
				this.ctx.arc(
					entity.disp.x * mult + entity.size.width / 2,
					entity.disp.y * mult + entity.size.height / 2,
					(entity.size.width * mult) / 2,
					0,
					2 * Math.PI
				);
				this.ctx.fill();
			} else if (entity.type == "camera" && !entity.following) {
				//vertical
				this.ctx.beginPath();
				this.ctx.moveTo(
					entity.disp.x ,
					entity.disp.y  - entity.size.height
				);
				this.ctx.lineTo(
					entity.disp.x ,
					entity.disp.y  + entity.size.height
				);
				this.ctx.stroke();
				//horizontal
				this.ctx.beginPath();
				this.ctx.moveTo(
					entity.disp.x - entity.size.width,
					entity.disp.y
				);
				this.ctx.lineTo(
					entity.disp.x + entity.size.width,
					entity.disp.y 
				);
				this.ctx.stroke();
			}
		}
	};

	updateEntities = () => {
		// this.camera.disp.x = this.mult
		// this.camera.disp.y = this.mult
		for (let idx in this.entityList) {
			const entity = this.entityList[idx];

			if (entity !== this.camera) {
				entity.disp.x = entity.pos.x - this.camera.pos.x + this.camera.disp.x/this.mult;
				entity.disp.y = entity.pos.y - this.camera.pos.y + this.camera.disp.y/this.mult;
			} else {
				entity.disp.x = entity.center.x;
				entity.disp.y = entity.center.y;
			}
		}
	};

	// Controls
	keyboardListener = () => {
		onkeydown = onkeyup = e => {
			this.mapKeys[e.keyCode] = e.type == "keydown";
			console.log(this.mapKeys);
		};
	};
	mouseListener = () => {
		onmousedown = onmouseup = onmousemove = onwheel = e => {
			// LEFT CLICK
			if (e.type === "mouseup" && e.button === 0) {
				this.mapMouse["pressed"] = false;
			} else if (e.type === "mousedown" && e.button === 0) {
				this.mapMouse["pressed"] = true;
				this.mapMouse["initPos"] = {
					x: e.clientX,
					y: e.clientY
				};
			}

			if (e.type === "wheel"){
				if (e.deltaY<0){
					this.mapMouse["zoom"] = "in";
				} else if (e.deltaY>0){
					this.mapMouse["zoom"] = "out";
				}
			}
//			console.log(this.mapMouse);
		};
	};
	userInputHandler = () => {

			this.userAction();
	
	};
	userAction() {
		const mapKeys = this.mapKeys;
		const mapMouse = this.mapMouse;

		// w
		if (mapKeys[87]) {
			this.camera.move("up");
		} // s
		if (mapKeys[83]) {
			this.camera.move("down");
		} // a
		if (mapKeys[65]) {
			this.camera.move("left");
		} // d
		if (mapKeys[68]) {
			this.camera.move("right");
		} // c (toggle following for camera)
		if (mapKeys[67]) {
			if (this.camera.following) {
				this.cameraHandler();
			} else {
				this.cameraHandler(this.user);
			}
		} //mouse wheel scolling
		if (mapMouse["zoom"]){
			this.cameraZoom(mapMouse["zoom"])
		}
	}


	//camera actions

	cameraZoom=state=>{
		if (state === "in"){
			this.mult = this.mult*1.1;
			this.mapMouse["zoom"]=false
		} else if (state==="out"){
			this.mult = this.mult*0.9;
			this.mapMouse["zoom"]=false
		}
	}

	cameraHandler = (following = false, setCamera = false) => {
		if (setCamera) {
			this.camera = setCamera;
		}

		const timeDiff = Date.now() - this.camera.switchedTime;

		this.camera.deltaTime += timeDiff;

		if (this.camera.deltaTime > 1000) {
			this.camera.deltaTime = 0;
			this.camera.switchedTime = Date.now();

			if (following) {
				this.camera.pos.x = following.pos.x;
				this.camera.pos.y = following.pos.y;
				this.camera.following = following;
			} else if (!following) {
				this.camera.following = false;
			}
		}
	};

	mainLoop = () => {

		this.clearScreen();

		this.userInputHandler();

		this.updateEntities();
		this.renderEntities();

		this.reqAnimFrame(this.mainLoop);
	};
}
