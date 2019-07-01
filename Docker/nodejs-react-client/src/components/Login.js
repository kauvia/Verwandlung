import React, { Component } from "react";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				username: "user",
				password: "pass"
			}
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		this.dbLogin();
	};
	handleChange = e => {
		const target = e.target;
		this.setState({ user: { [target.name]: target.value } });
	};
	dbLogin = () => {
		fetch("http://localhost:3020/users/sign_in", {
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true"
			},
			body: JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then(res => console.log(res));
		console.log("signing in");
	};
	dbRegister = () => {
		fetch("http://localhost:3020/users", {
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true"
			},
			body: JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then(res => console.log(res));
		console.log("registering");
	};
	dbLogout = () => {
		fetch("http://localhost:3020/users/sign_out", {
			method: "DELETE",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true"
			}
		})
			.then(res => res.json())
			.then(res => console.log(res));
		console.log("loging out");
	};
	testAuth = () => {
		fetch("http://localhost:3020/users/test", {
			method: "GET",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true"
			}
		})
			.then(res => res.json())
			.then(res => console.log(res));
	};
	// dbLogin = () => {
	// 	fetch("http://localhost:3010/test", {
	// 		method:"POST",
	// 		mode: "cors",
	// 		headers:{
	// 			'Content-Type':'application/json'
	// 		},
	// 		body: JSON.stringify(this.state)
	// 	})
	// 		.then(res => res.json())
	// 		.then(res => console.log(res));
	// };

	render() {
		return (
			<form onSubmit={this.handleSubmit} onChange={this.handleChange}>
				<input
					name="username"
					type="text"
					className="form-control"
					id="inputUsername"
					placeholder="Enter username"
					value={this.state.user.username}
				/>
				<input
					name="password"
					type="password"
					className="form-control"
					id="inputPassword"
					placeholder="Enter password"
					value={this.state.user.password}
				/>
				<button type="submit" value="Submit" className="btn btn-primary">
					Login
				</button>
				<button
					type="button"
					onClick={this.dbRegister}
					className="btn btn-primary"
				>
					Register
				</button>
				<button
					type="button"
					onClick={this.dbLogout}
					className="btn btn-primary"
				>
					Logout
				</button>
				<button
					type="button"
					onClick={this.testAuth}
					className="btn btn-primary"
				>
					test Auth
				</button>
			</form>
		);
	}
}

export default Login;
