import React, { Component } from "react";
import io from "socket.io-client";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
      socket: io("http://localhost:3002")
    };
    this.canvasRef = React.createRef();
	}

  updateCanvas(data){
    const canvas = this.canvasRef.current;
    const c = canvas.getContext("2d");

   // console.log(data.posX)
    c.clearRect(0,0,500,500);
    c.fillRect(data.posX,data.posY,5,5)

    
  }




	componentDidMount() {
		let socket = this.state.socket;
		socket.on("positionUpdate", data => {
      console.log(data);
      this.updateCanvas(data)

    });
	}

	render() {
		return (
			<div className="App">
				<canvas id="main-canvas" ref={this.canvasRef} width="500" height="500" style={{width: "500px", height:"500px"}}/>
			</div>
		);
	}
}

export default App;
