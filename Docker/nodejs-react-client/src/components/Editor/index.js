import React, { Component } from "react";

class EditorForm extends Component {
    constructor(props){
        super(props);
        this.state={
            formData :"",
        }
    }
    handleChange=e=>{
        console.log(e.target.value)
        this.setState({formData:e.target.value})
    }
    handleSubmit=e=>{
        e.preventDefault();
    }


    sendToBackend=()=>{

        fetch("http://localhost:8082",{


        
        })

    }


	render() {
		return (
			<div className="form">

			form
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

            <textarea name="text-area" style={{height:"500px",width:"500px"}} value={this.state.formData}/>

            <button type="submit">Run the code</button>
            </form>



			</div>
		);
	}
}



export default EditorForm;