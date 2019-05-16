class MovableEntity {
	constructor(name, posX, posY, width = 25, height = 25) {
		this.pos = { x: posX, y: posY };
		this.size = { width: width, height: height };

        this.disp = { x: null, y: null };

		this.name = name;

		this.type = "movableEntity"
		this.color = "green";
	}
}

class Camera extends MovableEntity{
	constructor(name,posX,posY,width=5,height=5){
		super(name,posX,posY,width,height);

		this.disp = {x:300, y: 300}

		this.type = "camera"
		this.following = null;

		this.switchedTime =  Date.now()
		this.deltaTime = 10000;

		this.center = {x:300,y:300}
	}
	move(direction){
		if (direction == "up"){
			this.pos.y--;
			if (this.following){
				this.following.pos.y = this.pos.y
			}	
		}
		if (direction == "down"){
			this.pos.y++;
			if (this.following){
				this.following.pos.y = this.pos.y
			}	
		}
		if (direction == "left"){
			this.pos.x--;
			if (this.following){
				this.following.pos.x = this.pos.x
			}	
		}
		if (direction == "right"){
			this.pos.x++;
			if (this.following){
				this.following.pos.x = this.pos.x
			}	
		}
	}
}

class UserCharacter extends MovableEntity {
	constructor(name, posX, posY, width = 25, height = 25) {
		super(name,posX, posY, width, height);

        this.disp = {x: 300, y : 300}
		this.color = "orange";

		this.type = "user"
	}
}

class AutomatedCharacter extends MovableEntity {
	constructor(name){

	}
}