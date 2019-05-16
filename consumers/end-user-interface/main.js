

let simulationEngine = new SimulationEngine()

let fixedEntity = new FixedEntity("shop",300,500)

let movableEntity = new MovableEntity("steve",264,11)

let testArr = [new FixedEntity("apartment",100,200),new MovableEntity("anna",300,400)]

let userChar = new UserCharacter("me",300,300)

let camera = new Camera("cam",400,400)

simulationEngine.user=userChar


simulationEngine.cameraHandler(userChar,camera)

simulationEngine.addEntities(fixedEntity,movableEntity,testArr,userChar,camera)
// renderingEngine.addEntities(fixedEntity,userChar)


simulationEngine.initialize()
simulationEngine.mainLoop()


console.log(camera)