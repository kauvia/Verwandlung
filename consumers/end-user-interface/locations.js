class FixedEntity {
	constructor(name,posX, posY, width = 50, height = 50) {
		this.pos = { x: posX, y: posY };
        this.size = { width: width, height: height };
        
        this.disp = { x: null, y: null };

        this.name = name;

        this.color = "blue"

        this.type = "fixedEntity"
	}
}

